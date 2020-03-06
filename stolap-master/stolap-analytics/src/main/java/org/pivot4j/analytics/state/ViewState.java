/*
 * ====================================================================
 * This software is subject to the terms of the Common Public License
 * Agreement, available at the following URL:
 *   http://www.opensource.org/licenses/cpl.html .
 * You must accept the terms of that agreement to use this software.
 * ====================================================================
 */
package org.pivot4j.analytics.state;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Iterator;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.olap4j.CellSet;
import org.olap4j.CellSetAxis;
import org.olap4j.OlapException;
import org.pivot4j.ModelChangeEvent;
import org.pivot4j.ModelChangeListener;
import org.pivot4j.PivotModel;
import org.pivot4j.analytics.datasource.ConnectionInfo;
import org.pivot4j.analytics.repository.ReportFile;
import org.pivot4j.mdx.CompoundId;
import org.pivot4j.mdx.Exp;
import org.pivot4j.mdx.Formula;
import org.pivot4j.mdx.Formula.Property;
import org.pivot4j.mdx.Formula.Type;
import org.pivot4j.mdx.FunCall;
import org.pivot4j.mdx.Literal;
import org.pivot4j.mdx.MdxParser;
import org.pivot4j.mdx.MdxStatement;
import org.pivot4j.mdx.QueryAxis;
import org.pivot4j.mdx.impl.MdxParserImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.stratebi.stolap.analytics.state.CustomMember;
import com.stratebi.stolap.analytics.state.FunctionMember;
import com.stratebi.stolap.analytics.state.HierarchyFilterItem;
import com.stratebi.stolap.analytics.state.HierarchyFiltersMember;
import com.stratebi.stolap.analytics.state.MdxHistory;
import com.stratebi.stolap.analytics.state.NameSetMember;
import com.stratebi.stolap.analytics.state.WhatIfMember;


/**
 * Nueva funcionalidad para almacenar un historico de las mdx que se van aplicando.
 * Nueva funcionalidad para almacenar los miembros que se agregan desde la calculadora (customMembers)
 * 
 *
 */
public class ViewState extends org.pivot4j.analytics.state.ViewStatePivot4j {
	
	private List<MdxHistory> mdxHistory;
	
	private List<CustomMember> customMembers = new ArrayList<CustomMember>();
	
	private String[] lastAnalysisWizard;

	private Logger logger = LoggerFactory.getLogger(ViewState.class);

	public ViewState(String id, String name, ConnectionInfo connectionInfo, PivotModel model, ReportFile file) {
		super(id, name, connectionInfo, model, file);
		
		mdxHistory = new ArrayList<MdxHistory>();
		if (model!=null) {
			model.addModelChangeListener(modelChangeListener);
		}
	}

	public ViewState(String id, String name) {
		super(id, name);
		
		mdxHistory = new ArrayList<MdxHistory>();
	}

	
	public List<MdxHistory> getMdxHistory() {
		return mdxHistory;
	}
	
	@Override
	public void setModel(PivotModel model) {
		super.setModel(model);
		
		mdxHistory = new ArrayList<MdxHistory>();
		if (model!=null) {
			model.addModelChangeListener(modelChangeListener);
		}
	}
	

	public List<CustomMember> getCustomMembers() {
		return customMembers;
	}

	public void setCustomMembers(List<CustomMember> customMembers) {
		this.customMembers = customMembers;
	}


	
	/**
	 * Add un 'with member' al cubo
	 * editingUniqueName es el uniqueName del miembro que se esta editando o null si es uno nuevo.
	 * 
	 * @param newCustomMember
	 * @throws Throwable 
	 * @throws OlapException
	 */
	public void addCustomMember(CustomMember newCustomMember, String editingUniqueName) throws Throwable {
		//Check if exists calculated member with same name.
		for (Iterator iterator = customMembers.iterator(); iterator.hasNext();) {
			CustomMember customMember = (CustomMember) iterator.next();
			if ( StringUtils.equalsIgnoreCase(customMember.getUniqueName(), newCustomMember.getUniqueName()) && !StringUtils.equalsIgnoreCase(customMember.getUniqueName(), editingUniqueName)) {
				throw new Exception("Duplicated calculated member with name " + newCustomMember.getUniqueName());
			}
		}
		
		try {
			processFormulasInMdx(newCustomMember, editingUniqueName);

			//Add new member if ok
			
			//Delete members with previous name.
			removeCustomMember(customMembers, editingUniqueName);
			
			customMembers.add(newCustomMember);
		}
		catch(Throwable th) {
			logger.info(th.getMessage(), th);
			
			throw th;
		}
		
	}
	
	public void addWhatifMembers(List<WhatIfMember> newWhatIfMembers) throws Throwable {
		try {
			processFormulasInMdx(newWhatIfMembers);

			//Add new members if ok
			
			//Delete previous whatIfMembers.
			for (Iterator iterator = customMembers.iterator(); iterator.hasNext();) {
				CustomMember customMember = (CustomMember) iterator.next();
				if (customMember instanceof WhatIfMember) {
					iterator.remove();
				}
			}
			
			//Add new whatIfMembers
			for (WhatIfMember whatIfMember : newWhatIfMembers) {
				customMembers.add(new WhatIfMember(whatIfMember.getName(), whatIfMember.getMeasureUniqueName(), whatIfMember.getPercentage(), whatIfMember.getRenderFormats()));
			}
		}
		catch(Throwable th) {
			logger.info(th.getMessage(), th);
			
			throw th;
		}
	}
	
	public void addHierarchyFiltersMember(HierarchyFiltersMember hierarchyFiltersMember) throws Throwable {
		try {
			//Add new members if ok
			
			//Delete previous HierarchyFiltersMember with same name.
			for (Iterator iterator = customMembers.iterator(); iterator.hasNext();) {
				CustomMember customMember = (CustomMember) iterator.next();
				if (customMember instanceof HierarchyFiltersMember) {
					if (hierarchyFiltersMember.getName().equals(customMember.getName())) {
						iterator.remove();
					}
				}
			}
			
			HierarchyFiltersMember hfm = new HierarchyFiltersMember(hierarchyFiltersMember.getName());
			hfm.getMembersSelection().addAll(hierarchyFiltersMember.getMembersSelection());
			hfm.getHierarchyFilterItems().addAll(hierarchyFiltersMember.getHierarchyFilterItems());
			
			addCustomMember(hfm, hfm.getName());
		}
		catch(Throwable th) {
			logger.info(th.getMessage(), th);
			
			throw th;
		}
		
	}

	public void removeHierarchyFiltersMember(String uniqueNameToRemove) {
		for (Iterator iterator = customMembers.iterator(); iterator.hasNext();) {
			CustomMember customMember = (CustomMember) iterator.next();
			if (customMember instanceof HierarchyFiltersMember) {
				if (uniqueNameToRemove.equals(customMember.getName())) {
					iterator.remove();
				}
			}
		}
	}
	
	
	/**
	 * Cambia la mdx por otra nueva. Si la nueva mdx tiene algun problema, deja la anterior mdx
	 * 
	 * @param newMdx
	 * @throws Throwable
	 */
	public void changeCurrentMdx(String newMdx) throws Throwable {
		//To revert mdx changes
		String mdx = getModel().getCurrentMdx();
		try {
			
			getModel().setMdx(newMdx);
			
			if (!getModel().isInitialized()) {
				getModel().initialize();
			}

			//Execute to check if is valid?
			CellSet cellSet = getModel().getCellSet();
		}
		catch(Throwable th) {
			logger.info(th.getMessage(), th);
			//Revert mdx changes
			getModel().setMdx(mdx);
			
			if (!getModel().isInitialized()) {
				getModel().initialize();
			}
			//Execute to check if is valid?
			CellSet cellSet = getModel().getCellSet();
			
			throw th;
		}
		
	}
		

	/**
	 * Genera en la mdx una formula para cada getStateManager().getState().getCustomMembers().add(customMemeber);
	 * Actualiza currentMdx con la mdx generada.
	 * @param editingUniqueName 
	 * @throws Throwable 
	 * 
	 * 
	 */
	private void processFormulasInMdx(CustomMember newCustomMember, String editingUniqueName) throws Throwable {
		String mdx = getModel().getCurrentMdx();
		if (StringUtils.isNotEmpty(editingUniqueName)) {
			//Replace old name by new name
			mdx = StringUtils.replace(mdx, editingUniqueName, newCustomMember.getUniqueName());
		}
		
		List<CustomMember> auxCustomMembers = new ArrayList<CustomMember>(customMembers);
		removeCustomMember(auxCustomMembers, editingUniqueName);
		if (newCustomMember!=null) {
			auxCustomMembers.add(newCustomMember);
		}
		
		processFormulasInMdx(mdx, auxCustomMembers);
	}
	
	public void removeCustomMember(String uniqueNameToRemove) throws Throwable {
		try {
			
			String mdx =  getModel().getCurrentMdx();
			MdxParser parser = new MdxParserImpl();
			MdxStatement query = parser.parse(mdx);
			
			removeFromMdxQuery(query, uniqueNameToRemove);
			
			List<CustomMember> auxCustomMembers = new ArrayList<CustomMember>();
			for (CustomMember customMember : customMembers) {
				if (!uniqueNameToRemove.equals(customMember.getUniqueName())) {
					auxCustomMembers.add(customMember);
				}
			}
			processFormulasInMdx(query.toMdx(), auxCustomMembers);
			
			
			//Remove member if ok
			
			//Delete member.
			for (Iterator iterator = customMembers.iterator(); iterator.hasNext();) {
				CustomMember customMember = (CustomMember) iterator.next();
				if (uniqueNameToRemove.equals(customMember.getUniqueName())) {
					iterator.remove();
				}
			}
		}
		catch(Throwable th) {
			logger.info(th.getMessage(), th);
			
			throw th;
		}
		
	}
	
	private void removeFromMdxQuery(MdxStatement query, String uniqueNameToRemove) {
		
		List<Formula> formulas = query.getFormulas();
		List<QueryAxis> axes = query.getAxes();
		Exp slicer = query.getSlicer();
		
		
		for (Iterator iterator = formulas.iterator(); iterator.hasNext();) {
			Formula formula = (Formula) iterator.next();
			String nameToFound = formula.getName().toMdx();
			if (uniqueNameToRemove.equals(nameToFound)) {
				iterator.remove();
			}
		}
		
		for (Iterator iterator = axes.iterator(); iterator.hasNext();) {
			QueryAxis queryAxis = (QueryAxis) iterator.next();
			
			if (queryAxis.getExp() instanceof FunCall) {
				FunCall cid = (FunCall) queryAxis.getExp();
				List<Exp> args = cid.getArgs();
				for (Iterator iterator2 = args.iterator(); iterator2.hasNext();) {
					Exp exp = (Exp) iterator2.next();
					String nameToFound = exp.toMdx();

					if (uniqueNameToRemove.equals(nameToFound)) {
						iterator2.remove();
					}
				}
			}
		}
		
		if (slicer!=null && slicer instanceof FunCall) {
			FunCall cid = (FunCall) slicer;
			List<Exp> args = cid.getArgs();
			for (Iterator iterator2 = args.iterator(); iterator2.hasNext();) {
				Exp exp = (Exp) iterator2.next();
				String nameToFound = exp.toMdx();
				if (uniqueNameToRemove.equals(nameToFound)) {
					iterator2.remove();
				}
			}
		}
		
		
	}
	
	private void processFormulasInMdx(List<WhatIfMember> newWhatIfMembers) throws Throwable {
		//Remove all current whatIfMembers in mdx
		ArrayList<CustomMember> oldWhatIfMembers = new ArrayList<CustomMember>();
		for (CustomMember customMember : customMembers) {
			if (customMember instanceof WhatIfMember) {
				boolean found=false;
				for (CustomMember newCustomMember : newWhatIfMembers) {
					if (newCustomMember.getUniqueName().equalsIgnoreCase(customMember.getUniqueName())) {
						found=true;
						break;
					}
				}
				if (!found) {
					oldWhatIfMembers.add(customMember);
				}
			}
		}
		String mdx =  getModel().getCurrentMdx();
		MdxParser parser = new MdxParserImpl();
		MdxStatement query = parser.parse(mdx);
		
		for (CustomMember customMember : oldWhatIfMembers) {
			removeFromMdxQuery(query, customMember.getUniqueName());
		}
		
		
		List<CustomMember> auxCustomMembers = new ArrayList<CustomMember>();
		for (CustomMember customMember : customMembers) {
			if ((customMember instanceof WhatIfMember)==false) {
				auxCustomMembers.add(customMember);
			}
		}
		auxCustomMembers.addAll(newWhatIfMembers);
		
		processFormulasInMdx(query.toMdx(), auxCustomMembers);
	}
	

	private void processFormulasInMdx(String mdx, List<CustomMember> auxCustomMembers) throws Throwable {
		MdxParser parser = new MdxParserImpl();
		MdxStatement query = parser.parse(mdx);
		List<Formula> formulas = query.getFormulas();
		for (CustomMember customMember : auxCustomMembers) {
			
			if (customMember instanceof FunctionMember) {
				FunctionMember calculadoraMember = (FunctionMember)customMember;
				Type type = (customMember instanceof NameSetMember) ? Type.SET : Type.MEMBER; 
				boolean found = false;
				String propertyFormatString = calculadoraMember.getFormatString();
				for (Formula formula2 : formulas) {
					if (formula2.getName().toMdx().equalsIgnoreCase(customMember.getUniqueName() ) ) {
						found = true;
						Exp exp = Literal.createString(calculadoraMember.getExpression());
						formula2.setExp(exp);
						formula2.setType(type);
						
						formula2.getProperties().clear();
						if (StringUtils.isNotEmpty(propertyFormatString)) {
							Property formatString = new Property("FORMAT_STRING", Literal.createString(propertyFormatString));
							formula2.getProperties().add(formatString );
						}
						
						break;
					}
				}
				if (!found) {
					CompoundId name = new CompoundId(customMember.getUniqueName());
					Exp exp = Literal.createString(calculadoraMember.getExpression());
					Formula newFormula = new Formula(name , exp, type);
					
					if (StringUtils.isNotEmpty(propertyFormatString)) {
						Property formatString = new Property("FORMAT_STRING", Literal.createString(propertyFormatString));
						newFormula.getProperties().add(formatString );
					}
					
					formulas.add(newFormula);
				}
			}
			
		}
		
		String newMdx = query.toMdx();
		
		for (CustomMember customMember : auxCustomMembers) {
			if (customMember instanceof HierarchyFiltersMember) {
				HierarchyFiltersMember hfm = (HierarchyFiltersMember) customMember;
				NameSetMember newCustomMember = new NameSetMember("aux", hfm.getUniqueName(), hfm.getMembersSelection().toArray(new String[0]));

				int idxAfterSelect = newMdx.toLowerCase().indexOf("select ");
				if (idxAfterSelect!=-1) {
					String afterSelect = newMdx.substring(idxAfterSelect);
					
					String expressionToReplace = newCustomMember.getExpression();
					
					String newExpression = expressionToReplace;
					for (HierarchyFilterItem hierarchyFilterItem : hfm.getHierarchyFilterItems()) {
						newExpression = hierarchyFilterItem.applyTo(newExpression);
					}

					if (afterSelect.contains(expressionToReplace) && !afterSelect.contains(newExpression)) {
						newMdx = newMdx.substring(0, idxAfterSelect) + StringUtils.replace(afterSelect, expressionToReplace, newExpression);
					}
					else {
						expressionToReplace = newCustomMember.getUniqueName();
						if (afterSelect.contains(expressionToReplace) && !afterSelect.contains(newExpression)) {
							newMdx = newMdx.substring(0, idxAfterSelect) + StringUtils.replace(afterSelect, expressionToReplace, newExpression);
						}
					}
				}
			}
		}
		changeCurrentMdx(newMdx);
	}

	
	
	private void removeCustomMember(List<CustomMember> auxCustomMembers, String editingUniqueName) {
		if (StringUtils.isNotEmpty(editingUniqueName)) {
			for (Iterator iterator = auxCustomMembers.iterator(); iterator.hasNext();) {
				CustomMember customMember = (CustomMember) iterator.next();
				if (StringUtils.equalsIgnoreCase(customMember.getUniqueName(), editingUniqueName)) {
					iterator.remove();
				}
			}
		}
	}
	
	
	
	
	private ModelChangeListener modelChangeListener = new ModelChangeListener() {
		
		private boolean isValid(PivotModel model) {
			if (model == null || !model.isInitialized()) {
				return false;
			}

			CellSet cellSet = model.getCellSet();

			if (cellSet == null) {
				return false;
			}

			List<CellSetAxis> axes = model.getCellSet().getAxes();
			if (axes.size() < 2) {
				return false;
			}

			return axes.get(0).getPositionCount() > 0
					&& axes.get(1).getPositionCount() > 0;
		}

		
		private void addNewMDXHistory(PivotModel model) {
			if (isValid(model)) {
				String currentMdx = model.getCurrentMdx();
				
				MdxHistory mdxEntry = new MdxHistory();
				mdxEntry.setId(Calendar.getInstance().getTimeInMillis());
				mdxEntry.setName(new SimpleDateFormat("yyyyMMdd_HHmmss").format(Calendar.getInstance().getTime()));
				mdxEntry.setMdx(currentMdx);
				mdxHistory.add(0, mdxEntry);
			}
		}
		
		@Override
		public void structureChanged(ModelChangeEvent e) {
			addNewMDXHistory(e.getModel());
		}
		
		@Override
		public void modelInitialized(ModelChangeEvent e) {
			addNewMDXHistory(e.getModel());
		}
		
		@Override
		public void modelDestroyed(ModelChangeEvent e) {
			if (mdxHistory!=null) {
				mdxHistory.clear();
			}
			if (customMembers!=null) {
				customMembers.clear();;
			}
			lastAnalysisWizard = null;
		}
		
		@Override
		public void modelChanged(ModelChangeEvent e) {
			addNewMDXHistory(e.getModel());
		}
	};

	public String[] getLastAnalysisWizard() {
		return lastAnalysisWizard;
	}

	public void setLastAnalysisWizard(String[] lastAnalysisWizard) {
		this.lastAnalysisWizard = lastAnalysisWizard;
	}





}
