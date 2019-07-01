/*
 * ====================================================================
 * This software is subject to the terms of the Common Public License
 * Agreement, available at the following URL:
 *   http://www.opensource.org/licenses/cpl.html .
 * You must accept the terms of that agreement to use this software.
 * ====================================================================
 */
package com.stratebi.stpivot4.analytics.ui;

import static org.pivot4j.ui.CellTypes.VALUE;

import javax.el.MethodExpression;
import javax.faces.component.UIParameter;
import javax.faces.component.html.HtmlOutputLink;
import javax.faces.component.html.HtmlOutputText;
import javax.faces.context.FacesContext;
import javax.faces.convert.DoubleConverter;

import org.apache.commons.lang.StringUtils;
import org.olap4j.Cell;
import org.pivot4j.el.ExpressionContext;
import org.pivot4j.ui.table.TableRenderContext;
import org.pivot4j.util.RenderPropertyUtils;
import org.primefaces.behavior.ajax.AjaxBehavior;
import org.primefaces.behavior.ajax.AjaxBehaviorListenerImpl;
import org.primefaces.component.inplace.Inplace;
import org.primefaces.component.inputtext.InputText;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.stratebi.stpivot4.analytics.state.RenderFormat;

public class PivotComponentBuilder extends org.pivot4j.analytics.ui.PivotComponentBuilder {

	private final static Logger logger = LoggerFactory.getLogger(PivotComponentBuilder.class);
	
	public PivotComponentBuilder(FacesContext facesContext) {
		super(facesContext);
	}
	
	/* 
	 * Copia del metodo que sobreescribe e incluyendo custom format para los miembros calculados.
	 * (non-Javadoc)
	 * @see org.pivot4j.analytics.ui.PivotComponentBuilder#renderContent(org.pivot4j.ui.table.TableRenderContext, java.lang.String, java.lang.Double)
	 */
	@Override
	public void renderContent(TableRenderContext context, String label, Double value) {
		ExpressionContext elContext = context.getExpressionContext();
		
		//Check if value with custom format
		RenderFormat renderFormat = RenderFormat.parseFormatString(label);
		if (renderFormat!=null) {
			label = renderFormat.getId();
		}

		elContext.put("label", label);
		elContext.put("value", value);

		String labelText;

		RenderPropertyUtils propertyUtils = getRenderPropertyUtils();

		try {
			labelText = StringUtils.defaultIfEmpty(
					propertyUtils.getString("label",
							context.getRenderPropertyCategory(), label), "");
		} finally {
			elContext.remove("label");
			elContext.remove("value");
		}

		Cell cell = context.getCell();

		if (scenarioEnabled && context.getCellType().equals(VALUE)
				&& cell != null) {
			Inplace inplace = new Inplace();
			inplace.setId("inplace-" + context.getCell().getOrdinal());
			inplace.setLabel(labelText);
			inplace.setEditor(true);

			InputText input = new InputText();
			input.setId("input-" + context.getCell().getOrdinal());
			input.setValue(value);
			input.setConverter(new DoubleConverter());

			MethodExpression expression = expressionFactory
					.createMethodExpression(facesContext.getELContext(),
							"#{viewHandler.updateCell}", Void.class,
							new Class<?>[0]);

			AjaxBehavior behavior = new AjaxBehavior();
			behavior.addAjaxBehaviorListener(new AjaxBehaviorListenerImpl(
					expression, expression));
			behavior.setProcess("@this");
			behavior.setUpdate("@form");

			UIParameter commandParam = new UIParameter();
			commandParam.setName("cell");
			commandParam.setValue(Integer.toString(cell.getOrdinal()));

			inplace.addClientBehavior("save", behavior);
			inplace.getChildren().add(commandParam);
			inplace.getChildren().add(input);

			column.getChildren().add(inplace);
		} else {
			HtmlOutputText text = new HtmlOutputText();
			String id = "txt-" + text.hashCode();

			text.setId(id);
			text.setValue(labelText);

			if (context.getMember() != null) {
				text.setTitle(context.getMember().getUniqueName());
			}

			String link = propertyUtils.getString("link",
					context.getRenderPropertyCategory(), null);

			if (renderFormat!=null) {
				//Apply custom format
				if (StringUtils.isNotBlank(renderFormat.getFgColor())) {
					text.setStyle("color: #" + renderFormat.getFgColor());
				}

				if (StringUtils.isNotBlank(renderFormat.getArrowSignClass())) {
					text.setStyleClass("arrowsign " + renderFormat.getArrowSignClass());
				}
				
				if (renderFormat!=null && StringUtils.isNotBlank(renderFormat.getLink())) {
					link = renderFormat.getLink();
				}
			}
			

			if (link == null) {
				column.getChildren().add(text);
			} else {
				HtmlOutputLink anchor = new HtmlOutputLink();
				anchor.setTarget("_blank");
				anchor.setValue(link);
				anchor.getChildren().add(text);

				column.getChildren().add(anchor);
			}
		}
		
	}


	
	
}
