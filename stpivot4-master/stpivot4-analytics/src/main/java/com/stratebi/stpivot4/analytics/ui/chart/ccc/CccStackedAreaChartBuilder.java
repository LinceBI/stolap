package com.stratebi.stpivot4.analytics.ui.chart.ccc;

import javax.faces.context.FacesContext;

import org.pivot4j.ui.chart.ChartRenderContext;

import com.stratebi.stpivot4.analytics.ui.chart.ccc.chart.CccStackedAreaChart;

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
public class CccStackedAreaChartBuilder extends AbstractCCCChartBuilder<CccStackedAreaChart> {

	public static String NAME = "ccc.StackedArea";

	/**
	 * @param context
	 */
	public CccStackedAreaChartBuilder(FacesContext context) {
		super(context);
	}

	/**
	 * @see org.pivot4j.analytics.ui.chart.ChartBuilder#getName()
	 */
	@Override
	public String getName() {
		return NAME;
	}

	/**
	 * @see org.pivot4j.analytics.ui.chart.AbstractChartBuilder#createChart(org.pivot4j.ui.chart.ChartRenderContext)
	 */
	@Override
	protected CccStackedAreaChart createChart(ChartRenderContext context) {
		CccStackedAreaChart cccStackedAreaChart = new CccStackedAreaChart();
		return cccStackedAreaChart;
	}

}
