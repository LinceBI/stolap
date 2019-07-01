/*
 * ====================================================================
 * This software is subject to the terms of the Common Public License
 * Agreement, available at the following URL:
 *   http://www.opensource.org/licenses/cpl.html .
 * You must accept the terms of that agreement to use this software.
 * ====================================================================
 */
package com.stratebi.stpivot4.analytics.ui.metadata;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.olap4j.OlapException;
import org.olap4j.impl.Named;
import org.olap4j.impl.NamedListImpl;
import org.olap4j.mdx.ParseTreeNode;
import org.olap4j.metadata.Datatype;
import org.olap4j.metadata.Dimension;
import org.olap4j.metadata.Hierarchy;
import org.olap4j.metadata.Level;
import org.olap4j.metadata.Measure;
import org.olap4j.metadata.Member;
import org.olap4j.metadata.NamedList;
import org.olap4j.metadata.Property;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class CalculatedMeasure implements Measure, Named, Calculated {


	private final static Logger logger = LoggerFactory.getLogger(CalculatedMeasure.class);
	
	private Dimension dimension;
	private Hierarchy hierarchy;
	private String name;
	private String uniqueName;
	private String formula;
	
	private Map<String, String> properties = new HashMap<String, String>();
	private String description;
	private Level level;
	private Datatype datatype;


	public CalculatedMeasure(
			Hierarchy hierarchy,
			Level level,
			String name,
			String uniqueName,
			String description,
			String formula,
			Map<String, String> properties)
	{
		if (level==null) {
			this.dimension = hierarchy.getDimension();
			this.hierarchy = hierarchy;
			this.level = hierarchy.getLevels().get(0);
		}
		else {
			this.level=level;
			this.hierarchy = this.level.getHierarchy();
			this.dimension = this.hierarchy.getDimension();
		}
		this.name = name;
		this.description = description;
		this.formula = formula;
		this.uniqueName = uniqueName;
		if (properties != null) {
			this.properties.putAll(properties);
		}
	}
	


	public Dimension getDimension() {
		return dimension;
	}


	public Hierarchy getHierarchy() {
		return hierarchy;
	}
	
	public String getFormula() {
		return formula;
	}

	public Type getMemberType() {
		return Type.FORMULA;
	}


	public Map<String, String> getFormatProperties() {
		return properties;
	}
	
	public String getFormatPropertyValue(String key) throws OlapException {
		if (properties.containsKey(key)) {
			return properties.get(key);
		}
		return null;
	}

	public void setFormatProperty(String key, String value) throws OlapException {
		properties.put(key, value);
	}


	public String getCaption() {
		return name;
	}


	public String getDescription() {
		return description;
	}


	public String getName() {
		return name;
	}


	public String getUniqueName() {
		return uniqueName;
	}


	public Aggregator getAggregator() {
		return Aggregator.CALCULATED;
	}


	public boolean isVisible() {
		return true;
	}



	@Override
	public List<Member> getAncestorMembers() {
		return  Collections.emptyList();
	}



	@Override
	public int getChildMemberCount() throws OlapException {
		throw new UnsupportedOperationException();
	}



	@Override
	public NamedList<? extends Member> getChildMembers() throws OlapException {
		throw new UnsupportedOperationException();
	}



	@Override
	public Member getDataMember() {
		return this;
	}



	@Override
	public int getDepth() {
		if (level!=null) {
			return level.getDepth();
		}
		else {
			throw new UnsupportedOperationException();
		}
	}



	@Override
	public ParseTreeNode getExpression() {
		throw new UnsupportedOperationException();
	}



	@Override
	public Level getLevel() {
		return level;
	}



	@Override
	public int getOrdinal() {
		throw new UnsupportedOperationException();
	}



	@Override
	public Member getParentMember() {
		return null;
	}



	@Override
	public String getPropertyFormattedValue(Property property) throws OlapException {
		return String.valueOf(getPropertyValue(property));
	}



	@Override
	public int getSolveOrder() {
		throw new UnsupportedOperationException();
	}



	@Override
	public boolean isAll() {
		return false;
	}



	@Override
	public boolean isCalculated() {
		return true;
	}



	@Override
	public boolean isCalculatedInQuery() {
		return true;
	}



	@Override
	public boolean isChildOrEqualTo(Member arg0) {
		return false;
	}



	@Override
	public boolean isHidden() {
		return false;
	}



	@Override
	public Datatype getDatatype() {
	        if (datatype  != null) {
	        	return datatype;
	        }
	        return Datatype.STRING;
	}



	/* (non-Javadoc)
	 * @see java.lang.Object#hashCode()
	 */
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result
				+ ((uniqueName == null) ? 0 : uniqueName.hashCode());
		return result;
	}



	/* (non-Javadoc)
	 * @see java.lang.Object#equals(java.lang.Object)
	 */
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		CalculatedMeasure other = (CalculatedMeasure) obj;
		if (uniqueName == null) {
			if (other.uniqueName != null)
				return false;
		} else if (!uniqueName.equals(other.uniqueName))
			return false;
		return true;
	}


	/**
	 * DO NOT USE THIS - just dummy
	 */
	@Deprecated
	public NamedList<Property> getProperties() {
		return new NamedListImpl();
	}



	/**
	 * DO NOT USE THIS
	 */
	@Deprecated
	public Object getPropertyValue(Property p) throws OlapException {
		if (properties.containsKey(p.getName())) {
			return properties.get(p.getName());
		}
		return null;
	}



	/**
	 * DO NOT USE THIS
	 */
	@Deprecated
	public void setProperty(Property arg0, Object arg1) throws OlapException {
		// TODO Auto-generated method stub
		
	}
	
}
