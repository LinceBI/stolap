/*
 * ====================================================================
 * This software is subject to the terms of the Common Public License
 * Agreement, available at the following URL:
 *   http://www.opensource.org/licenses/cpl.html .
 * You must accept the terms of that agreement to use this software.
 * ====================================================================
 */
package org.pivot4j.analytics.ui;

import java.util.List;
import java.util.ResourceBundle;

import javax.faces.application.FacesMessage;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.RequestScoped;
import javax.faces.context.FacesContext;
import javax.faces.event.ActionEvent;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.exception.ExceptionUtils;
import org.pivot4j.ui.collector.NonInternalPropertyCollector;
import org.primefaces.context.RequestContext;
import org.primefaces.extensions.model.layout.LayoutOptions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Modificaciones sobre el ViewHandler original de pivot 4j.
 * 
 * Cambios que implementa:
 * 
 *  El panel del editor de la consulta mdx aparece inicialmente cerrado.
 *
 */

@ManagedBean(name = "viewHandler")
@RequestScoped
public class ViewHandler extends ViewHandlerPivot4j {

	private final static Logger logger = LoggerFactory.getLogger(ViewHandler.class);
	
	@Override
	public LayoutOptions getLayoutOptions() {
		LayoutOptions options = super.getLayoutOptions();
		if (options!=null && options.getCenterOptions()!=null) {
			LayoutOptions centerChildOptions = options.getCenterOptions().getChildOptions();
			if (centerChildOptions!=null) {
				LayoutOptions editorOptions = centerChildOptions.getSouthOptions();
				if (editorOptions!=null) {
					editorOptions.addOption("initClosed", true);					
				}
			}
		}
		return options;
	}


	public void removeCustomMember(ActionEvent event) {
		String uniqueNameToRemove = (String) event.getComponent().getAttributes().get("name").toString();
		try {
			if (StringUtils.isNotBlank(uniqueNameToRemove)) {
				getStateManager().getState().removeCustomMember(uniqueNameToRemove);
			}
		} catch (Throwable e) {
			logger.info(e.getMessage(), e);
			
			FacesContext context = FacesContext.getCurrentInstance();
	
			ResourceBundle bundle = context.getApplication().getResourceBundle(
					context, "msg");
	
			String title = bundle.getString("error.execute.title");
	
			context.addMessage(null, new FacesMessage(
					FacesMessage.SEVERITY_ERROR, title, ExceptionUtils.getRootCauseMessage(e)));
			
			RequestContext.getCurrentInstance().addCallbackParam("validationFailed", true);
		}
		
	}
	

	/**
	 * @return the nonEmpty
	 */
	public boolean getMemberProperties() {
		if (getStateManager()==null || getStateManager().getModel() == null || !getStateManager().getModel() .isInitialized()) {
			return false;
		}
		return getRenderer().getPropertyCollector() !=null && getRenderer().getPropertyCollector() instanceof NonInternalPropertyCollector;
	}

	/**
	 * @param nonEmpty
	 *            the nonEmpty to set
	 */
	public void setMemberProperties(boolean memberProperties) {
		if (memberProperties) {
			getRenderer().setPropertyCollector(new NonInternalPropertyCollector());
		}
		else {
			getRenderer().setPropertyCollector(null);
		}
	}


	@Override
	public void render() {
		getStateManager().keepAlive();
		super.render();
	}


	@Override
	public void onCubeChange() {
		logger.debug("onCubeChange");
		if (getStateManager()!=null && getStateManager().getModel() != null) {
			getStateManager().getModel().setDefaultNonEmpty(true);
		}
		super.onCubeChange();
	}


	public static boolean errorsMessagesInContext() {
		try {
			FacesContext context = FacesContext.getCurrentInstance();
			List<FacesMessage> msgs = context.getMessageList();
			for (FacesMessage facesMessage : msgs) {
				if (facesMessage.getSeverity()==FacesMessage.SEVERITY_WARN || facesMessage.getSeverity()==FacesMessage.SEVERITY_ERROR || facesMessage.getSeverity()==FacesMessage.SEVERITY_FATAL) {
					return true;
				}
			}
		}
		catch(Exception e) {
			logger.warn(e.getMessage(), e);
		}
		
		return false;
	}


}
