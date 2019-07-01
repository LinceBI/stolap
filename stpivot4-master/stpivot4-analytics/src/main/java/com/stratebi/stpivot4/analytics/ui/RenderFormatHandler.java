/*
 * ====================================================================
 * This software is subject to the terms of the Common Public License
 * Agreement, available at the following URL:
 *   http://www.opensource.org/licenses/cpl.html .
 * You must accept the terms of that agreement to use this software.
 * ====================================================================
 */
package com.stratebi.stpivot4.analytics.ui;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.faces.model.SelectItem;
import javax.faces.model.SelectItemGroup;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.stratebi.stpivot4.analytics.state.RenderFormat;

public class RenderFormatHandler implements Serializable  {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private final static Logger logger = LoggerFactory.getLogger(RenderFormatHandler.class);
	
	private static final String[] DEFAULT_FORMAT_STRINGS =  {
			"0.0",
			"#,##0.00",
			"#,##0.00 %",
			"$ #,##0.00",
			"(#,##0.00)",
			"0",
			"#,##0",
	};
	
	private static final String[] DEFAULT_COMPARISON_OPERATORS = {
			"=",
			"<",
			"<=",
			">",
			">="
	};


	private static final String DEFAULT_COMPARISON_OPERATOR = "=";
	private static final double DEFAULT_COMPARISON_VALUE = 0;
	private static final String DEFAULT_FORMAT_STRING = "0.0";

	private boolean applyFormat;
	private String defaultFormatString = DEFAULT_FORMAT_STRING;
	private String defaultColorFG;
	private String defaultArrow;
	private String defaultLink;
	
	private String conditionalComparisonOperator;
	private double conditionalComparisonValue;
	private String conditionalFormatString = DEFAULT_FORMAT_STRING;
	private String conditionalColorFG;
	private String conditionalArrow;
	private String conditionalLink;
	
	private String renderFormatToRemove;

	private List<RenderFormat> conditionalRenderFormats = new ArrayList<RenderFormat>();
	
	private RenderFormatHandlerCallBack renderFormatHandlerCallBack;

	
	public void removeRenderFormat() {
		if (renderFormatToRemove!=null) {
			for (Iterator iterator = conditionalRenderFormats.iterator(); iterator.hasNext();) {
				RenderFormat renderFormat = (RenderFormat) iterator.next();
				if (StringUtils.equals(renderFormatToRemove, renderFormat.getId()) ) {
					iterator.remove();
				}
			}
			renderFormatToRemove = null;
		}
	}
	
	public void addConditionalFormat() {
		RenderFormat rf = new RenderFormat();
		rf.setId(RenderFormat.generateRandomId());
		rf.setComparisonOperator(DEFAULT_COMPARISON_OPERATOR);
		rf.setComparisonValue(DEFAULT_COMPARISON_VALUE);
		rf.setFormatString(DEFAULT_FORMAT_STRING);
		rf.setFgColor("");
		rf.setLink("");
		rf.setArrowSignClass("");
		
		conditionalRenderFormats.add(rf);
	}
	
	public List<RenderFormat> generateRenderFormats() {
		List<RenderFormat> rfs = new ArrayList<RenderFormat>();
		if (applyFormat) {
			
			for (RenderFormat conditionalRenderFormat : conditionalRenderFormats) {
				try {
					RenderFormat copyRenderFormat = new RenderFormat();
					BeanUtils.copyProperties(copyRenderFormat , conditionalRenderFormat);
					rfs.add(copyRenderFormat);
				} catch (Throwable th) {
					logger.error(th.getMessage(), th);
				}
			}
			
			RenderFormat defaultRenderFormat = new RenderFormat();
			defaultRenderFormat.setId(RenderFormat.generateRandomId());
			defaultRenderFormat.setFormatString(StringUtils.defaultIfBlank(defaultFormatString, DEFAULT_FORMAT_STRING));
			defaultRenderFormat.setFgColor(defaultColorFG);
			defaultRenderFormat.setLink(defaultLink);
			defaultRenderFormat.setArrowSignClass(defaultArrow);
			rfs.add(defaultRenderFormat);
		}
		return rfs;
	}
	
	public void loadRenderFormats(List<RenderFormat> renderFormats) {
		applyFormat = false;
		defaultFormatString = StringUtils.defaultIfBlank(conditionalFormatString, DEFAULT_FORMAT_STRING);
		defaultColorFG = "";
		defaultArrow = "";
		defaultLink = "";
		conditionalRenderFormats.clear();
		
		if (renderFormats!=null && renderFormats.size()>0) {
			applyFormat = true;
			for (int i = 0; i < renderFormats.size(); i++) {
				RenderFormat renderFormat = renderFormats.get(i);
				if (i==(renderFormats.size()-1)) {
					//Formato por defecto.
					defaultFormatString = StringUtils.defaultIfBlank(renderFormat.getFormatString(), DEFAULT_FORMAT_STRING);
					defaultColorFG = renderFormat.getFgColor();
					defaultArrow = renderFormat.getArrowSignClass();
					defaultLink = renderFormat.getLink();
				}
				else {
					try {
						RenderFormat copyRenderFormat = new RenderFormat();
						BeanUtils.copyProperties(copyRenderFormat , renderFormat);
						conditionalRenderFormats.add(copyRenderFormat); 
					} catch (Throwable th) {
						logger.error(th.getMessage(), th);
					}
				}
			}
		}
	}
	
	public void handleClose() {
		if (renderFormatHandlerCallBack!=null) {
			renderFormatHandlerCallBack.closedRenderFormat();
		}
	}
	
	
	
	public String[] getFormatStrings() {
		return DEFAULT_FORMAT_STRINGS;
	}

	
	public String[] getComparisonOperators() {
		return DEFAULT_COMPARISON_OPERATORS;
	}
	
	
	public List<SelectItem> getAvailableArrows() {
		List<SelectItem> orders = new ArrayList<SelectItem>();

		orders.add(new SelectItem("arrow-blank", "blank"));
		
		SelectItemGroup sig = new SelectItemGroup("Arrow up");
		sig.setSelectItems(new SelectItem[] { new SelectItem("arrow-upred", "Up red"), new SelectItem("arrow-upgreen", "Up green"), new SelectItem("arrow-upblack", "Up black")});
		orders.add(sig);

		sig = new SelectItemGroup("Arrow down");
		sig.setSelectItems(new SelectItem[] { new SelectItem("arrow-downred", "Down red"), new SelectItem("arrow-downgreen", "Down green"), new SelectItem("arrow-downblack", "Down black")});
		orders.add(sig);

		sig = new SelectItemGroup("Pin points");
		sig.setSelectItems(new SelectItem[] {new SelectItem("arrow-pinred", "Pin red"), new SelectItem("arrow-pingreen", "Pin green"), new SelectItem("arrow-pinblack", "Pin black"), new SelectItem("arrow-pinyellow", "Pin yellow"), new SelectItem("arrow-pinblue", "Pin blue")});
		orders.add(sig);
		
		return orders;
	}
	
	
	public String getDefaultFormatString() {
		return defaultFormatString;
	}

	public void setDefaultFormatString(String defaultFormatString) {
		this.defaultFormatString = defaultFormatString;
	}

	public String getDefaultColorFG() {
		return defaultColorFG;
	}

	public void setDefaultColorFG(String defaultColorFG) {
		this.defaultColorFG = defaultColorFG;
	}

	public String getDefaultLink() {
		return defaultLink;
	}

	public void setDefaultLink(String defaultLink) {
		this.defaultLink = defaultLink;
	}

	public List<RenderFormat> getConditionalRenderFormats() {
		return conditionalRenderFormats;
	}

	public void setConditionalRenderFormats(List<RenderFormat> conditionalRenderFormats) {
		this.conditionalRenderFormats = conditionalRenderFormats;
	}

	public boolean isApplyFormat() {
		return applyFormat;
	}

	public void setApplyFormat(boolean applyFormat) {
		this.applyFormat = applyFormat;
	}

	public String getDefaultArrow() {
		return defaultArrow;
	}

	public void setDefaultArrow(String defaultArrow) {
		this.defaultArrow = defaultArrow;
	}

	public String getConditionalComparisonOperator() {
		return conditionalComparisonOperator;
	}

	public void setConditionalComparisonOperator(String conditionalComparisonOperator) {
		this.conditionalComparisonOperator = conditionalComparisonOperator;
	}

	public double getConditionalComparisonValue() {
		return conditionalComparisonValue;
	}

	public void setConditionalComparisonValue(double conditionalComparisonValue) {
		this.conditionalComparisonValue = conditionalComparisonValue;
	}

	public String getConditionalFormatString() {
		return conditionalFormatString;
	}

	public void setConditionalFormatString(String conditionalFormatString) {
		this.conditionalFormatString = conditionalFormatString;
	}

	public String getConditionalColorFG() {
		return conditionalColorFG;
	}

	public void setConditionalColorFG(String conditionalColorFG) {
		this.conditionalColorFG = conditionalColorFG;
	}

	public String getConditionalArrow() {
		return conditionalArrow;
	}

	public void setConditionalArrow(String conditionalArrow) {
		this.conditionalArrow = conditionalArrow;
	}

	public String getConditionalLink() {
		return conditionalLink;
	}

	public void setConditionalLink(String conditionalLink) {
		this.conditionalLink = conditionalLink;
	}

	public String getRenderFormatToRemove() {
		return renderFormatToRemove;
	}

	public void setRenderFormatToRemove(String renderFormatToRemove) {
		this.renderFormatToRemove = renderFormatToRemove;
	}

	public RenderFormatHandlerCallBack getRenderFormatHandlerCallBack() {
		return renderFormatHandlerCallBack;
	}

	public void setRenderFormatHandlerCallBack(RenderFormatHandlerCallBack renderFormatHandlerCallBack) {
		this.renderFormatHandlerCallBack = renderFormatHandlerCallBack;
	}


}
