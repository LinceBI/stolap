/*
 * ====================================================================
 * This software is subject to the terms of the Common Public License
 * Agreement, available at the following URL:
 *   http://www.opensource.org/licenses/cpl.html .
 * You must accept the terms of that agreement to use this software.
 * ====================================================================
 */
package com.stratebi.stpivot4.analytics.state;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.olap4j.metadata.Hierarchy;
import org.olap4j.metadata.Member;
import org.pivot4j.analytics.ui.navigator.CubeNode;
import org.pivot4j.analytics.ui.navigator.HierarchyNode;
import org.primefaces.model.TreeNode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.stratebi.stpivot4.analytics.ui.metadata.CalculatedMeasure;


public class FunctionMember implements CustomMember, Serializable {

	private final static Logger logger = LoggerFactory.getLogger(FunctionMember.class);
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
		
	private String name;
	
	private String expression;

	private String hierarchy;
	
	/**
	 * El ultimo de la lista es el formato por defecto.
	 */
	private List<RenderFormat> renderFormats = new ArrayList<RenderFormat>();
	
	
	
	public FunctionMember(String name, String expression, String hierarchy) {
		this.name = name;
		this.expression = expression;
		this.hierarchy = hierarchy;
	}
	
	public Member generateOlap4jMember(Hierarchy hierarchyCube) {
		
		//Hierarchy hierarchyCube = getHierarchyCube(cubeNode, getHierarchy());
		CalculatedMeasure member = new CalculatedMeasure(hierarchyCube , null, getName(), getUniqueName(), getName(), getExpression(), null);
		return member;
	}
	
	protected Hierarchy getHierarchyCube(CubeNode cubeNode, String hierarchy) {
		if (cubeNode!=null) {
			List<TreeNode> cubeChildren = cubeNode.getChildren();
			for (TreeNode tree : cubeChildren) {
				if ((tree instanceof HierarchyNode)) {
					HierarchyNode hier = (HierarchyNode) tree;
					Hierarchy addedHier = hier.getObject();
					if ( addedHier.getUniqueName().equals(hierarchy) ) {
						return hier.getObject();
					}
				}
			}
		}
		return null;
	}	
	

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getExpression() {
		return expression;
	}

	public void setExpression(String expression) {
		this.expression = expression;
	}
	
	public String getHierarchy() {
		return hierarchy;
	}

	public void setHierarchy(String hierarchy) {
		this.hierarchy = hierarchy;
	}
	
	public String getCaption() {
		return name;
	}
	
	/**
	 * 
	 * @return formatString para la medida. Si no es una medida o no tiene formato return null.
	 */
	public String getFormatString() {
		String formatString = null;
		if (hierarchy!=null && "[Measures]".equalsIgnoreCase(hierarchy)) {
			formatString = RenderFormat.generateFormatString(renderFormats);
		}
		return formatString;
	}
	

	public List<RenderFormat> getRenderFormats() {
		return renderFormats;
	}

	public void setRenderFormats(List<RenderFormat> renderFormats) {
		this.renderFormats = renderFormats;
	}
	
	
	@Override
	public String getUniqueName() {
		StringBuilder sb = new StringBuilder();
		if (StringUtils.isNotEmpty(getName())) {
			sb.append(hierarchy).append(".[").append(getName()).append("]");
		}
		return sb.toString();
	}


}
