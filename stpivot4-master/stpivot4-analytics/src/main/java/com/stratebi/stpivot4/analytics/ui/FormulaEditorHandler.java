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

import javax.annotation.PostConstruct;
import javax.faces.application.FacesMessage;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.ViewScoped;
import javax.faces.context.FacesContext;
import javax.faces.event.ActionEvent;
//import javax.faces.event.ActionEvent;
import javax.faces.model.SelectItem;

import org.apache.commons.lang.exception.ExceptionUtils;
import org.olap4j.OlapException;
import org.olap4j.metadata.Dimension;
import org.olap4j.metadata.Hierarchy;
import org.olap4j.metadata.Level;
import org.olap4j.metadata.Member;
import org.pivot4j.analytics.ui.PivotStateManager;
import org.primefaces.context.RequestContext;
import org.primefaces.event.CloseEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.stratebi.stpivot4.analytics.state.CustomMember;
import com.stratebi.stpivot4.analytics.state.FunctionMember;
import com.stratebi.stpivot4.analytics.ui.navigator.CubeMemberNode;

@ManagedBean(name = "formulaEdHandler")
@ViewScoped
public class FormulaEditorHandler implements RenderFormatHandlerCallBack{

	private static final String DEFAULT_DIMENSION = "[Measures]";

	private final static Logger logger = LoggerFactory.getLogger(FormulaEditorHandler.class);
	
	@ManagedProperty(value = "#{pivotStateManager}")
	private PivotStateManager pivotStateManager;	
	
	private String[] formulasTexto = {"Abs()","Acos()","Acosh()","AddCalculatedMembers()","Aggregate()","AllMembers()","Ancestor()","Ancestors()","AND","Asc()","AscB()","Ascendants()","AscW()","Asin()","Asinh()","Atan2()","Atanh()","Atn()","Avg()","Axis()","BottomCount()","BottomPercent()","BottomSum()","Cache()","CalculatedChild()","Cast()","Caption","CBool()","CByte()","CDate()","CDbl()","Children","Chr","ChrB","ChrW","CInt()","ClosingPeriod()","CoalesceEmpty()","Correlation()","Cos()","Cosh()","Count()","Cousin()","Covariance()","CovarianceN()","Crossjoin()","Current","CurrentDateMember","CurrentDateString","CurrentMember","DataMember","Date()","DateAdd()","DateDiff()","DatePart()","DateSerial()","DateValue()","Day()","DDB()","DefaultMember","Degrees()","Descendants()","Dimension","Dimensions()","Distinct()","DistinctCount()","DrilldownLevel()","DrilldownLevelBottom()","DrilldownLevelTop()","DrilldownMember()","DrilldownMemberBottom()","DrilldownMemberTop()","DrillupLevel()","DrillupMember()","Except()","Exp()","Extract()","Filter()","FirstChild","FirstQ()","FirstSibling","Fix()","Format","FormatCurrency","FormatDateTime","FormatNumber","FormatPercent","FV()","Generate()","Head()","Hex()","Hierarchize()","Hierarchy","Hour()","IN","Date()","InStr","Int","Intersect()","InverseNormal","IPmt()","IRR()","IS","IS EMPTY","IS NULL","IsAncestor()","IsEmpty()","IsGeneration()","IsLeaf()","IsSibling()","Item()","Lag()","LastChild","LastNonEmpty","LastPeriods()","LastSibling","LCase()","Lead()","Left()","Len()","Level","Levels()","LinkMember()","LinRegIntercept()","LinRegPoint()","LinRegR2()","LinRegSlope()","LinRegVariance()","Log()","Log10()","LookupCube()","LTrim()","MATCHES","Max()","Median()","Members","MemberToStr()","Mid()","Min()","Minute()","MIRR()","Month()","MonthName()","Mtd()","Name","NameToSet()","NextMember","NonEmptyCrossjoin()","NOT","Now()","NPV()","NPer()","NullValue()","Oct()","OR","OpeningPeriod()","Order()","Ordinal","ParallelPeriod()","Parameter()","ParamRef()","Parent","Percentile()","PeriodsToDate()","Pi()","Pmt()","Power()","PPmt()","Predict()","PrevMember","Properties()","PV()","Qtd()","Radians()","Rank()","Rate()","Replace()","Right()","RollupChildren()","Round()","RTrim()","Second()","SetToArray()","SetToStr()","Sgn()","Siblings","Sin()","Sinh()","SLN()","Space()","Sqr()","SqrtPi()","Stddev()","StddevP()","Stdev()","StdevP()","Str()","StrComp()","String()","StripCalculatedMembers()","StrReverse()","StrToMember()","StrToSet()","StrToTuple()","StrToValue()","Subset()","Sum()","SYD()","Tail","Tan()","Tanh()","ThirdQ()","Time()","Timer()","TimeSerial()","TimeValue()","ToggleDrillState()","TopCount()","TopPercent()","TopSum()","Trim()","TupleToStr()","TypeName()","UCase()","Union()","UniqueName","UserName","Val()","ValidMeasure","Value","Var()","Variance()","VarianceP()","VarP()","VisualTotals()","Weekday()","WeekdayName()","Wtd()","XOR()","Year()","Ytd","|| Concat"};		
				
	private String selectedDimension = DEFAULT_DIMENSION;	//dimension seleccionada en el h:selectOneListbox
	private String name;				//contenido del input de la parte superior del dialogo
	private String expression;			//contenido del TextArea
	private String editingUniqueName;
	
	private RenderFormatHandler renderFormatHandler;

	@PostConstruct
	protected void initialize() {
		renderFormatHandler = new RenderFormatHandler();
	}
				
	public void addName() throws OlapException {
		try {
			FunctionMember newCustomMember = new FunctionMember(name, expression, selectedDimension);
			newCustomMember.setRenderFormats(renderFormatHandler.generateRenderFormats());
			
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
	
	@Override
	public void closedRenderFormat() {
	}
	
	
	
	public void editMember(ActionEvent event) {
		String editName = (String) event.getComponent().getAttributes().get("name").toString();

		//Find member to edit
		List<CustomMember> customMembers = getPivotStateManager().getState().getCustomMembers();
		for (CustomMember customMember : customMembers) {
			if (customMember.getUniqueName().equals(editName) && customMember instanceof FunctionMember) {
				selectedDimension = ((FunctionMember)customMember).getHierarchy();
				name = customMember.getName();
				expression = ((FunctionMember)customMember).getExpression();
				
				renderFormatHandler.loadRenderFormats( ((FunctionMember)customMember).getRenderFormats() );
				
				editingUniqueName = ((FunctionMember)customMember).getUniqueName();
			}
		}
	}
	
	
	public CubeMemberNode getCubeMemberNode() {
		
		CubeMemberNode superCubeNode = null;
		
		if (getPivotStateManager().getModel() != null && getPivotStateManager().getModel().isInitialized()) {
		
			superCubeNode = new CubeMemberNode(getPivotStateManager().getModel().getCube());
		
		} 
					
		return superCubeNode;
	}	
	
    public List<Member> cubeMemberCompleteText(String query) {

        List<Member> results = new ArrayList<Member>();
        List<Member> members = new ArrayList<Member>();

        for (Hierarchy hier : pivotStateManager.getModel().getCube().getHierarchies()) {
            for (Level lev : hier.getLevels()) {
                try {
                    members.addAll(lev.getMembers());
                } catch (OlapException e) {
                    logger.warn(e.getMessage(), e);
                }
            }
        }
        for (Member miembro : members) {
            if (miembro.getUniqueName().toLowerCase().contains(query.toLowerCase())) {
                //String resultado = miembro.getName() + " -> " + miembro.getLevel().getName();
                results.add(miembro);
            }
        }

        return results;
    }

    
    public List<SelectItem> getAllDimensions() throws OlapException {
        
    	List<SelectItem> dimensionsList = new ArrayList<SelectItem>();
       
		try {
	        for (Dimension dimension : pivotStateManager.getModel().getCube().getDimensions()) {
	            SelectItem aux = new SelectItem(dimension.getUniqueName(), dimension.getName());
	            dimensionsList.add(aux);
	        }
		} 
		catch (Exception e) {
			logger.info(e.getMessage(), e);
			
			FacesContext context = FacesContext.getCurrentInstance();
	
			ResourceBundle bundle = context.getApplication().getResourceBundle(
					context, "msg");
	
			String title = bundle.getString("error.unhandled.title");
	
			context.addMessage(null, new FacesMessage(
					FacesMessage.SEVERITY_ERROR, title, e.getMessage()));
		}
        
        
        return dimensionsList;
    }//getAllDimensions
    
	public void handleClose(CloseEvent event) {
		selectedDimension = DEFAULT_DIMENSION;
		name = "";
		expression = "";
		editingUniqueName = "";
		renderFormatHandler.loadRenderFormats(null); ;
	}
            
	public PivotStateManager getPivotStateManager() {
		return pivotStateManager;
	}

	public void setPivotStateManager(PivotStateManager pivotStateManager) {
		this.pivotStateManager = pivotStateManager;
	}

	public String[] getFormulasTexto() {
		return formulasTexto;
	}
                
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getExpression() {
		return expression;
	}

	public void setExpression(String expression) {
		this.expression = expression;
	}

	public String getSelectedDimension() {
		return selectedDimension;
	}

	public void setSelectedDimension(String selectedDimension) {
		this.selectedDimension = selectedDimension;
	}


	public String getEditingUniqueName() {
		return editingUniqueName;
	}


	public void setEditingUniqueName(String editingUniqueName) {
		this.editingUniqueName = editingUniqueName;
	}


	public RenderFormatHandler getRenderFormatHandler() {
		return renderFormatHandler;
	}


	public void setRenderFormatHandler(RenderFormatHandler renderFormatHandler) {
		this.renderFormatHandler = renderFormatHandler;
	}

					
}//CLASS
