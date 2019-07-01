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

import org.olap4j.metadata.Member;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class HierarchyFiltersMember implements CustomMember, Serializable {

	private final static Logger logger = LoggerFactory.getLogger(HierarchyFiltersMember.class);
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
		
	private String name;
	
	private List<HierarchyFilterItem> hierarchyFilterItems = new ArrayList<HierarchyFilterItem>();

	List<String> membersSelection = new ArrayList<String>();
	
	private void HierarchyFilterMember() {
	}
	
	public HierarchyFiltersMember(String name) {
		HierarchyFilterMember();
		this.name = name;
	}
	

	@Override
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	
	@Override
	public String getUniqueName() {
		return name;
	}

	public List<HierarchyFilterItem> getHierarchyFilterItems() {
		return hierarchyFilterItems;
	}

	public void setHierarchyFilterItems(List<HierarchyFilterItem> hierarchyFilterItems) {
		this.hierarchyFilterItems = hierarchyFilterItems;
	}

	public List<String> getMembersSelection() {
		return membersSelection;
	}

	public void setMembersSelection(List<Member> membersSelection) {
		this.membersSelection.clear();
		for (Member member : membersSelection) {
			this.membersSelection.add(member.getUniqueName());
		}
	}

	public void setMembersUniquesNames(List<String> membersSelection) {
		this.membersSelection.clear();
		for (String member : membersSelection) {
			this.membersSelection.add(member);
		}
	}


}
