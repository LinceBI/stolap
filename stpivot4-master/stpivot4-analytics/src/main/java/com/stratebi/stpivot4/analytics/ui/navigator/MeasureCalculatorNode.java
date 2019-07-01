package com.stratebi.stpivot4.analytics.ui.navigator;

import org.olap4j.metadata.Member;
import org.pivot4j.analytics.component.tree.NodeData;
import org.pivot4j.analytics.ui.navigator.MeasureNode;
import org.primefaces.model.TreeNode;

import com.stratebi.stpivot4.analytics.component.tree.CalculatorNodeData;

public class MeasureCalculatorNode extends MeasureNode {

	public MeasureCalculatorNode(TreeNode parent, Member member) {
		super(parent, member);
	}

	@Override
	protected NodeData createData(Member object) {
		return new CalculatorNodeData(object.getUniqueName(), object.getCaption());
	}

}
