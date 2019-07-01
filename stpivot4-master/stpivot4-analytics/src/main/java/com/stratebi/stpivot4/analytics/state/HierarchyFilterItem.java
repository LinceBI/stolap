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
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.util.Locale;

import javax.faces.model.SelectItem;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class HierarchyFilterItem implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private static final DecimalFormat decimalFormat = new DecimalFormat("0.0;- 0.0", DecimalFormatSymbols.getInstance(Locale.ENGLISH));


	private final static Logger logger = LoggerFactory.getLogger(HierarchyFilterItem.class);
	
	public static final SelectItem[] filters = {
			new SelectItem("Top", "Ranking Top-Down"), new SelectItem("Bottom", "Ranking Bottom-Up"), new SelectItem("Limit", "Limit"),
			new SelectItem("Filter", "Filter by measure"), new SelectItem("Order", "Order by measure"), new SelectItem("StripCalculatedMembers", "No calculated"),
			new SelectItem("VisualTotals", "Visual Totals")
	};
	public static final SelectItem[] orderOptions = {
			new SelectItem("ASC", "ASC"), new SelectItem("DESC", "DESC"), new SelectItem("BASC", "BASC"),
			new SelectItem("BDESC", "BDESC")
	};
	public static final SelectItem[] filterOptions = {
			new SelectItem(">", ">"), new SelectItem("<", "<"), new SelectItem("=", "="),
			new SelectItem(">=", ">="), new SelectItem("<=", "<=")
	};
	public static final SelectItem[] limitOptions = {
			new SelectItem("Head", "First"), new SelectItem("Tail", "Last")
	};
	public static final SelectItem[] topOptions = {
			new SelectItem("Count", "Count"), new SelectItem("Sum", "Sum"), new SelectItem("Percent", "Percent")
	};
	public static final SelectItem[] bottomOptions = topOptions;
	

	private String filter;
	private String measure;
	private String option;
	private int optionValue;

	
	public static SelectItem[] optionsForFilter(String selectedFilter) {
		if (selectedFilter!=null) {
			if (selectedFilter.equalsIgnoreCase("Top")) {
				return topOptions;
			}
			else if (selectedFilter.equalsIgnoreCase("Bottom")) {
				return bottomOptions;
			}
			else if (selectedFilter.equalsIgnoreCase("Limit")) {
				return limitOptions;
			}
			else if (selectedFilter.equalsIgnoreCase("Filter")) {
				return filterOptions;
			}
			else if (selectedFilter.equalsIgnoreCase("Order")) {
				return orderOptions;
			}
		}
		return new SelectItem[0];
	}
	
	public SelectItem[] getOptions() {
		String selectedFilter = filter;
		
		if (selectedFilter!=null) {
			if (selectedFilter.equalsIgnoreCase("Top")) {
				return topOptions;
			}
			else if (selectedFilter.equalsIgnoreCase("Bottom")) {
				return bottomOptions;
			}
			else if (selectedFilter.equalsIgnoreCase("Limit")) {
				return limitOptions;
			}
			else if (selectedFilter.equalsIgnoreCase("Filter")) {
				return filterOptions;
			}
			else if (selectedFilter.equalsIgnoreCase("Order")) {
				return orderOptions;
			}
		}
		return new SelectItem[0];
	}
	
	
	public String applyTo(String mdxExtractToApply) {
		StringBuilder newmdx = new StringBuilder(mdxExtractToApply);
		
		if (mdxExtractToApply!=null) {
			if (filter.equalsIgnoreCase("Top")) {
				newmdx.insert(0, option + "(").insert(0, "Top")
				.append(", ").append(decimalFormat.format(optionValue))
				.append(", ").append(measure)
				.append(")");
			}
			else if (filter.equalsIgnoreCase("Bottom")) {
				newmdx.insert(0, option + "(").insert(0, "Bottom")
				.append(", ").append(decimalFormat.format(optionValue))
				.append(", ").append(measure)
				.append(")");
			}
			else if (filter.equalsIgnoreCase("Limit")) {
				newmdx.insert(0, option + "(")
				.append(", ").append(decimalFormat.format(optionValue))
				.append(")");
			}
			else if (filter.equalsIgnoreCase("Filter")) {
				newmdx.insert(0, "Filter(").append(", (").append(measure).append(" ")
				.append(option).append(" ").append(decimalFormat.format(optionValue))
				.append("))");
			}
			else if (filter.equalsIgnoreCase("Order")) {
				newmdx.insert(0, "Order(").append(", ").append(measure)
					.append(", ").append(option).append(")");
			}
			else if (filter.equalsIgnoreCase("StripCalculatedMembers")) {
				newmdx.insert(0, "StripCalculatedMembers(").append(")");
			}
			else if (filter.equalsIgnoreCase("VisualTotals")) {
				newmdx.insert(0, "VisualTotals(").append(", \"Subtotal - *\")");
			}
		}
		return newmdx.toString();
	}
	
	
	public String getFilterName() {
		if (filter!=null) {
			for (SelectItem selectItem : filters) {
				if (selectItem.getValue().equals(filter)) {
					return selectItem.getLabel();
				}
			}
		}
		return null;
	}
	
	public String getDescription() {
		StringBuilder sb = new StringBuilder();
		if (filter!=null) {
			sb.append(applyTo(" <Members> "));
		}
		
		return sb.toString();
	}
	
	public String getFilter() {
		return filter;
	}
	public void setFilter(String filter) {
		this.filter = filter;
	}
	public String getMeasure() {
		return measure;
	}
	public void setMeasure(String measure) {
		this.measure = measure;
	}
	public String getOption() {
		return option;
	}
	public void setOption(String option) {
		this.option = option;
	}
	public int getOptionValue() {
		return optionValue;
	}
	public void setOptionValue(int optionValue) {
		this.optionValue = optionValue;
	}


	

	
}
