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
import java.util.List;
import java.util.ResourceBundle;

import javax.faces.application.FacesMessage;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.ViewScoped;
import javax.faces.context.FacesContext;
import javax.faces.event.ActionEvent;
import javax.faces.model.SelectItem;

import org.apache.commons.lang.exception.ExceptionUtils;
import org.olap4j.OlapException;
import org.olap4j.metadata.Measure;
import org.pivot4j.analytics.ui.PivotStateManager;
import org.primefaces.context.RequestContext;
import org.primefaces.event.CloseEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.stratebi.stpivot4.analytics.state.CalculadoraMember;
import com.stratebi.stpivot4.analytics.state.CustomMember;

@ManagedBean(name = "calculatorHandler")
@ViewScoped
public class CalculatorHandler {

	@ManagedProperty(value = "#{pivotStateManager}")
	private PivotStateManager pivotStateManager;

	private String selectedMeasure;
	
	private String set;
	
	private String name;

	private String editingUniqueName;
	
	private final static Logger logger = LoggerFactory.getLogger(CalculatorHandler.class);
	

	public List<SelectItem> getMeasures() {
		
		List<SelectItem> measures = new ArrayList<SelectItem>();
		
		if (getPivotStateManager()!=null && pivotStateManager.getModel()!=null) {
			for (Measure measure : getPivotStateManager().getModel().getCube().getMeasures()) {
				measures.add(new SelectItem(measure.getUniqueName(), measure.getName()));
			}
		}
		
		return measures;
	}
	
	
	public String getSelectedMeasure() {
		return selectedMeasure;
	}

	public void setSelectedMeasure(String selectedMeasure) {
		this.selectedMeasure = selectedMeasure;
	}
	
	public String getSet() {
		return set;
	}

	public void setSet(String set) {
		this.set = set;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void addName() throws OlapException {
		try {
			CustomMember newCustomMember = new CalculadoraMember(name, set);
			getPivotStateManager().getState().addCustomMember(newCustomMember, editingUniqueName);
			editingUniqueName = newCustomMember.getUniqueName();
		} 
		catch (Throwable e) {
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
	
	
	public void editMember(ActionEvent event) {
		editingUniqueName = "";
		String editName = (String) event.getComponent().getAttributes().get("name").toString();

		//Find member to edit
		List<CustomMember> customMembers = getPivotStateManager().getState().getCustomMembers();
		for (CustomMember customMember : customMembers) {
			if (customMember.getName().equals(editName) && customMember instanceof CalculadoraMember) {
				name = editName;
				set = ((CalculadoraMember)customMember).getExpression();
				editingUniqueName = ((CalculadoraMember)customMember).getUniqueName();
			}
		}
	}
	
	public void handleClose(CloseEvent event) {
		selectedMeasure = "";
		set = "";
		name = "";
		editingUniqueName = "";
	}
	
	public PivotStateManager getPivotStateManager() {
		return pivotStateManager;
	}

	public void setPivotStateManager(PivotStateManager pivotStateManager) {
		this.pivotStateManager = pivotStateManager;
	}


	public String getEditingUniqueName() {
		return editingUniqueName;
	}


	public void setEditingUniqueName(String editingUniqueName) {
		this.editingUniqueName = editingUniqueName;
	}
	
}
