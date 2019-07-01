/*
 * ====================================================================
 * This software is subject to the terms of the Common Public License
 * Agreement, available at the following URL:
 *   http://www.opensource.org/licenses/cpl.html .
 * You must accept the terms of that agreement to use this software.
 * ====================================================================
 */
package com.stratebi.stpivot4.analytics.ui.navigator;

import java.util.ArrayList;
import java.util.List;

import javax.faces.FacesException;

import org.olap4j.OlapException;
import org.olap4j.metadata.Level;
import org.olap4j.metadata.Member;
import org.pivot4j.analytics.component.tree.NodeData;
import org.pivot4j.analytics.ui.navigator.LevelNodeData;
import org.pivot4j.analytics.ui.navigator.MemberNode;
import org.pivot4j.analytics.ui.navigator.MetadataNode;
import org.primefaces.model.TreeNode;

public class LevelMemberNode extends MetadataNode<Level> {

	/**
	 * @param level
	 */
	public LevelMemberNode(Level level) {
		super(level);
	}

	/**
	 * @param level
	 * @return
	 * @see org.pivot4j.analytics.ui.navigator.MetadataNode#createData(org.olap4j.metadata.MetadataElement)
	 */
	@Override
	protected NodeData createData(Level level) {
		return new LevelNodeData(level);
	}

	/**
	 * @see org.primefaces.model.TreeNode#getType()
	 */
	@Override
	public String getType() {
		return "level";
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
		Level level = getObject();

		try {
				List<Member> members = level.getMembers();
				List<TreeNode> children = new ArrayList<TreeNode>(members.size());

				for (Member member : members) {
					/*NullPointerException if check visible
					if (!member.isVisible()) {
						continue;
					}
					*/

                    MemberNode node = new MemberNode(member);
                    
					if (configureChildNode(member, node)) {
						node.setParent(this);
						children.add(node);
					}
                    
				}

				return children;
		} catch (OlapException e) {
			throw new FacesException(e);
		}
	}
}
