package com.stratebi.stpivot4.analytics.ui.navigator;

import org.olap4j.metadata.Member;
import org.pivot4j.analytics.component.tree.NodeData;
import org.pivot4j.analytics.ui.navigator.MeasureNode;
import org.primefaces.model.TreeNode;

import com.stratebi.stpivot4.analytics.component.tree.NameSetNodeData;

public class NameSetNode extends MeasureNode {

	public NameSetNode(TreeNode parent, Member member) {
		super(parent, member);
	}

	@Override
	protected NodeData createData(Member object) {
		return new NameSetNodeData(object.getUniqueName(), object.getCaption(), object.getHierarchy().getUniqueName());
	}
	
	@Override
	public String getType() {
		return "nameset";
	}

}
