package com.stratebi.stpivot4.analytics.ui.navigator;

import org.olap4j.metadata.Member;
import org.pivot4j.analytics.component.tree.NodeData;
import org.pivot4j.analytics.ui.navigator.MeasureNode;
import org.primefaces.model.TreeNode;

import com.stratebi.stpivot4.analytics.component.tree.WhatIfNodeData;

public class WhatIfNode extends MeasureNode {

	public WhatIfNode(TreeNode parent, Member member) {
		super(parent, member);
	}

	@Override
	protected NodeData createData(Member object) {
		return new WhatIfNodeData(object.getUniqueName(), object.getCaption());
	}
}
