package com.stratebi.stpivot4.analytics.ui.navigator;

import java.util.ArrayList;
import java.util.List;

import javax.faces.FacesException;

import org.olap4j.OlapException;
import org.olap4j.metadata.Dimension.Type;
import org.olap4j.metadata.Hierarchy;
import org.olap4j.metadata.Level;
import org.olap4j.metadata.Member;
import org.pivot4j.analytics.ui.navigator.MeasureNode;
import org.pivot4j.analytics.ui.navigator.MetadataNode;
import org.primefaces.model.TreeNode;

public class HierarchyMemberNode extends MetadataNode<Hierarchy> {

	/**
	 * @param hierarchy
	 */
	public HierarchyMemberNode(Hierarchy hierarchy) {
		super(hierarchy);
	}

	/**
	 * @see org.primefaces.model.TreeNode#getType()
	 */
	@Override
	public String getType() {
		return "hierarchy";
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
		Hierarchy hierarchy = getObject();

		try {
			if (hierarchy.getDimension().getDimensionType() == Type.MEASURE) {
				List<? extends Member> members = hierarchy.getRootMembers();
				List<TreeNode> children = new ArrayList<TreeNode>(
						members.size());

				for (Member member : members) {
					if (!member.isVisible()) {
						continue;
					}

					MeasureNode node = new MeasureNode(this, member);
					//node.setNodeFilter(getNodeFilter());

					if (configureChildNode(member, node)) {
						node.setParent(this);
						children.add(node);
					}
					
				}

				return children;
			} else {
				List<Level> levels = hierarchy.getLevels();
				List<TreeNode> children = new ArrayList<TreeNode>(levels.size());

				for (Level level : levels) {
					if (!level.isVisible()) {
						continue;
					}

					LevelMemberNode node = new LevelMemberNode(level);
					//node.setNodeFilter(getNodeFilter());

					if (configureChildNode(level, node)) {
						node.setParent(this);
						children.add(node);
					}
					
				}

				return children;
			}
		} catch (OlapException e) {
			throw new FacesException(e);
		}
	}
}
