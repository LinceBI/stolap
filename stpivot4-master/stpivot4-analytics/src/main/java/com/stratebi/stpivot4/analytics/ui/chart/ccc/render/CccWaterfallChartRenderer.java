package com.stratebi.stpivot4.analytics.ui.chart.ccc.render;

import java.io.IOException;
import java.util.Iterator;

import javax.faces.context.FacesContext;
import javax.faces.context.ResponseWriter;

import org.primefaces.component.chart.UIChart;
import org.primefaces.model.chart.CartesianChartModel;
import org.primefaces.model.chart.ChartSeries;

import com.stratebi.stpivot4.analytics.ui.chart.ccc.chart.CccChart;

public class CccWaterfallChartRenderer extends CccMatrixDataChartRenderer {
    /*
     * Este el método que se encarga de crear cada una de las gráficas, es llamado para cada
     * una de las instancias que se van a crear de estas. Para evitar la colision de los nombres
     * de las variable y funciones usé un valor aleatorio como posfijo en el nombre de estos
     * evitando que estos sobrescriban los valores a los que hacen referencia
     *
    */
    public void encodeScript(FacesContext context, UIChart uichart, String randonValue) throws IOException {
        ResponseWriter writer = context.getResponseWriter();
        CccChart chart = (CccChart) uichart;
        String clientId = chart.getClientId(context);

        String cccScript =
            "function fn" + randonValue + " (owner, width, height) {\n" +
            "   owner = owner || '" + clientId + "';\n" +
            "   width = width || width" + randonValue + ";\n" +
            "   height = height || height" + randonValue + ";\n" +
            "   new pvc.WaterfallChart({\n" +
            
                encodeOptions(chart) + "," +
            
            "       extensionPoints: {\n" +
            
				encodeExtensionPoints(chart) + 
            
            "       }\n" +
            "   })\n" +
            "   .setData(data" + randonValue + ", {crosstabMode: false })\n" +
            "   .render();\n" +
            "}\n" +
            "setTimeout(function() {\n" +
            "   fn" + randonValue + "();\n" +
            "}, 500)\n";
        writer.write(cccScript);

    }

    protected void encodeData(FacesContext context, CccChart chart, String randonValue) throws IOException {
        ResponseWriter writer = context.getResponseWriter();
        CartesianChartModel model = (CartesianChartModel) chart.getValue();
        boolean hasTitle = !(chart.getTitle() == null || chart.getTitle().equals(""));

        String categories = "";
        //data
        String resultset = "resultset: [\n";
        for (Iterator<ChartSeries> it = model.getSeries().iterator(); it.hasNext(); ) {
            ChartSeries chartSeries = it.next();
            int i = 1;

            categories = "'" + chartSeries.getLabel() + "'";

            for (Iterator<Object> dataIterator = chartSeries.getData().keySet().iterator(); dataIterator.hasNext(); i++) {
                Object key = dataIterator.next();
                Number value = chartSeries.getData().get(key);

                if (value != null) {
                    String valueToRender = value != null ? value.toString() : "null";
                    resultset += "['" + key.toString() + "'," + categories + ", " + valueToRender + "]";
                    if (dataIterator.hasNext()) {
                        resultset += ",";
                    }
                }
            }

            if (it.hasNext()) {
                resultset += ",\n";
            }
        }
        resultset += "]";
        String metadata = "metadata:[\n" +
                    "    {'colIndex':0,'colType':'String','colName':'Series'},\n" +
                    "    {'colIndex':1,'colType':'String','colName':'Category'},\n" +
                    "    {'colIndex':2,'colType':'Numeric','colName':'Value'}\n" +
                    "]";

        String data = "var data" + randonValue + " = {\n" +
                resultset + ",\n" +
                metadata + "\n" +
                "};\n";

        writer.write(data);
    }
}