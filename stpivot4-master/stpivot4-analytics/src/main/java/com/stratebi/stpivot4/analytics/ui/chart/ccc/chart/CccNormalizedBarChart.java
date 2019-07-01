package com.stratebi.stpivot4.analytics.ui.chart.ccc.chart;

import javax.faces.application.ResourceDependencies;
import javax.faces.application.ResourceDependency;

/*
 * Esta clase es una mera extensión, pero lo importante aquí son las definiciones de los valores
 * constantes al inicio pues son usados por primefaces y pivot4j para llamar a las clases
 * Estos valores son los usados en el contexto de java server faces
 *
 *  /pivot4j-analytics/src/main/webapp/WEB-INF/faces-config.xml
 *
 * 	<render-kit>
 *    <renderer>
 *       <component-family>org.pivot4j.analytics.ui.chart.ccc</component-family>
 *       <renderer-type>org.pivot4j.analytics.ui.chart.ccc.CccBarChartRenderer</renderer-type>
 *       <renderer-class>org.pivot4j.analytics.ui.chart.ccc.render.CccBarChartRenderer</renderer-class>
 *       </renderer>
 *  </render-kit>
*/
@ResourceDependencies({
	@ResourceDependency(library="primefaces", name="charts/charts.css"),
	@ResourceDependency(library="primefaces", name="jquery/jquery.js"),
	@ResourceDependency(library="primefaces", name="primefaces.js"),
	@ResourceDependency(library="primefaces", name="charts/charts.js"),

	@ResourceDependency(library="stpivot4", name="js/jquery.ui.button.js"),
	@ResourceDependency(library="stpivot4", name="js/jquery.ui.dialog.js"),
	@ResourceDependency(library="stpivot4", name="ccc/css/tipsy.css"),
	@ResourceDependency(library="stpivot4", name="ccc/js/def.js"),
	@ResourceDependency(library="stpivot4", name="ccc/js/jquery.tipsy.js"),
	@ResourceDependency(library="stpivot4", name="ccc/js/protovis-d3.3.js"),
	@ResourceDependency(library="stpivot4", name="ccc/js/protovis-msie.js"),
	@ResourceDependency(library="stpivot4", name="ccc/js/pvc-r2.0-min.js"),
	@ResourceDependency(library="stpivot4", name="ccc/js/tipsy.js"),
})
public class CccNormalizedBarChart extends CccChart {
    public static final String COMPONENT_TYPE = "com.stratebi.stpivot4.analytics.ui.chart.ccc.CccNormalizedBarChart";
    private static final String DEFAULT_RENDERER = "com.stratebi.stpivot4.analytics.ui.chart.ccc.CccNormalizedBarChartRenderer";

    public CccNormalizedBarChart() {
        this.setRendererType(this.DEFAULT_RENDERER);
    }

    public String getFamily() {
        return this.COMPONENT_FAMILY;
    }

}
