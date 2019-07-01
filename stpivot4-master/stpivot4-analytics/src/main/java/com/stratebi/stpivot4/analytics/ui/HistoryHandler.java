/*
 * ====================================================================
 * This software is subject to the terms of the Common Public License
 * Agreement, available at the following URL:
 *   http://www.opensource.org/licenses/cpl.html .
 * You must accept the terms of that agreement to use this software.
 * ====================================================================
 */
package com.stratebi.stpivot4.analytics.ui;


import java.util.List;
import java.util.ResourceBundle;

import javax.faces.application.FacesMessage;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.ViewScoped;
import javax.faces.context.FacesContext;

import org.pivot4j.analytics.ui.PivotStateManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.stratebi.stpivot4.analytics.state.MdxHistory;

@ManagedBean(name = "historyHandler")
@ViewScoped
public class HistoryHandler {
	
	private Logger logger = LoggerFactory.getLogger(getClass());
	
	@ManagedProperty(value = "#{pivotStateManager}")
	private PivotStateManager pivotStateManager;
	
	private MdxHistory selectedMdx;
	
	private MdxHistory mdxHistoryToRemove;
	
	
	public List<MdxHistory> getMdxs() {
		return pivotStateManager.getState().getMdxHistory();
	}
			
	public void apply() {
		if (selectedMdx != null) {
			try {
				pivotStateManager.getModel().setMdx(selectedMdx.getMdx());
			} 
			catch (Exception e) {
				FacesContext context = FacesContext.getCurrentInstance();
	
				ResourceBundle bundle = context.getApplication().getResourceBundle(
						context, "msg");
	
				String title = bundle.getString("error.unhandled.title");
	
				context.addMessage(null, new FacesMessage(
						FacesMessage.SEVERITY_ERROR, title, e.getMessage()));
			}
		}
	}
	
	public void removeMdxHistory() {
		if (mdxHistoryToRemove!=null) {
			if (selectedMdx==mdxHistoryToRemove) {
				selectedMdx = null;
			}
		    getMdxs().remove(mdxHistoryToRemove);
		    mdxHistoryToRemove = null;
		    
		    
			FacesContext context = FacesContext.getCurrentInstance();
			ResourceBundle bundle = context.getApplication().getResourceBundle(
					context, "msg");

			String title = bundle.getString("message.delete.report.title");
			String message = bundle.getString("message.delete.report.message");

			context.addMessage(null, new FacesMessage(FacesMessage.SEVERITY_INFO,
					title, message));
		}
		else {
			logger.info("Nothing to remove");
		}
	}	
	

	public MdxHistory getSelectedMdx() {
		return selectedMdx;
	}


	public void setSelectedMdx(MdxHistory selectedMdx) {
		this.selectedMdx = selectedMdx;
	}


	public MdxHistory getMdxHistoryToRemove() {
		return mdxHistoryToRemove;
	}


	public void setMdxHistoryToRemove(MdxHistory mdxHistoryToRemove) {
		this.mdxHistoryToRemove = mdxHistoryToRemove;
	}

	
	public PivotStateManager getPivotStateManager() {
		return pivotStateManager;
	}


	public void setPivotStateManager(PivotStateManager pivotStateManager) {
		this.pivotStateManager = pivotStateManager;
	}
	
}
