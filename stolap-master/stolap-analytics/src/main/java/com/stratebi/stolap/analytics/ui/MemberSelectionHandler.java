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
import java.util.List;
import java.util.ResourceBundle;

import javax.annotation.PostConstruct;
import javax.faces.application.FacesMessage;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.ViewScoped;
import javax.faces.context.FacesContext;
import javax.faces.event.ActionEvent;
import javax.faces.model.SelectItem;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.exception.ExceptionUtils;
import org.olap4j.metadata.Measure;
import org.olap4j.metadata.Member;
import org.pivot4j.analytics.component.tree.NodeData;
import org.pivot4j.analytics.ui.PivotStateManager;
import org.pivot4j.analytics.ui.SelectionMode;
import org.pivot4j.analytics.ui.navigator.MemberNode;
import org.primefaces.component.commandbutton.CommandButton;
import org.primefaces.context.RequestContext;
import org.primefaces.event.SelectEvent;
import org.primefaces.model.TreeNode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.stratebi.stolap.analytics.state.CustomMember;
import com.stratebi.stolap.analytics.state.HierarchyFilterItem;
import com.stratebi.stolap.analytics.state.HierarchyFiltersMember;
import com.stratebi.stolap.analytics.state.NameSetMember;

@ManagedBean(name = "memberSelectionHandler")
@ViewScoped
public class MemberSelectionHandler extends org.pivot4j.analytics.ui.MemberSelectionHandler {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@ManagedProperty(value = "#{pivotStateManager}")
	private PivotStateManager pivotStateManager;
	

	private final static Logger logger = LoggerFactory.getLogger(MemberSelectionHandler.class);
	
	private String autocompleteMemberSearch;
	private String nameSet;
	
	private String editingUniqueName;
	
	private String selectedFilter = "Limit";
	private String selectedFilterMeasure;
	private String selectedFilterOption = "First";
	private int selectedFilterOptionValue = 10;
	
	private HierarchyFiltersMember hierarchyFiltersMember = new HierarchyFiltersMember("_nodimension");
	
	private HierarchyFilterItem hierarchyFilterItemToRemove;
	
	private CommandButton buttonAddNameSet;

	@PostConstruct
	@Override
	protected void initialize() {
		super.initialize();
	}
	
	public void removeHierarchyFilterItem() {
		if (hierarchyFilterItemToRemove!=null) {
			hierarchyFiltersMember.getHierarchyFilterItems().remove(hierarchyFilterItemToRemove);
			hierarchyFilterItemToRemove = null;
			
			getButtonOk().setDisabled(false);
			getButtonApply().setDisabled(false);
		}
	}
	
	@Override
	public void show() {
		super.show();
		
		//Search if exist previous filters
		List<CustomMember> cm = getPivotStateManager().getState().getCustomMembers();
		if (cm!=null) {
			String dimUniqueName = getHierarchy().getDimension().getUniqueName();
			for (CustomMember customMember : cm) {
				if (customMember instanceof HierarchyFiltersMember) {
					HierarchyFiltersMember hfm = (HierarchyFiltersMember) customMember;
					if (hfm.getUniqueName().equals(dimUniqueName)) {
						//Check if selected members are a subconjunto
						
						List<Member> currentMembers = getSelection().getMembers();
						List<String> previousMembers = hfm.getMembersSelection();
						boolean bSubconjunto = true;
						for (Member member : currentMembers) {
							boolean inside=false;
							for (String previousMembersUniqueName : previousMembers) {
								if (previousMembersUniqueName.equals(member.getUniqueName())) {
									inside=true;
									break;
								}
							}
							if (!inside) {
								bSubconjunto = false;
								break;
							}
						}
						if (bSubconjunto) {
							//Add resto members
							
							hierarchyFiltersMember.setName(hfm.getName());
							hierarchyFiltersMember.setMembersUniquesNames(hfm.getMembersSelection());
							hierarchyFiltersMember.getHierarchyFilterItems().clear();
							hierarchyFiltersMember.getHierarchyFilterItems().addAll(hfm.getHierarchyFilterItems());
							
							List<String> uniquesNamesSelection = hierarchyFiltersMember.getMembersSelection();
							if (uniquesNamesSelection!=null && uniquesNamesSelection.size()>0) {
								//Add resto miembros
								getSelection().clear();
								List<Member> members = getSelection().getMembers();
								SelectionMode mode = SelectionMode.Descendants;
								
								for (TreeNode node : getSourceNode().getChildren()) {
									MemberNode memberNode = (MemberNode) node;

									Member member = memberNode.getObject();
									List<Member> targetMembers = mode.getTargetMembers(member);
									
									for(String uniqueNameSelection : uniquesNamesSelection) {
										for (Member target : targetMembers) {
											if (!members.contains(target) && uniqueNameSelection.equals(target.getUniqueName())) {
												getSelection().addMember(target);
												break;
											}
										}
									}
								}
									
							}
							
							getButtonOk().setDisabled(false);
							getButtonApply().setDisabled(false);
							return;
						}
					}
				}
			}
		}
		hierarchyFiltersMember.setName("");
		hierarchyFiltersMember.getHierarchyFilterItems().clear();
	}
	

	@Override
	public void reset() {
		super.reset();
		setSourceSelection(null);
		autocompleteMemberSearch = "";
	}
	
	public CommandButton getButtonAddNameSet() {
		return buttonAddNameSet;
	}

	public void setButtonAddNameSet(CommandButton buttonAddNameSet) {
		this.buttonAddNameSet = buttonAddNameSet;
	}

	public List<SelectItem> getMeasures() {
		ArrayList<SelectItem> measures = new ArrayList<SelectItem>();
		List<Measure> measuresList = getPivotStateManager().getModel().getCube().getMeasures();
		for (Measure measure : measuresList) {
			SelectItem aux = new SelectItem(measure.getUniqueName(), measure.getName());
			measures.add(aux);
		}
		return measures;
	}
	
	public void addMemberFilter(ActionEvent ae) {
		HierarchyFilterItem filterItem = new HierarchyFilterItem();
		filterItem.setFilter(selectedFilter);
		filterItem.setMeasure(selectedFilterMeasure);
		filterItem.setOption(selectedFilterOption);
		filterItem.setOptionValue(selectedFilterOptionValue);
		
		hierarchyFiltersMember.getHierarchyFilterItems().add(filterItem);
		
		getButtonOk().setDisabled(false);
		getButtonApply().setDisabled(false);
	}
	
	@Override
	public void apply() {
		super.apply();
		try {
			if (hierarchyFiltersMember.getHierarchyFilterItems().size()>0) {
				hierarchyFiltersMember.setName(getHierarchy().getDimension().getUniqueName());
				hierarchyFiltersMember.setMembersSelection(getSelection().getMembers());
				
				getPivotStateManager().getState().addHierarchyFiltersMember(hierarchyFiltersMember);
			}
			else {
				getPivotStateManager().getState().removeHierarchyFiltersMember(getHierarchy().getDimension().getUniqueName());
			}
			
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

	
    public List<String> cubeMemberCompleteText(String query) {

    	List<String> results = new ArrayList<String>();
    	List<TreeNode> all = new ArrayList<TreeNode>();
    	all = addTreeNodeMembers(getSourceNode(), all);
    	
    	for (TreeNode treeNode : all) {
    		NodeData miembro = (NodeData) treeNode.getData();
            if (treeNode.isSelectable() && !treeNode.isSelected() && miembro.getId().toLowerCase().contains(query.toLowerCase())) {
                results.add(miembro.getId());
            }
		}
    	
        return results;
    }
    

	private List<TreeNode> addTreeNodeMembers(TreeNode sourceNode, List<TreeNode> all) {
		
		if (sourceNode.getData() !=null && sourceNode.getData() instanceof NodeData) {
			all.add(sourceNode);
		}
		
		List<TreeNode> children = sourceNode.getChildren();
		if (children!=null) {
			for (TreeNode treeNode : children) {
				addTreeNodeMembers(treeNode, all);
			}
		}
		
		return all;
	}

	public void onCubeMemberCompleteSelect(SelectEvent event) {
    	if (event!=null && event.getObject()!=null) {

    		String id = event.getObject().toString();
    		TreeNode selectNode = null;
    		
        	List<TreeNode> all = new ArrayList<TreeNode>();
        	all = addTreeNodeMembers(getSourceNode(), all);
    		for (TreeNode treeNode : all) {
    			if (((NodeData)treeNode.getData()).getId().equals(id) && treeNode.isSelectable()) {
    				selectNode = treeNode;
    				treeNode.setSelected(true);
    				expandParents(treeNode);
    				break;
    			}
			}
    		
    		if (selectNode!=null) {
        		ArrayList<TreeNode> newSelection = new ArrayList<TreeNode>();
        		if (getSourceSelection()!=null) {
            		for (TreeNode treeNode : getSourceSelection()) {
    					if (treeNode.isSelected()) {
    						newSelection.add(treeNode);
    					}
    				} 
        		}
        		newSelection.add(selectNode);
        		
            	setSourceSelection(newSelection.toArray(new TreeNode[0]));
            	
            	updateButtonStatus();
    		}
    	}
    }    
	
	

	private void expandParents(TreeNode treeNode) {
		if (treeNode!=null && treeNode.getParent()!=null) {
			treeNode.getParent().setExpanded(true);
			expandParents(treeNode.getParent());
		}
	}

	public void addNameSet() throws Throwable {
		if (StringUtils.isNotBlank(nameSet)) {
			try {
				apply();
				
				NameSetMember newCustomMember = new NameSetMember(nameSet, getHierarchy().getUniqueName(), getSelection().getMembers());
				getPivotStateManager().getState().addCustomMember(newCustomMember, newCustomMember.getUniqueName());
				
				nameSet = "";
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
		else {
			logger.info("nameSet is blank: no created name set.");
		}
	}

	public String getNameSet() {
		return nameSet;
	}

	public void setNameSet(String nameSet) {
		this.nameSet = nameSet;
	}

	public PivotStateManager getPivotStateManager() {
		return pivotStateManager;
	}

	public void setPivotStateManager(PivotStateManager pivotStateManager) {
		this.pivotStateManager = pivotStateManager;
	}

	public String getEditingUniqueName() {
		return editingUniqueName;
	}

	public void setEditingUniqueName(String editingUniqueName) {
		this.editingUniqueName = editingUniqueName;
	}

	public SelectItem[] getMemberFilters() {
		return HierarchyFilterItem.filters;
	}

	public SelectItem[] getSelectedFilterOptions() {
		return HierarchyFilterItem.optionsForFilter(selectedFilter);
	}
	
	
	
	
	public String getSelectedFilter() {
		return selectedFilter;
	}

	public void setSelectedFilter(String selectedFilter) {
		this.selectedFilter = selectedFilter;
	}

	public String getSelectedFilterOption() {
		return selectedFilterOption;
	}

	public void setSelectedFilterOption(String selectedFilterOption) {
		this.selectedFilterOption = selectedFilterOption;
	}

	public String getSelectedFilterMeasure() {
		return selectedFilterMeasure;
	}

	public void setSelectedFilterMeasure(String selectedFilterMeasure) {
		this.selectedFilterMeasure = selectedFilterMeasure;
	}

	public int getSelectedFilterOptionValue() {
		return selectedFilterOptionValue;
	}

	public void setSelectedFilterOptionValue(int selectedFilterOptionValue) {
		this.selectedFilterOptionValue = selectedFilterOptionValue;
	}


	public HierarchyFiltersMember getHierarchyFiltersMember() {
		return hierarchyFiltersMember;
	}


	public void setHierarchyFiltersMember(HierarchyFiltersMember hierarchyFiltersMember) {
		this.hierarchyFiltersMember = hierarchyFiltersMember;
	}

	public HierarchyFilterItem getHierarchyFilterItemToRemove() {
		return hierarchyFilterItemToRemove;
	}

	public void setHierarchyFilterItemToRemove(HierarchyFilterItem hierarchyFilterItemToRemove) {
		this.hierarchyFilterItemToRemove = hierarchyFilterItemToRemove;
	}

	public String getAutocompleteMemberSearch() {
		return autocompleteMemberSearch;
	}

	public void setAutocompleteMemberSearch(String autocompleteMemberSearch) {
		this.autocompleteMemberSearch = autocompleteMemberSearch;
	}



}
