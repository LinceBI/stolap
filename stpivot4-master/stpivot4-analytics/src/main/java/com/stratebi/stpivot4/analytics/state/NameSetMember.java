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
import java.util.List;

import org.olap4j.metadata.Hierarchy;
import org.olap4j.metadata.Member;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.stratebi.stpivot4.analytics.ui.metadata.CalculatedNamedSet;


public class NameSetMember extends FunctionMember implements Serializable {

	private final static Logger logger = LoggerFactory.getLogger(NameSetMember.class);
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
		
	public NameSetMember(String nameSet, String hierarchy, String[] uniqueNameMembers) {
		super(nameSet, "", hierarchy);
		
		StringBuilder sb = new StringBuilder();
		if (uniqueNameMembers!=null && uniqueNameMembers.length>0) {
			for (String uniqueNameMember : uniqueNameMembers) {
				sb.append(", ").append(uniqueNameMember);
			}
			if (sb.length()>0) {
				sb.delete(0, ", ".length());
			}
			sb.insert(0, "{");
			sb.append("}");
		}
		setExpression(sb.toString());
	}

	public NameSetMember(String nameSet, String hierarchy, List<Member> members) {
		super(nameSet, "", hierarchy);
		
		StringBuilder sb = new StringBuilder();
		if (members!=null && members.size()>0) {
			for (Member member : members) {
				sb.append(", ").append(member.getUniqueName());
			}
			if (sb.length()>0) {
				sb.delete(0, ", ".length());
			}
			sb.insert(0, "{");
			sb.append("}");
		}
		setExpression(sb.toString());
	}

	@Override
	public String getUniqueName() {
		return "[" + getName() + "]";
	}

	@Override
	public Member generateOlap4jMember(Hierarchy hierarchyCube) {
		//Hierarchy hierarchyCube = getHierarchyCube(cubeNode, getHierarchy());
		CalculatedNamedSet member = new CalculatedNamedSet(hierarchyCube , null, getName(), getUniqueName(), getName(), getExpression(), null);
		return member;
	}
	
}
