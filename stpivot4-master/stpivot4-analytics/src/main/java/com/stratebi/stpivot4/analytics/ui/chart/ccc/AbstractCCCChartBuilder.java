package com.stratebi.stpivot4.analytics.ui.chart.ccc;

import javax.faces.context.FacesContext;

import org.apache.commons.lang.StringUtils;
import org.pivot4j.analytics.ui.chart.AbstractSeriesChartBuilder;
import org.pivot4j.analytics.ui.chart.DefaultChartRenderer.Position;
import org.pivot4j.ui.chart.ChartRenderContext;

import com.stratebi.stpivot4.analytics.ui.chart.CCCDefaultChartRenderer;
import com.stratebi.stpivot4.analytics.ui.chart.ccc.chart.CccChart;

/*
 * Esta clase es la encargada de crear la gráfica, para esto ademas hay que
 * modificar CharBuilderFactory y crear una entrada nueva en el método
 * registerDefaultChartBuilders(Map<String, Class<? extends ChartBuilder>> builders)
 *
 * Establece además el punto de entrada que se necesita para desplegar los textos
 * internacionalizados que están en
 *
 * /pivot4j-analytics/src/main/resources/org/pivot4j/analytics/i18n/messages.properties
 *
 * note que estos comienzan por <<label.chart.items>> por lo que sus todoas sus entradas
 * serán de la forma label.chart.items.ccc.Bar
 *
 */
public abstract class AbstractCCCChartBuilder<C extends CccChart> extends AbstractSeriesChartBuilder<C> {

	public AbstractCCCChartBuilder(FacesContext context) {
		super(context);
	}

	
	@Override
	protected void configureChart(ChartRenderContext context, C chart) {
		super.configureChart(context, chart);

		chart.setZoom(true);
		
		CCCDefaultChartRenderer renderer = (CCCDefaultChartRenderer) context.getRenderer();
		
		if (StringUtils.isNotBlank(renderer.getTitle())) {
			chart.setTitle(renderer.getTitle());
		}
		
		if (renderer.getTitlePosition()==null) {
			chart.setTitle("");
		}
		
		chart.setTitlePosition(getCCCPosition(renderer.getTitlePosition()));
		chart.setTitleColor(renderer.getTitleColor());
		chart.setTitleFontSize(renderer.getTitleFontSize());
		chart.setOrientation(renderer.getOrientation());
		
		chart.setAxisXTitle(renderer.getAxisXTitle());
		chart.setAxisYTitle(renderer.getAxisYTitle());
		chart.setAxisXGrid(renderer.isAxisXGrid());
		chart.setAxisYGrid(renderer.isAxisYGrid());
		chart.setAxisXMargins(renderer.getAxisXMargins());
		chart.setAxisYMargins(renderer.getAxisYMargins());
		
		chart.setShowDatatip(renderer.isShowValues());
		chart.setValuesFontSize(renderer.getValuesFontSize());
		chart.setAxisLabelFontSize(renderer.getAxisLabelFontSize());
		
		chart.setLegendPosition(getCCCPosition(renderer.getLegendPosition()));
		chart.setStacked(renderer.isStacked());
		
		chart.setDotsVisible(renderer.isDotsVisible());
		chart.setDotShape(renderer.getDotShape());
		chart.setDotShapeSize(renderer.getDotShapeSize());
	}
	
    public String getCCCPosition(Position position) {
        String cccPosition = "left";
        
        if (position!=null) {
            if (position.name().equals("n")) {
                cccPosition = "top";
            }
            else if (position.name().equals("w")) {
                cccPosition = "left";
            }

            else if (position.name().equals("s")) {
                cccPosition = "bottom";
            }

            else if (position.name().equals("e")) {
                cccPosition = "right";
            }
        }
        else {
        	cccPosition = "";
        }
        
        return cccPosition;
    }
	
}
