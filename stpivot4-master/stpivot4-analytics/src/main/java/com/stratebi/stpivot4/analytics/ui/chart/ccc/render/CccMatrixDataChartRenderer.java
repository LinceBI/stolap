package com.stratebi.stpivot4.analytics.ui.chart.ccc.render;

import java.io.IOException;
import java.util.Iterator;

import javax.faces.context.FacesContext;
import javax.faces.context.ResponseWriter;

import org.primefaces.model.chart.CartesianChartModel;
import org.primefaces.model.chart.ChartSeries;

import com.stratebi.stpivot4.analytics.ui.chart.ccc.chart.CccChart;

/**
 * Created by manuel on 29/02/16.
 */
public abstract class CccMatrixDataChartRenderer extends CccChartRenderer {
    protected void encodeData(FacesContext context, CccChart chart, String randonValue) throws IOException {
        ResponseWriter writer = context.getResponseWriter();
        CartesianChartModel model = (CartesianChartModel) chart.getValue();

        String categories = "";
        String series = "";
        boolean isMetadataInitialized = false;

        //data
        String resultset = "resultset: [\n";
        String metadata = "metadata: [\n";
        for (Iterator<ChartSeries> it = model.getSeries().iterator(); it.hasNext(); ) {
            ChartSeries chartSeries = it.next();
            int i = 1;

            categories = "'" + CccChartRenderer.escapeJS(chartSeries.getLabel()) + "'";

            if (!isMetadataInitialized) {
                metadata += "{\n" +
                           "   'colIndex': 0,\n" +
                           "   'colType': 'String',\n" +
                           "   'colName': '-'\n" +
                           "}";
                if (chartSeries.getData().size() > 0)
                    metadata += ",";
            }
            resultset += "["  + categories + ",";
            for (Iterator<Object> dataIterator = chartSeries.getData().keySet().iterator(); dataIterator.hasNext(); i++) {
                Object key = dataIterator.next();
                Number value = chartSeries.getData().get(key);

                if (!isMetadataInitialized) {
                    metadata += "{\n" +
                              "   'colIndex': " + i + ",\n" +
                              "   'colType': 'Numeric',\n" +
                              "   'colName': '" + CccChartRenderer.escapeJS(key.toString()) + "'\n" +
                              "}";
                    if (dataIterator.hasNext()) metadata += ",";
                }
                String valueToRender = value != null ? value.toString() : "null";

                resultset += valueToRender;

                if (dataIterator.hasNext()) {
                    resultset += ",";
                }
            }
            resultset += "]";

            isMetadataInitialized = true;

            if (it.hasNext()) {
                resultset += ",\n";
            }
        }
        resultset += "]";
        metadata += "]";

        String data = "var data" + randonValue + " = {\n" +
                resultset + ",\n" +
                metadata + "\n" +
                "};\n";

        writer.write(data);
    }
}
