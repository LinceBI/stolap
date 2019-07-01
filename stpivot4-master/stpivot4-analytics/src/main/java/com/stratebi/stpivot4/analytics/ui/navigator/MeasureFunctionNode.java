package com.stratebi.stpivot4.analytics.ui.navigator;

import org.olap4j.metadata.Member;
import org.pivot4j.analytics.component.tree.NodeData;
import org.pivot4j.analytics.ui.navigator.MeasureNode;
import org.primefaces.model.TreeNode;

import com.stratebi.stpivot4.analytics.component.tree.FunctionNodeData;

public class MeasureFunctionNode extends MeasureNode {

	
	public MeasureFunctionNode(TreeNode parent, Member member) {
		super(parent, member);
	}

	@Override
	protected NodeData createData(Member object) {
		return new FunctionNodeData(object.getUniqueName(), object.getCaption());
	}
	
	@Override
	public String getType() {
		return "formula";
	}

}
