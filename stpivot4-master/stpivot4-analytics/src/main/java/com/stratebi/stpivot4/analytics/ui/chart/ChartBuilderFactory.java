/*
 * ====================================================================
 * This software is subject to the terms of the Common Public License
 * Agreement, available at the following URL:
 *   http://www.opensource.org/licenses/cpl.html .
 * You must accept the terms of that agreement to use this software.
 * ====================================================================
 */
package com.stratebi.stpivot4.analytics.ui.chart;

import java.util.Map;

import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;

import org.pivot4j.analytics.ui.chart.ChartBuilder;

import com.stratebi.stpivot4.analytics.ui.chart.ccc.CccBarChartBuilder;
import com.stratebi.stpivot4.analytics.ui.chart.ccc.CccBoxPlotChartBuilder;
import com.stratebi.stpivot4.analytics.ui.chart.ccc.CccDotChartBuilder;
import com.stratebi.stpivot4.analytics.ui.chart.ccc.CccHeatGridChartBuilder;
import com.stratebi.stpivot4.analytics.ui.chart.ccc.CccLineChartBuilder;
import com.stratebi.stpivot4.analytics.ui.chart.ccc.CccNormalizedBarChartBuilder;
import com.stratebi.stpivot4.analytics.ui.chart.ccc.CccPieChartBuilder;
import com.stratebi.stpivot4.analytics.ui.chart.ccc.CccStackedAreaChartBuilder;
import com.stratebi.stpivot4.analytics.ui.chart.ccc.CccStackedLineChartBuilder;
import com.stratebi.stpivot4.analytics.ui.chart.ccc.CccWaterfallChartBuilder;

@ManagedBean(name = "chartBuilderFactory")
@ApplicationScoped
public class ChartBuilderFactory extends org.pivot4j.analytics.ui.chart.ChartBuilderFactory {

	@Override
	protected void registerDefaultChartBuilders(Map<String, Class<? extends ChartBuilder>> builders) {
		//super.registerDefaultChartBuilders(builders);
		
        // ccc builders
		builders.put(CccBarChartBuilder.NAME, CccBarChartBuilder.class);
		builders.put(CccLineChartBuilder.NAME, CccLineChartBuilder.class);
		builders.put(CccNormalizedBarChartBuilder.NAME, CccNormalizedBarChartBuilder.class);
		builders.put(CccStackedAreaChartBuilder.NAME, CccStackedAreaChartBuilder.class);
		builders.put(CccStackedLineChartBuilder.NAME, CccStackedLineChartBuilder.class);
		builders.put(CccPieChartBuilder.NAME, CccPieChartBuilder.class);
		builders.put(CccHeatGridChartBuilder.NAME, CccHeatGridChartBuilder.class);
		builders.put(CccBoxPlotChartBuilder.NAME, CccBoxPlotChartBuilder.class);
		builders.put(CccDotChartBuilder.NAME, CccDotChartBuilder.class);
		builders.put(CccWaterfallChartBuilder.NAME, CccWaterfallChartBuilder.class);
		
	}


}
