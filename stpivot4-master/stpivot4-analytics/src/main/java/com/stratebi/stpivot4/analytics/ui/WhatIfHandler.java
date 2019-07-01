/*
 * ====================================================================
 * This software is subject to the terms of the Common Public License
 * Agreement, available at the following URL:
 *   http://www.opensource.org/licenses/cpl.html .
 * You must accept the terms of that agreement to use this software.
 * ====================================================================
 */
package com.stratebi.stpivot4.analytics.ui;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.ResourceBundle;

import javax.annotation.PostConstruct;
import javax.faces.application.FacesMessage;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.ViewScoped;
import javax.faces.context.FacesContext;
import javax.faces.event.ActionEvent;
import javax.faces.model.SelectItem;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.exception.ExceptionUtils;
import org.olap4j.OlapException;
import org.olap4j.metadata.Measure;
import org.pivot4j.analytics.ui.PivotStateManager;
import org.primefaces.context.RequestContext;
import org.primefaces.event.CloseEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.stratebi.stpivot4.analytics.state.CustomMember;
import com.stratebi.stpivot4.analytics.state.WhatIfMember;

@ManagedBean(name = "whatIfHandler")
@ViewScoped
public class WhatIfHandler implements RenderFormatHandlerCallBack {

	@ManagedProperty(value = "#{pivotStateManager}")
	private PivotStateManager pivotStateManager;

	private final static Logger logger = LoggerFactory.getLogger(WhatIfHandler.class);
	
	private List<WhatIfMember> whatIfMembers = new ArrayList<WhatIfMember>();
	
	private RenderFormatHandler renderFormatHandler;
	
	private WhatIfMember whatIfMemberToRemove;
	private WhatIfMember whatIfMemberToLoadRenderFormats;
	
	
	List<SelectItem> measures = new ArrayList<SelectItem>();
	
	@PostConstruct
	protected void initialize() {
		renderFormatHandler = new RenderFormatHandler();
		renderFormatHandler.setRenderFormatHandlerCallBack(this);
		editMember(null);
	}

	public List<SelectItem> getMeasures() {

		measures.clear();
		measures.add(new SelectItem("[Measures].DefaultMember", "[Measures].DefaultMember")); 
		
		if (getPivotStateManager()!=null && pivotStateManager.getModel()!=null) {
			for (Measure measure : getPivotStateManager().getModel().getCube().getMeasures()) {
				measures.add(new SelectItem(measure.getUniqueName(), measure.getUniqueName()));
			}
		}
		
		return measures;
	}
	
	
	public void apply() throws OlapException {
		try {
			
			getPivotStateManager().getState().addWhatifMembers(whatIfMembers);
			
		} 
		catch (Throwable e) {
			logger.info(e.getMessage(), e);
			
			FacesContext context = FacesContext.getCurrentInstance();
	
			ResourceBundle bundle = context.getApplication().getResourceBundle(
					context, "msg");
	
			String title = bundle.getString("error.unhandled.title");
	
			context.addMessage(null, new FacesMessage(
					FacesMessage.SEVERITY_ERROR, title, ExceptionUtils.getRootCauseMessage(e)));
			
			RequestContext.getCurrentInstance().addCallbackParam("validationFailed", true);
		}
		
	}
	
	
	public void editMember(ActionEvent event) {
		whatIfMembers.clear();
		//Load all whatIfMembers from view
		List<CustomMember> customMembers = pivotStateManager.getState().getCustomMembers();
		for (CustomMember customMember : customMembers) {
			if (customMember instanceof WhatIfMember) {
				try {
					WhatIfMember copy = new WhatIfMember(customMember.getName(), ((WhatIfMember) customMember).getMeasureUniqueName(), ((WhatIfMember) customMember).getPercentage(), ((WhatIfMember) customMember).getRenderFormats());
					whatIfMembers.add(copy);
				} catch (Throwable th) {
					logger.error(th.getMessage(), th);
				}
			}
		}
	}
	
	public void addWhatIfMember() {
		String name = getNewUniqueName(0);
		
		WhatIfMember wim = new WhatIfMember(name, "[Measures].DefaultMember",0, null);
		
		whatIfMembers.add(wim);
	}
	
	private String getNewUniqueName(int count) {
		FacesContext context = FacesContext.getCurrentInstance();
		ResourceBundle bundle = context.getApplication().getResourceBundle(context, "msg");
		String name = bundle.getString("stpivot4.input.name");
		if (count>0) {
			name = name + "-" + count;
		}
		for (WhatIfMember member : whatIfMembers) {
			if (StringUtils.equalsIgnoreCase(member.getName(), name)) {
				return getNewUniqueName(count+1);
			}
		}
		return name;
	}
	
	public void removeWhatIfMember() {
		if (whatIfMemberToRemove!=null) {
			whatIfMembers.remove(whatIfMemberToRemove);
			whatIfMemberToRemove = null;
		}
	}
	
	public void loadRenderFormats() {
		if (whatIfMemberToLoadRenderFormats!=null) {
			renderFormatHandler.loadRenderFormats(whatIfMemberToLoadRenderFormats.getRenderFormats());
		}
		else {
			logger.warn("whatIfMemberToLoadRenderFormats is null");
		}
	}
	
	@Override
	public void closedRenderFormat() {
		if (whatIfMemberToLoadRenderFormats!=null) {
			whatIfMemberToLoadRenderFormats.getRenderFormats().clear();
			whatIfMemberToLoadRenderFormats.getRenderFormats().addAll(renderFormatHandler.generateRenderFormats());
			whatIfMemberToLoadRenderFormats = null;
		}
	}
	
	
	
	
	public void handleClose(CloseEvent event) {
		editMember(null);
	}
	
	public PivotStateManager getPivotStateManager() {
		return pivotStateManager;
	}

	public void setPivotStateManager(PivotStateManager pivotStateManager) {
		this.pivotStateManager = pivotStateManager;
	}



	public List<WhatIfMember> getWhatIfMembers() {
		return whatIfMembers;
	}



	public void setWhatIfMembers(List<WhatIfMember> whatIfMembers) {
		this.whatIfMembers = whatIfMembers;
	}


	public RenderFormatHandler getRenderFormatHandler() {
		return renderFormatHandler;
	}


	public void setRenderFormatHandler(RenderFormatHandler renderFormatHandler) {
		this.renderFormatHandler = renderFormatHandler;
	}


	public WhatIfMember getWhatIfMemberToRemove() {
		return whatIfMemberToRemove;
	}


	public void setWhatIfMemberToRemove(WhatIfMember whatIfMemberToRemove) {
		this.whatIfMemberToRemove = whatIfMemberToRemove;
	}


	public WhatIfMember getWhatIfMemberToLoadRenderFormats() {
		return whatIfMemberToLoadRenderFormats;
	}


	public void setWhatIfMemberToLoadRenderFormats(WhatIfMember whatIfMemberToLoadRenderFormats) {
		this.whatIfMemberToLoadRenderFormats = whatIfMemberToLoadRenderFormats;
	}


}
