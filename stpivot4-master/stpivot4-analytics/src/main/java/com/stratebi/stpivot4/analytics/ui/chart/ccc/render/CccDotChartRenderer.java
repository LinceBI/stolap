package com.stratebi.stpivot4.analytics.ui.chart.ccc.render;

import java.io.IOException;

import javax.faces.context.FacesContext;
import javax.faces.context.ResponseWriter;

import org.primefaces.component.chart.UIChart;

import com.stratebi.stpivot4.analytics.ui.chart.ccc.chart.CccChart;

public class CccDotChartRenderer extends CccChartRenderer {
    /*
     * Este el método que se encarga de crear cada una de las gráficas, es llamado para cada
     * una de las instancias que se van a crear de estas. Para evitar la colision de los nombres
     * de las variable y funciones usé un valor aleatorio como posfijo en el nombre de estos
     * evitando que estos sobrescriban los valores a los que hacen referencia
     *
    */
    public void encodeScript(FacesContext context, UIChart uichart, String randonValue) throws IOException{
        ResponseWriter writer = context.getResponseWriter();
        CccChart chart = (CccChart) uichart;
        String clientId = chart.getClientId(context);

        String cccScript =
                "function fn" + randonValue + " (owner, width, height) {\n" +
                "   owner = owner || '" + clientId + "';\n" +
                "   width = width || width" + randonValue + ";\n" +
                "   height = height || height" + randonValue + ";\n" +
                "   new pvc.DotChart({\n" +
                
                encodeOptions(chart) + "," +
                
                "       extensionPoints: {\n" +
				encodeExtensionPoints(chart) + 
                "       }\n" +
                
                "   })\n" +
                "   .setData(data" + randonValue + ", {crosstabMode: false, seriesInRows: false })\n" +
                "   .render();\n" +
                "}\n" +
                "setTimeout(function() {\n" +
                "   fn" + randonValue + "();\n" +
                "}, 500)\n";

        writer.write(cccScript);

    }
}