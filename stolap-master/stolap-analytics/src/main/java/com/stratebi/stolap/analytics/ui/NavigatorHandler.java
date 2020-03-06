/*
 * ====================================================================
 * This software is subject to the terms of the Common Public License
 * Agreement, available at the following URL:
 *   http://www.opensource.org/licenses/cpl.html .
 * You must accept the terms of that agreement to use this software.
 * ====================================================================
 */
package com.stratebi.stolap.analytics.ui;

import java.util.List;
import java.util.ResourceBundle;

import javax.faces.FacesException;
import javax.faces.application.FacesMessage;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.RequestScoped;
import javax.faces.context.FacesContext;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.exception.ExceptionUtils;
import org.olap4j.Axis;
import org.olap4j.OlapException;
import org.olap4j.metadata.Dimension.Type;
import org.olap4j.metadata.Hierarchy;
import org.olap4j.metadata.Level;
import org.olap4j.metadata.Member;
import org.pivot4j.analytics.component.tree.DefaultTreeNode;
import org.pivot4j.analytics.state.ViewState;
import org.pivot4j.analytics.ui.PivotStateManager;
import org.pivot4j.analytics.ui.ViewHandler;
import org.pivot4j.analytics.ui.navigator.CubeNode;
import org.pivot4j.analytics.ui.navigator.HierarchyNode;
import org.pivot4j.analytics.ui.navigator.MeasureNode;
import org.primefaces.event.DragDropEvent;
import org.primefaces.model.TreeNode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.stratebi.stolap.analytics.component.tree.CalculatorNodeData;
import com.stratebi.stolap.analytics.component.tree.FunctionNodeData;
import com.stratebi.stolap.analytics.component.tree.NameSetNodeData;
import com.stratebi.stolap.analytics.component.tree.WhatIfNodeData;
import com.stratebi.stolap.analytics.state.CalculadoraMember;
import com.stratebi.stolap.analytics.state.CustomMember;
import com.stratebi.stolap.analytics.state.FunctionMember;
import com.stratebi.stolap.analytics.state.NameSetMember;
import com.stratebi.stolap.analytics.state.WhatIfMember;
import com.stratebi.stolap.analytics.ui.metadata.CalculatedNamedSet;
import com.stratebi.stolap.analytics.ui.navigator.CubeMemberNode;
import com.stratebi.stolap.analytics.ui.navigator.MeasureCalculatorNode;
import com.stratebi.stolap.analytics.ui.navigator.MeasureFunctionNode;
import com.stratebi.stolap.analytics.ui.navigator.NameSetNode;
import com.stratebi.stolap.analytics.ui.navigator.WhatIfNode;

@ManagedBean(name = "navigatorHandler")
@RequestScoped
public class NavigatorHandler extends org.pivot4j.analytics.ui.NavigatorHandler {

	private final static Logger logger = LoggerFactory.getLogger(NavigatorHandler.class);

	private CubeNode cubeNode;
	
	@ManagedProperty(value = "#{pivotStateManager}")
	private PivotStateManager pivotStateManager;
	
	
	/* (non-Javadoc)
	 * @see org.pivot4j.analytics.ui.NavigatorHandler#getCubeNode()
	 * 
	 * Added to cube los miembros calculados que se dan de alta desde la calculadora.
	 * 
	 */
	@Override
	public CubeNode getCubeNode() {
		CubeNode superCubeNode = super.getCubeNode();
		
		if (superCubeNode!=cubeNode) {
			this.cubeNode = superCubeNode;
			
			//Add calculated members
			addCalculatedMembers();
		}
		return this.cubeNode;
	}

	/**
	 * 
	 * @return Arbol con todos los miembros del cubo.
	 */
	public CubeMemberNode getCubeMemberNode() {
		
		CubeMemberNode superCubeNode = null;
		if (getPivotStateManager().getModel() != null && getPivotStateManager().getModel().isInitialized()) {
			superCubeNode = new CubeMemberNode(getPivotStateManager().getModel().getCube());
		} 
		return superCubeNode;
	}	
	
	
	
	/**
	 * Add miembros calculados al arbol de navegacion del cubo
	 */
	private void addCalculatedMembers() {
		if (this.cubeNode!=null && getPivotStateManager()!=null) {
			
			ViewState state = pivotStateManager.getState();
			List<CustomMember> customMembers = state.getCustomMembers();
			
			HierarchyNode measuresHierarchy = getMeasuresHierarchy();
			
			for (CustomMember customMember : customMembers) {
				
				if (customMember instanceof CalculadoraMember) {
					CalculadoraMember calculadoraMember = (CalculadoraMember) customMember;

					//Add to navigator tree
					Member newMember = calculadoraMember.generateOlap4jMember(measuresHierarchy.getObject());
					MeasureNode yoaa = new MeasureCalculatorNode(measuresHierarchy, newMember);
					yoaa.setParent(measuresHierarchy);
					measuresHierarchy.getChildren().add(yoaa);
					
				} else if (customMember instanceof WhatIfMember) {
					WhatIfMember whatIfMember = (WhatIfMember) customMember;

					//Add to navigator tree
					Member newMember = whatIfMember.generateOlap4jMember(measuresHierarchy.getObject());
					MeasureNode yoaa = new WhatIfNode(measuresHierarchy, newMember);
					yoaa.setParent(measuresHierarchy);
					measuresHierarchy.getChildren().add(yoaa);
				} else if (customMember instanceof FunctionMember) {
					FunctionMember functionMember = (FunctionMember) customMember;
					//Hierarchy hierarchy = measuresHierarchy.getObject();
					HierarchyNode hierarchyNode = getHierarchy( functionMember.getHierarchy() );
					
					Member newMember = functionMember.generateOlap4jMember(hierarchyNode.getObject());
					TreeNode yoaa = null;
					if (customMember instanceof NameSetMember) {
						yoaa = new NameSetNode(hierarchyNode, newMember);
					}
					else {
						yoaa = new MeasureFunctionNode(hierarchyNode, newMember);
					}
					yoaa.setParent(hierarchyNode);
					hierarchyNode.getChildren().add(yoaa);
				}
				
			}
			
		}
	}
	
	

	private HierarchyNode getMeasuresHierarchy() {
		List<TreeNode> cubeChildren = this.cubeNode.getChildren();
		
		for (TreeNode tree : cubeChildren) {
			if ((tree instanceof HierarchyNode)) {
				HierarchyNode hier = (HierarchyNode) tree;
				Hierarchy addedHier = hier.getObject();
				try {
					if (addedHier.getDimension().getDimensionType() == Type.MEASURE) {
						return hier;
					}
				} catch (OlapException e) {
					logger.warn(e.getMessage(), e);
				}
			}
		}
		return null;
	}
	
	
	private HierarchyNode getHierarchy(String hierarchy) {
		List<TreeNode> cubeChildren = this.cubeNode.getChildren();
		
		for (TreeNode tree : cubeChildren) {
			if ((tree instanceof HierarchyNode)) {
				HierarchyNode hier = (HierarchyNode) tree;
				Hierarchy addedHier = hier.getObject();

				if ( addedHier.getUniqueName().equals(hierarchy) ) {
					return hier;
				}
			}
		}
		return null;
	}	
	
	/**
	 * Add formulas a dimensiones que no sean de tipo measure
	 * 
	 * @param axisRoot
	 * @param axis
	 */
	@Override
	protected void configureAxis(TreeNode axisRoot, Axis axis) {
		
		ViewState state = pivotStateManager.getState();
		List<CustomMember> customMembers = state.getCustomMembers();
		
		List<Hierarchy> hierarchyList = getHierarchies(axis);
		logger.debug("configureAxis hierarchyList size {}", hierarchyList.size());
		for (Hierarchy hierarchy : hierarchyList) {
			TreeNode hierarchyNode = new DefaultTreeNode("hierarchy", hierarchy, axisRoot);
			hierarchyNode.setExpanded(true);

			Type type;

			try {
				type = hierarchy.getDimension().getDimensionType();
			} catch (OlapException e) {
				throw new FacesException(e);
			}
			logger.debug("configureAxis hierarchyNode type {}", type);

			if (type == Type.MEASURE) {
				List<Member> memberList = getMembers(hierarchy);
				for (Member member : memberList) {
					boolean isFormula = false;
					String typeNode = "measure";
					for (CustomMember customMember : customMembers) {
						if (customMember instanceof WhatIfMember) {
							if (StringUtils.equalsIgnoreCase( ((FunctionMember)customMember).getUniqueName(), member.getUniqueName() )) {
								typeNode = "whatif";
							}
						}
						else if (customMember instanceof FunctionMember && !(customMember instanceof CalculadoraMember) ) {
							if (StringUtils.equalsIgnoreCase( ((FunctionMember)customMember).getUniqueName(), member.getUniqueName() )) {
								typeNode = "formula";
							}
						}
					}
					if (isFormula) {
						new DefaultTreeNode(typeNode, member, hierarchyNode);
					}
					else {
						new DefaultTreeNode(typeNode, member, hierarchyNode);
					}
				}
			} else {
				List<Member> memberList = null;
				boolean checkForFormulas = false;
				boolean addedAsNameset = false;
				for (CustomMember customMember : customMembers) {
					if (customMember instanceof FunctionMember && (StringUtils.equalsIgnoreCase( ((FunctionMember)customMember).getHierarchy(), hierarchy.getUniqueName() )) ) {
						if (addedAsNameset==false && customMember instanceof NameSetMember) {
							//Check if hierarchy visible members is equivalent to a namedset
							if (memberList==null) {
								memberList = getMembers(hierarchy);
							}
							NameSetMember aux = new NameSetMember("aux", hierarchy.getUniqueName(), memberList);
							if (aux.getExpression().equals(((NameSetMember) customMember).getExpression())) {
								//equivalent to the namedset
								new DefaultTreeNode("nameset", ((NameSetMember) customMember).generateOlap4jMember(hierarchy), hierarchyNode);
								addedAsNameset = true;
							}
						}
						else {
							checkForFormulas = true;
						}
					}
				}
				
				boolean formulasAdded=false;
				if (checkForFormulas) {
					//Add formulas
					if (memberList==null) {
						memberList = getMembers(hierarchy);
					}
					for (Member member : memberList) {
						if (member.isCalculated() && member.isCalculatedInQuery()) {
							new DefaultTreeNode("formula", member, hierarchyNode);
							formulasAdded = true;
						}
					}
				}
				if (!addedAsNameset) {
					List<Level> levelList = getLevels(hierarchy);
					for (Level level : levelList) {
						//No add duplicated level '(All)' if formulasAdded==true 
						if (!formulasAdded || level.getLevelType()!=Level.Type.ALL || !"(All)".equals(level.getName())) {
							new DefaultTreeNode("level", level, hierarchyNode);
							logger.debug("configureAxis add level {}", level.getUniqueName());
						}
					}
				}
			}
		}
	}
	
	
	@Override
	public void onDrop(DragDropEvent e) {
		String dragId = e.getDragId();

		if (StringUtils.isEmpty(dragId)) {
			return;
		}

		List<Integer> path = getNodePath(dragId);

		boolean fromNavigator = isSourceNode(e.getDragId());
		if (fromNavigator) {
			return;
		}

		TreeNode node = findNodeFromPath(getTargetNode(), path);
		
		//Si es un namedset se quita la Hierarchy asociada
		if (node.getData() instanceof CalculatedNamedSet) {
			Axis axis = (Axis) node.getParent().getParent().getData();
			Hierarchy hierarchy = ((CalculatedNamedSet) node.getData()).getHierarchy();

			removeHierarhy(axis, hierarchy);
		}else if (node.getData() instanceof Hierarchy) {
			Axis axis = (Axis) node.getParent().getData();
			Hierarchy hierarchy = (Hierarchy) node.getData();

			removeHierarhy(axis, hierarchy);
		} else if (node.getData() instanceof Level) {
			Axis axis = (Axis) node.getParent().getParent().getData();
			Level level = (Level) node.getData();

			removeLevel(axis, level);
		} else if (node.getData() instanceof Member) {
			Member member = (Member) node.getData();

			removeMember(member);
		}
	}

	@Override
	public void onDropOnAxis(DragDropEvent e) {
		if (!isDroppableOnAxix(e)) {
			return;
		}
		List<Integer> sourcePath = getNodePath(e.getDragId());
		List<Integer> targetPath = getNodePath(e.getDropId());

		boolean fromNavigator = isSourceNode(e.getDragId());

		TreeNode root = fromNavigator ? getCubeNode() : getTargetNode();

		TreeNode source = findNodeFromPath(root, sourcePath);
		TreeNode target = findNodeFromPath(getTargetNode(), targetPath);

		if (fromNavigator) {
			if (source.getData() instanceof NameSetNodeData) {
				Axis targetAxis = (Axis) target.getData();
				List<Hierarchy> hiers = getHierarchies(targetAxis);
				if (hiers!=null) {
					for (Hierarchy hierarchy : hiers) {
						if (hierarchy.getUniqueName().equalsIgnoreCase(((NameSetNodeData) source.getData()).getHierarchyUniqueName())) {
							removeHierarhy(targetAxis, hierarchy);
						}
					}
				}
			}
			onDropOnAxis(source, target);
		} else if (source.getData() instanceof Hierarchy) {
			Axis targetAxis = (Axis) target.getData();
			Hierarchy hierarchy = (Hierarchy) source.getData();

			if (source.getParent().equals(target)) {
				moveHierarhy(targetAxis, hierarchy, 0);
			} else {
				Axis sourceAxis = (Axis) source.getParent().getData();

				removeHierarhy(sourceAxis, hierarchy);
				addHierarhy(targetAxis, hierarchy);
			}
		} else if (source.getData() instanceof CalculatedNamedSet) {
			Axis targetAxis = (Axis) target.getData();
			Hierarchy hierarchy = ((CalculatedNamedSet) source.getData()).getHierarchy();

			if (source.getParent().getParent().equals(target)) {
				moveHierarhy(targetAxis, hierarchy, 0);
			} else {
				Axis sourceAxis = (Axis) source.getParent().getParent().getData();

				removeHierarhy(sourceAxis, hierarchy);
				addMember(targetAxis, ((CalculatedNamedSet) source.getData()));
			}
		}
	}
	
	@Override
	protected void onDropOnAxis(TreeNode sourceNode, TreeNode targetNode) {
		logger.debug("onDropOnAxis");
		
		super.onDropOnAxis(sourceNode, targetNode);
		
		if (!ViewHandler.errorsMessagesInContext() && sourceNode instanceof HierarchyNode) {
			HierarchyNode node = (HierarchyNode) sourceNode;
			Hierarchy hierarchy = node.getObject();
			if (hierarchy.getUniqueName().equalsIgnoreCase("[Measures]")) {
				logger.debug("onDropOnAxis [Measures]");
				List<TreeNode> childNodes = node.getChildren();
				Axis axis = (Axis) targetNode.getData();
				for (TreeNode treeNode : childNodes) {
					//Add calculated members in measures
						
					//super.onDropOnAxis(treeNode, targetNode);
					if (treeNode instanceof MeasureNode) {
						Object nodeData = treeNode.getData();
						if (nodeData instanceof CalculatorNodeData || nodeData instanceof WhatIfNodeData || nodeData instanceof FunctionNodeData) {
							MeasureNode measureNode = (MeasureNode) treeNode;
							Member member = measureNode.getObject();
							addMember(axis, member, -1);
						}
					}
				}
			}
		}
		
	}
	

	@Override
	public void onDropOnHierarchy(DragDropEvent e) {
		if (isDroppableOnAxix(e)) {
			super.onDropOnHierarchy(e);
		}
	}
	

	private boolean isDroppableOnAxix(DragDropEvent e) {
		try {
			List<Integer> tmp = getNodePath(e.getDragId());
			tmp = getNodePath(e.getDropId());
			return true;
		}
		catch(Throwable th) {
			logger.trace(th.getMessage());
		}
		return false;
	}

	
	@Override
	protected void addHierarhy(Axis axis, Hierarchy hierarchy, int position) {
		String mdx = getModel().getMdx();
		try {
			super.addHierarhy(axis, hierarchy, position);
		}
		catch(Throwable th) {
			logger.info(th.getMessage(), th);
			
			try {
				//Try to restore previous mdx
				getModel().setMdx(mdx);
				if (!getModel().isInitialized()) {
					getModel().initialize();
				}
			}
			catch(Throwable th2) {
				logger.info(th2.getMessage(), th2);
			}

			FacesContext context = FacesContext.getCurrentInstance();
	
			ResourceBundle bundle = context.getApplication().getResourceBundle(
					context, "msg");
	
			String title = bundle.getString("error.execute.title");
	
			context.addMessage(null, new FacesMessage(
					FacesMessage.SEVERITY_ERROR, title, ExceptionUtils.getRootCauseMessage(th)));
		}
	}

	@Override
	protected void addLevel(Axis axis, Level level, int position) {
		String mdx = getModel().getMdx();
		try {
			super.addLevel(axis, level, position);
		}
		catch(Throwable th) {
			logger.info(th.getMessage(), th);

			try {
				//Try to restore previous mdx
				getModel().setMdx(mdx);
				if (!getModel().isInitialized()) {
					getModel().initialize();
				}
			}
			catch(Throwable th2) {
				logger.debug(th2.getMessage(), th2);
			}
			
			FacesContext context = FacesContext.getCurrentInstance();
	
			ResourceBundle bundle = context.getApplication().getResourceBundle(
					context, "msg");
	
			String title = bundle.getString("error.execute.title");
	
			context.addMessage(null, new FacesMessage(
					FacesMessage.SEVERITY_ERROR, title, ExceptionUtils.getRootCauseMessage(th)));
			
		}
	}

	@Override
	protected void addMember(Axis axis, Member member, int position) {
		String mdx = getModel().getMdx();
		try {
			super.addMember(axis, member, position);
		}
		catch(Throwable th) {
			logger.info(th.getMessage(), th);
			
			try {
				//Try to restore previous mdx
				getModel().setMdx(mdx);
				if (!getModel().isInitialized()) {
					getModel().initialize();
				}
			}
			catch(Throwable th2) {
				logger.info(th2.getMessage(), th2);
			}
			
			
			FacesContext context = FacesContext.getCurrentInstance();
	
			ResourceBundle bundle = context.getApplication().getResourceBundle(
					context, "msg");
	
			String title = bundle.getString("error.execute.title");
	
			context.addMessage(null, new FacesMessage(
					FacesMessage.SEVERITY_ERROR, title, ExceptionUtils.getRootCauseMessage(th)));
		}
	}
	
	
	public PivotStateManager getPivotStateManager() {
		return pivotStateManager;
	}

	public void setPivotStateManager(PivotStateManager pivotStateManager) {
		this.pivotStateManager = pivotStateManager;
	}



	
}
