/*
 * ====================================================================
 * This software is subject to the terms of the Common Public License
 * Agreement, available at the following URL:
 *   http://www.opensource.org/licenses/cpl.html .
 * You must accept the terms of that agreement to use this software.
 * ====================================================================
 */
package com.stratebi.stolap.analytics.ui;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.ResourceBundle;

import javax.annotation.PostConstruct;
import javax.faces.application.FacesMessage;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.ViewScoped;
import javax.faces.context.FacesContext;
import javax.faces.model.SelectItem;
import javax.faces.model.SelectItemGroup;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.exception.ExceptionUtils;
import org.olap4j.OlapException;
import org.olap4j.metadata.Dimension;
import org.olap4j.metadata.Hierarchy;
import org.olap4j.metadata.Level;
import org.olap4j.metadata.Measure;
import org.olap4j.metadata.MetadataElement;
import org.olap4j.metadata.NamedList;
import org.pivot4j.analytics.component.tree.NodeData;
import org.pivot4j.analytics.component.tree.NodeFilter;
import org.pivot4j.analytics.ui.PivotStateManager;
import org.primefaces.context.RequestContext;
import org.primefaces.event.CloseEvent;
import org.primefaces.model.TreeNode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.stratebi.stolap.analytics.ui.navigator.CubeMemberNode;
import com.stratebi.stolap.analytics.utils.Encoder;

@ManagedBean(name = "analysisWizardHandler")
@ViewScoped
public class AnalysisWizardHandler implements NodeFilter {
	
	private final static Logger logger = LoggerFactory.getLogger(AnalysisWizardHandler.class);

	@ManagedProperty(value = "#{pivotStateManager}")
	private PivotStateManager pivotStateManager;

	private String measure;
	private String row;
	private String column;
	private String order = "";
	private int orderLimit = 10;

	
	private List<SelectItem> filters = new ArrayList<SelectItem>();
	private String filterToRemove;
	private TreeNode selectedCubeNode;
	
	
	@PostConstruct
	protected void initialize() {
		restoreAnalysisState();
	}
	
	public List<SelectItem> getMeasures() {
		List<SelectItem> measures = new ArrayList<SelectItem>();
		if (getPivotStateManager()!=null && pivotStateManager.getModel()!=null) {
			for (Measure measure : getPivotStateManager().getModel().getCube().getMeasures()) {
				measures.add(new SelectItem(measure.getUniqueName(), measure.getCaption()));
			}
		}
		return measures;
	}
	
	public List<SelectItem> getDimensions() {
		List<SelectItem> dimensions = new ArrayList<SelectItem>();
		if (getPivotStateManager()!=null && pivotStateManager.getModel()!=null) {
			for (Dimension dimension : getPivotStateManager().getModel().getCube().getDimensions()) {
				NamedList<Hierarchy> hierarchies = dimension.getHierarchies();
				if (hierarchies.size()>1) {
					//Crear grupo para las jerarquias de esta dimension
					SelectItemGroup sig = new SelectItemGroup(dimension.getCaption());
					ArrayList<SelectItem> lsi = new ArrayList<SelectItem>();
					for (Hierarchy hierarchy : hierarchies) {
						lsi.add(new SelectItem(hierarchy.getUniqueName(), hierarchy.getCaption()));
					}
			        sig.setSelectItems(lsi.toArray(new SelectItem[0]));
				}
				else {
					dimensions.add(new SelectItem(dimension.getDefaultHierarchy().getUniqueName(), dimension.getCaption()));
				}
			}
		}
		return dimensions;
	}

	public List<SelectItem> getHierarchies() throws OlapException {
		List<SelectItem> dimensions = new ArrayList<SelectItem>();
		if (getPivotStateManager()!=null && pivotStateManager.getModel()!=null) {
			for (Dimension dimension : getPivotStateManager().getModel().getCube().getDimensions()) {
				if (dimension.getDimensionType()!=Dimension.Type.MEASURE) {
					//Crear grupo para el primer nivel de la jerarquia
					SelectItemGroup sig = new SelectItemGroup(dimension.getCaption());
					if (column!=null && dimension.getUniqueName().startsWith(column)) {
						sig.setDisabled(true);
					}

					ArrayList<SelectItem> lsi = new ArrayList<SelectItem>();
					
					NamedList<Hierarchy> hierarchies = dimension.getHierarchies();
					if (hierarchies.size()>1) {
						//Crear grupo para las jerarquias de esta dimension
						for (Hierarchy hierarchy : hierarchies) {
							SelectItemGroup sig2 = new SelectItemGroup(hierarchy.getCaption());
							if (column!=null && hierarchy.getUniqueName().startsWith(column)) {
								sig2.setDisabled(true);
							}

							ArrayList<SelectItem> lsi2 = new ArrayList<SelectItem>();
							for (Level level : hierarchy.getLevels()) {
								SelectItem si = new SelectItem(level.getUniqueName(), level.getCaption());
								if (column!=null && level.getUniqueName().startsWith(column)) {
									si.setDisabled(true);
								}
								lsi2.add(si);
							}
					        sig2.setSelectItems(lsi2.toArray(new SelectItem[0]));
							lsi.add(sig2);
						}
					}
					else {
						for (Level level : dimension.getDefaultHierarchy().getLevels()) {
							SelectItem si = new SelectItem(level.getUniqueName(), level.getCaption());
							if (column!=null && level.getUniqueName().startsWith(column)) {
								si.setDisabled(true);
							}
							lsi.add(si);
						}
					}
			        sig.setSelectItems(lsi.toArray(new SelectItem[0]));
			        dimensions.add(sig);
				}
			}
		}
		return dimensions;
	}
	
	public List<SelectItem> getOrders() {
		List<SelectItem> orders = new ArrayList<SelectItem>();
		
		SelectItemGroup sig = new SelectItemGroup("Top -> Down");
		sig.setSelectItems(new SelectItem[] {new SelectItem("TopCount", "TopCount"), new SelectItem("TopPercent", "TopPercent"), new SelectItem("TopSum", "TopSum"), new SelectItem("BDESC", "Desc (All)")});
		orders.add(sig);

		sig = new SelectItemGroup("Bottom -> Up");
		sig.setSelectItems(new SelectItem[] {new SelectItem("BottomCount", "BottomCount"), new SelectItem("BottomPercent", "BottomPercent"), new SelectItem("BottomSum", "BottomSum"), new SelectItem("BASC", "Asc (All)")});
		orders.add(sig);

		sig = new SelectItemGroup("Natural");
		sig.setSelectItems(new SelectItem[] {new SelectItem("", "None"), new SelectItem("Head", "Head"), new SelectItem("Tail", "Tail")});
		orders.add(sig);
		
		return orders;
	}
	
	
	public void apply()  {
		try {
			//Generate new mdx
			StringBuilder sb = new StringBuilder("SELECT ");
			
			sb.append("{");
			if (column.equalsIgnoreCase("[Measures]")) {
				sb.append(measure);
			}
			else {
				sb.append(column);
			}
			sb.append("} ON COLUMNS, ");

			sb.append("NON EMPTY ");
			if (StringUtils.isEmpty(order)) {
				sb.append(row).append(".Members ON ROWS ");
			}
			else {
				if (order.equals("BDESC") || order.equals("BASC") ) {
					sb.append("Order(").append(row).append(".Members, ").append(measure).append(", ").append(order).append(") ON ROWS ");
				}
				else if (order.equals("Tail") || order.equals("Head") ) {
					sb.append(order).append("(").append(row).append(".Members, ").append(orderLimit).append(") ON ROWS ");
				}
				else {
					sb.append(order).append("(").append(row).append(".Members, ").append(orderLimit).append(", ").append(measure).append(") ON ROWS ");
				}
			}
			sb.append("FROM ").append(pivotStateManager.getModel().getCube().getUniqueName());
			
			
			List<SelectItem> filtersWhere = getFilters();
			if (filtersWhere.size()==0 && !column.equalsIgnoreCase("[Measures]")) {
				sb.append(" WHERE ").append(measure);
			}
			else if (filtersWhere.size()>0) {
				sb.append(" WHERE ( ");
				for (SelectItem selectItem : filtersWhere) {
					sb.append(selectItem.getValue()).append(",");
				}
				sb.delete(sb.length()-",".length(), sb.length());
				if (!column.equalsIgnoreCase("[Measures]")) {
					sb.append(", ").append(measure);
				}
				sb.append(" ) ");
			}
			//Cambiar a la nueva mdx
			pivotStateManager.getState().changeCurrentMdx(sb.toString());
			
			saveAnalysisState();
			
		} 
		catch (Throwable e) {
			logger.info(e.getMessage(), e);
			
			FacesContext context = FacesContext.getCurrentInstance();
	
			ResourceBundle bundle = context.getApplication().getResourceBundle(
					context, "msg");
	
			String title = bundle.getString("error.unhandled.title");
	
			context.addMessage(null, new FacesMessage(
					FacesMessage.SEVERITY_ERROR, title, ExceptionUtils.getRootCauseMessage(e)));
			
			RequestContext.getCurrentInstance().addCallbackParam("validationFailed", true);
		}
		
	}
	
	private void saveAnalysisState() {
		
		pivotStateManager.getState().setLastAnalysisWizard(new String[] {measure, column, row, order, String.valueOf(orderLimit), Encoder.encodeObject(filters) });
		
	}
	private void restoreAnalysisState() {
		String[] last = pivotStateManager.getState().getLastAnalysisWizard();
		if (last!=null && last.length==6) {
			measure = last[0];
			column = last[1];
			row = last[2];
			order = last[3];
			orderLimit = Integer.parseInt(last[4]);
			if (last[5]!=null) {
				try {
			        filters = (List<SelectItem>) Encoder.decodeToObject(last[5]);
				}
				catch(Throwable th) {
					logger.warn(th.getMessage(), th);
				}
			}
			
		}
	}
	
	
	public void removeFilter()  {
		if (StringUtils.isNotEmpty(filterToRemove)) {
			for (Iterator iterator = filters.iterator(); iterator.hasNext();) {
				SelectItem selectItem = (SelectItem) iterator.next();
				if  (selectItem.getValue().equals(filterToRemove)) {
					iterator.remove();
					break;
				}
			}
		}
	}
	
	public void addSelectedToFilters()  {
		if (selectedCubeNode!=null) {
			filters.add(new SelectItem( ((NodeData) selectedCubeNode.getData()).getId(), ((NodeData) selectedCubeNode.getData()).getName() ));
		}
	}
	
	public CubeMemberNode getCubeMemberNode() {
		CubeMemberNode superCubeNode = null;
		if (getPivotStateManager().getModel() != null && getPivotStateManager().getModel().isInitialized()) {
			superCubeNode = new CubeMemberNode(getPivotStateManager().getModel().getCube());
			superCubeNode.setNodeFilter(this);
		} 
		return superCubeNode;
	}
	

	public void handleClose(CloseEvent event) {
	}
	
	public PivotStateManager getPivotStateManager() {
		return pivotStateManager;
	}

	public void setPivotStateManager(PivotStateManager pivotStateManager) {
		this.pivotStateManager = pivotStateManager;
	}


	public String getMeasure() {
		return measure;
	}


	public void setMeasure(String measure) {
		this.measure = measure;
	}


	public String getRow() {
		return row;
	}


	public void setRow(String row) {
		this.row = row;
	}


	public String getColumn() {
		return column;
	}


	public void setColumn(String column) {
		this.column = column;
	}


	public String getOrder() {
		return order;
	}


	public void setOrder(String order) {
		this.order = order;
	}

	public int getOrderLimit() {
		return orderLimit;
	}

	public void setOrderLimit(int orderLimit) {
		this.orderLimit = orderLimit;
	}

	public List<SelectItem> getFilters() {
		ArrayList<SelectItem> aux = new ArrayList<SelectItem>();
		for (SelectItem selectItem : filters) {
			if ( (StringUtils.isEmpty(row) || !selectItem.getValue().toString().startsWith(row)) &&
					(StringUtils.isEmpty(column) || !selectItem.getValue().toString().startsWith(column))
				) 
			{
				aux.add(selectItem);
			}
		}
		return aux;
	}

	public void setFilters(List<SelectItem> filters) {
		this.filters = filters;
	}

	public String getFilterToRemove() {
		return filterToRemove;
	}

	public void setFilterToRemove(String filterToRemove) {
		this.filterToRemove = filterToRemove;
	}

	public TreeNode getSelectedCubeNode() {
		return selectedCubeNode;
	}

	public void setSelectedCubeNode(TreeNode selectedCubeNode) {
		this.selectedCubeNode = selectedCubeNode;
	}

	
	
	
	@Override
	public <T extends MetadataElement> boolean isSelected(T element) {
		return selectedCubeNode!=null && ((NodeData) selectedCubeNode.getData()).getId().equals(element.getUniqueName());
	}

	@Override
	public <T extends MetadataElement> boolean isSelectable(T element) {
		return !(element instanceof Level);
	}

	
	@Override
	public <T extends MetadataElement> boolean isVisible(T element) {
		String un = element.getUniqueName();
		//boolean visible = !un.startsWith("[Measures]")  && (StringUtils.isEmpty(row) || !un.startsWith(row)) && (StringUtils.isEmpty(column) || !un.startsWith(column));
		boolean visible = !un.startsWith("[Measures]")  && (StringUtils.isEmpty(row) || !row.startsWith(un)) && (StringUtils.isEmpty(column) || !column.startsWith(un));
		if (visible && filters.size()>0) {
			//La jerarquina no debe estar ya en los filtros.
			for (SelectItem selectItem : filters) {
				if (selectItem.getValue().toString().startsWith(un)) {
					return false;
				}
			}
		}
		return visible;
	}

	@Override
	public <T extends MetadataElement> boolean isExpanded(T element) {
		return false;
	}

	@Override
	public <T extends MetadataElement> boolean isActive(T element) {
		return false;
	}

}
