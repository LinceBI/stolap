package com.stratebi.stpivot4.analytics.ui.chart.ccc;

import javax.faces.context.FacesContext;

import org.pivot4j.ui.chart.ChartRenderContext;

import com.stratebi.stpivot4.analytics.ui.chart.ccc.chart.CccBarChart;

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
public class CccBarChartBuilder extends AbstractCCCChartBuilder<CccBarChart> {

	public static String NAME = "ccc.Bar";

	public CccBarChartBuilder(FacesContext context) {
		super(context);
	}

	@Override
	public String getName() {
		return NAME;
	}

	@Override
	protected CccBarChart createChart(ChartRenderContext context) {
		CccBarChart cccBarChart = new CccBarChart();
		return cccBarChart;
	}

	
}
