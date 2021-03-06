package com.stratebi.stolap.analytics.ui.navigator;

import java.util.ArrayList;
import java.util.List;

import org.olap4j.metadata.Cube;
import org.olap4j.metadata.Dimension;
import org.olap4j.metadata.Hierarchy;
import org.olap4j.metadata.MetadataElement;
import org.pivot4j.analytics.ui.navigator.DimensionNode;
import org.pivot4j.analytics.ui.navigator.MetadataNode;
import org.primefaces.model.TreeNode;

public class CubeMemberNode extends MetadataNode<Cube> {

	/**
	 * @param cube
	 */
	public CubeMemberNode(Cube cube) {
		super(cube);
	}

	/**
	 * @see org.primefaces.model.TreeNode#getType()
	 */
	@Override
	public String getType() {
		return "cube";
	}

	/**
	 * @see org.primefaces.model.TreeNode#isLeaf()
	 */
	@Override
	public boolean isLeaf() {
		return false;
	}

	/**
	 * @see org.pivot4j.analytics.ui.navigator.MetadataNode#createChildren()
	 */
	@Override
	protected List<TreeNode> createChildren() {
		List<Dimension> dimensions = getObject().getDimensions();
		List<TreeNode> children = new ArrayList<TreeNode>(dimensions.size());

		for (Dimension dimension : dimensions) {
			if (!dimension.isVisible()) {
				continue;
			}

			MetadataElement element;

			MetadataNode<?> node;

			Hierarchy defaultHierarchy = dimension.getDefaultHierarchy();

			if (dimension.getHierarchies().size() == 1
					&& defaultHierarchy.isVisible()) {
				element = defaultHierarchy;

				node = new HierarchyMemberNode((Hierarchy) element);
			} else {
				element = dimension;

				node = new DimensionNode(dimension);
				//node.setNodeFilter(getNodeFilter());
			}

			if (configureChildNode(element, node)) {
				node.setParent(this);
				children.add(node);
			}
		}

		return children;
	}
}
