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

import org.apache.commons.beanutils.BeanUtils;

public class WhatIfMember extends FunctionMember implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private String measureUniqueName;
	
	private double percentage;


	
	public WhatIfMember(String name, String measureUniqueName, double percentage, List<RenderFormat> renderFormats) {
		super(name, "", "[Measures]");
		this.measureUniqueName = measureUniqueName;
		this.percentage = percentage;
		if (renderFormats!=null) {
			for (RenderFormat renderFormat : renderFormats) {
				try {
					RenderFormat copyRenderFormat = new RenderFormat();
					BeanUtils.copyProperties(copyRenderFormat , renderFormat);
					getRenderFormats().add(copyRenderFormat); 
				} catch (Throwable th) {/*Skip error*/}
			}
		}
	}

	@Override
	public String getExpression() {
		return "("  + getMeasureUniqueName() + "*(100 + (" + percentage + "))/100)";
	}



	@Override
	public void setExpression(String expression) {
		/*Do nothing*/
	}


	public String getMeasureUniqueName() {
		return measureUniqueName;
	}



	public void setMeasureUniqueName(String measureUniqueName) {
		this.measureUniqueName = measureUniqueName;
	}



	public double getPercentage() {
		return percentage;
	}



	public void setPercentage(double percentage) {
		this.percentage = percentage;
	}





}
