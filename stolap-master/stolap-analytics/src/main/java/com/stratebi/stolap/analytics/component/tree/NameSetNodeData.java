/*
 * ====================================================================
 * This software is subject to the terms of the Common Public License
 * Agreement, available at the following URL:
 *   http://www.opensource.org/licenses/cpl.html .
 * You must accept the terms of that agreement to use this software.
 * ====================================================================
 */
package com.stratebi.stolap.analytics.component.tree;

import org.pivot4j.analytics.component.tree.NodeData;

public class NameSetNodeData extends NodeData {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String hierarchyUniqueName;
	
	public NameSetNodeData() {
		super();
	}

	public NameSetNodeData(String id, String name, String hierarchyUniqueName) {
		super(id, name);
		this.hierarchyUniqueName = hierarchyUniqueName; 
	}

	public String getHierarchyUniqueName() {
		return hierarchyUniqueName;
	}

}
