package com.stratebi.stpivot4.analytics.ui.chart.ccc.render;

import java.io.IOException;
import java.util.Iterator;

import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.context.ResponseWriter;

import org.apache.commons.lang.StringUtils;
import org.primefaces.component.chart.BaseChartRenderer;
import org.primefaces.component.chart.UIChart;
import org.primefaces.model.chart.CartesianChartModel;
import org.primefaces.model.chart.ChartSeries;

import com.stratebi.stpivot4.analytics.ui.chart.ccc.chart.CccChart;

/**
 * Created by manuel on 6/02/16.
 */
public abstract class CccChartRenderer extends BaseChartRenderer {
    /*
         * Cuando el gráfico es creado Primefaces le asigna un id a este, pero dado
         * que Jquery interpreta ":" como una pseudoclase cuando se busca un elemento
         * falla y genera un error para evitar esto se sobreescribe esta función
         * y se elimina este carácter
        */
    @Override
    public String convertClientId(FacesContext context, String clientId) {
        clientId = super.convertClientId(context, clientId);

        clientId = clientId.replaceAll(":", "-");
        return clientId;
    }
    
    public static String escapeJS(String cadena) {
    	if (cadena!=null) {
        	return cadena.replaceAll("'", "&apos;");
    	}
    	else {
    		return null;
    	}
    }

    /*
     * Este método es el punto de entrada para generar cada gráfico y genera un div
     * que tiene como id el devuelto por chart.getClientId(context)
     * y como estilo el width y el height definido para los gráficos
    */
    @Override
    public void encodeEnd(FacesContext context, UIComponent component) throws IOException {
        CccChart chart = (CccChart) component;
        // Creamos el panel con los botones para levantar el diálogo
        ResponseWriter writer = context.getResponseWriter();
        String clientId = chart.getClientId(context);
        String randonValue = String.valueOf(Math.random()).substring(2);
        
        
        
        String panel =
            "<div class='ui-corner-all' style='border: 1px solid #5c9ccc; margin: 5px'>\n" +
            "   <div class='ui-dlg-bar ui-widget-header'>\n" +
            "       <label><input name='chart" + randonValue + "Stacked' onclick='cccChartToggleStacked()' type='checkbox'" + (chart.isStacked() ? "checked" : "") + ">Stacked</label>\n" +
            "       <label><input name='chart" + randonValue + "Horizontal' onclick='cccChartToggleOrientation()' type='checkbox' " + (chart.getOrientation().equals("horizontal") ? "checked" : "") + ">horizontal</label>\n" +
            "       <label><input name='chart" + randonValue + "ShowLegend' onclick='cccChartToggleLegend()' type='checkbox' " + (StringUtils.isNotBlank(chart.getLegendPosition()) && !"none".equals(chart.getLegendPosition()) ? "checked" : "") + ">legend</label>\n" +
            "       <label><input name='chart" + randonValue + "ValuesVisible' onclick='cccChartToggleShowValues()' type='checkbox' " + (chart.isShowDatatip() ? "checked" : "") + ">values</label>&nbsp;&nbsp;\n" +
            "       <button id='btn" + clientId + "' class='ui-icon-newwin' role='button' aria-disabled='false'></button>\n" +
            "   </div>\n";
        writer.write(
            "   <div id='dlg" + clientId + "' title='Chart' class='dlgChartCanvas'>\n" +
            "      <div id='dlg-canvas" + clientId + "'></div>\n" +
            "   </div>\n");

        /*
         * <button id="j_idt91" name="j_idt91" type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only" style="margin-right:20px;" title="Icon Only" onclick="window.open('/showcase/ui/button/productDetail.xhtml?productId=30','_self')" role="button" aria-disabled="false"><span class="ui-button-icon-left ui-icon ui-c ui-icon-star"></span><span class="ui-button-text ui-c">ui-button</span></button>
         */
        writer.write(panel);

        // Creamos el div para el gráfico
        encodeMarkup(context, chart);

        /*
         * Aqui comenzammos el tag <script> que va a generar el gráfico que necesitamos
         * al final hacemos un timeout para esperar a que primefaces termine de generar
         * todos los sectores dado que ccc necesita saber tanto el width como el height
         * para Pivot4j, el valor '0' determina que sector tendra el 100% del tamaño
         * que le corresponda, lo cual en CCC es un problema pues cada gráfica debe saber
         * las dimensiones antes de crearse, por lo cual se hace el timout al final que
         * es el encargado de esperar el tiempo xxx para llamar a la función y crear
         * las gráficas
         */

        startScript(writer, clientId);

        
		writer.write("$(function(){");

        writer.write(
            "var width" + randonValue + " = $('#" + clientId + "').width();\n" +
            "var height" + randonValue + " = $('#" + clientId + "').height();\n" +

            


			"window.stpivot_pivotChartToCanvas = ( typeof window.stpivot_pivotChartToCanvas != 'undefined' && window.stpivot_pivotChartToCanvas instanceof Array ) ? window.stpivot_pivotChartToCanvas : [];\n" +
            "window.stpivot_pivotChartToCanvas.push ( function (canvas, cwidth, cheight) {" +
            "   fn" + randonValue + "(canvas, cwidth, cheight);\n" +
            "} ); \n" +
            
            "function changeChart" + randonValue + "() {" +
            "   stacked" + randonValue + "       = $('input[name=chart" + randonValue + "Stacked]').get(0).checked;\n" +
            "   orientation" + randonValue + "   = $('input[name=chart" + randonValue + "Horizontal]').get(0).checked?'horizontal':'vertical';\n" +
            "   legend" + randonValue + "        = $('input[name=chart" + randonValue + "ShowLegend]').get(0).checked;\n" +
            "   valuesVisible" + randonValue + " = $('input[name=chart" + randonValue + "ValuesVisible]').get(0).checked;\n" +
            "   var el = $('#" + clientId + "');\n" +
            "   if (el && el[0]) {\n" +
            "      el[0].style.width = \"\";\n" +
            "      el[0].style.height = \"\";\n" +
            "      el.empty();\n" +
            "   }\n" +
            "   fn" + randonValue + "('" + clientId + "', width" + randonValue + ", height" + randonValue + ");\n" +
            "}\n" +

            "$('#dlg" + clientId + "').dialog({\n" +
            "   autoOpen: false,\n" +
            "   resizable: false,\n" +
            "	dialogClass: 'dlgChartCanvas',\n" +
            "   modal: true,\n" +
            "   minHeight: $('body').height() - 50,\n" +
            "   maxHeight: $('body').height() - 50,\n" +
            "   minWidth: $('body').width() - 50,\n" +
            "   maxWidth: $('body').width() - 50,\n" +
            "   width: $('body').width() - 50,\n" +
            "   show: {\n" +
            "      effect: 'fade',\n" +
            "      duration: 1000\n" +
            "   },\n" +
            "   hide: {\n" +
            "       effect: 'fade',\n" +
            "       duration: 1000\n" +
            "   }\n" +
            "});\n" +
            "$('#btn" + clientId + "').button({" +
            "	icons: { primary: 'ui-icon-newwin', secondary: null }, \n" +
            "})\n" +
            "   .click(function( event ) {\n" +
            "       event.preventDefault();\n" +
            "       $('#dlg" + clientId + "').dialog(\"open\" );\n" +
            "       var width = $('#dlg" + clientId + "').width();\n" +
            "       var height = $('#dlg" + clientId + "').height();\n" +
            "       var el = $('#dlg-canvas" + clientId + "');\n" +
            "       if (el && el[0]) {\n" +
            "          el[0].style.width = \"\";\n" +
            "          el[0].style.height = \"\";\n" +
            "          el.empty();\n" +
            "       }\n" +
            "       fn" + randonValue + "('dlg-canvas" + clientId + "', width, height);\n" +
            "   });\n");

        encodeData(context, chart, randonValue);
        encodeScript(context, chart, randonValue);
        
		writer.write("});");
        
        endScript(writer);
        writer.write("</div>");

        // Aqui finalizammos el tag <script> que va a generar el gráfico que necesitamos
    }

    public boolean getLegendVisible(CccChart chart) {
        return StringUtils.isNotBlank(chart.getLegendPosition());
    }
    
    public abstract void encodeScript(FacesContext context, UIChart uichart, String randonValue) throws IOException;

    /*
     * Aquí creamos los datos a ver en cada gráfica. Note que metadata es un valor fijo
     * categories indica el valor de las columnas
     * series indica los valores de las filas
     * resulset establece los valores a mostrar
     *
     * var data = {
     *     "metadata":[
     *         {"colIndex":0,"colType":"String","colName":"Series"},
     *         {"colIndex":1,"colType":"String","colName":"Categories"},
     *         {"colIndex":2,"colType":"Numeric","colName":"Value"}],
     *     "categories":["Actual","Budget","Variance"],
     *     "series":["All Regions","Central","Eastern","Southern","Western"],
     *     "resultset":[
     *         ["Actual","All Regions",143639982],
     *         ["Budget","All Regions",143199389],
     *         ["Variance","All Regions",-440593],
     *         ["Actual","Central",37893162],
     *         ["Budget","Central",38397600],
     *         ["Variance","Central",504438],
     *         ["Actual","Eastern",35248940],
     *         ["Budget","Eastern",35487861],
     *         ["Variance","Eastern",238921],
     *         ["Actual","Southern",35248940],
     *         ["Budget","Southern",34803861],
     *         ["Variance","Southern",-445079],
     *         ["Actual","Western",35248940],
     *         ["Budget","Western",34510067],
     *         ["Variance","Western",-738873]
     *     ]
     * }
     *
     * Pivot4J en dependencia de la forma en que se defina el gráfico crea uno o varios,
     * establece el valor de las categorias a mostrar, para detectar que valor es el que
     * necesitamos mostrar la variante que use es preguntar por el valor del campo title
     * el cual viene con un valor en caso de que se muestren varias gráficas, cuando es
     * una sola entonces se toma el valor del label de la serie
     */
    protected void encodeData(FacesContext context, CccChart chart, String randonValue) throws IOException {
        ResponseWriter writer = context.getResponseWriter();
        CartesianChartModel model = (CartesianChartModel) chart.getValue();

        String categories = "";
        String series = "";
        boolean isSeriesInitialized = false;

        //data
        String resultset = "resultset: [\n";
        for(Iterator<ChartSeries> it = model.getSeries().iterator(); it.hasNext();) {
            ChartSeries chartSeries = it.next();

            categories += "'" + CccChartRenderer.escapeJS(chartSeries.getLabel()) + "'";
            if (it.hasNext()) categories += ",";
                
            for(Iterator<Object> seriesIterator = chartSeries.getData().keySet().iterator(); seriesIterator.hasNext();) {
                Object key = seriesIterator.next();
                Number value = chartSeries.getData().get(key);

                if (!isSeriesInitialized) {
                    series += "'" + CccChartRenderer.escapeJS(key.toString()) + "'";
                    if (seriesIterator.hasNext()) series += ",";
                }
                String valueToRender = value != null ? value.toString() : "null";

                resultset += "["
                        + "'" + CccChartRenderer.escapeJS(chartSeries.getLabel()) + "' ,"
                        + "'" + CccChartRenderer.escapeJS(key.toString()) + "' ,"
                        + valueToRender
                        + "]";

                if(seriesIterator.hasNext()) {
                    resultset += ",\n";
                }
            }
            isSeriesInitialized = true;

            if(it.hasNext()) {
                resultset += ",\n";
            }
        }
        resultset += "]";
        series = "series: [" + series + "]";
        categories = "categories: [" + categories + "]";

        //metadata
        String metadata = "metadata: [\n" +
                "{ colIndex:0, colType:'String', colName:'Series' },\n" +
                "{ colIndex:1, colType:'String', colName:'Categories' },\n" +
                "{ colIndex:2, colType:'Numeric', colName:'Value' }";
        metadata += "]";

        String data = "var data" + randonValue + " = {\n" +
                categories + ",\n" +
                series + ",\n" +
                resultset + ",\n" +
                metadata + "\n" +
                "};\n";

        writer.write(data);
    }
    
    public String encodeOptions(CccChart chart) {
    	
    	String options = 
                "       canvas: owner,\n" +
                "       width:  width,\n" +
                "       height:  height,\n" +
                "       title: '" + CccChartRenderer.escapeJS(chart.getTitle()) + "',\n" +
                "       titlePosition: '" + CccChartRenderer.escapeJS(chart.getTitlePosition()) + "',\n" +
                (("left".equals(chart.getTitlePosition()) || "right".equals(chart.getTitlePosition())) ? "titleSize: {height: '100%'},\n" : "") +
                "       titleMargins: 10,\n" +
                "       animate:    " + chart.isAnimate() + ",\n" +
                "       clickable:  true,\n" +
                "       selectable: true,\n" +
                "       hoverable:  true,\n" +
                "       axisGrid: true,\n" +

                "       xAxisTitle: '" + CccChartRenderer.escapeJS(chart.getAxisXTitle()) + "',\n" +
                "       yAxisTitle: '" + CccChartRenderer.escapeJS(chart.getAxisYTitle()) + "',\n" +
                "       xAxisGrid: " + chart.isAxisXGrid() + ",\n" +
                "       yAxisGrid: " + chart.isAxisYGrid() + ",\n" +

                "       xAxisTitleMargins: " + chart.getAxisXMargins() +",\n" +
                "       yAxisTitleMargins: " + chart.getAxisYMargins() +",\n" +
                
                "		axisLabel_font: 'normal " + chart.getAxisLabelFontSize() + "px sans-serif',\n" +

                "       dotsVisible:   " + chart.isDotsVisible() + ",\n" +
                
                "       orientation: '" + CccChartRenderer.escapeJS(chart.getOrientation()) + "' ,\n" +
                "       valuesVisible:   " + chart.isShowDatatip() + ",\n" +
                "       valuesOverflow:   'trim',\n" +
                "       valuesOptimizeLegibility:   true,\n" +               
                "		valuesFont: 'normal " + chart.getValuesFontSize() + "px sans-serif'," +
                "       stacked:  " + chart.isStacked() + ",\n" +
                "       legend:     " + getLegendVisible(chart) + " ,\n" +
                "       legendPosition: '" + chart.getLegendPosition() + "'\n";
    	return options;
    }
    
    public String encodeExtensionPoints(CccChart chart) {
    	
    	String options = 
    		    "       	xAxisLabel_textAngle: -Math.PI*" + chart.getXaxisAngle() + "/180,\n" +
    		    "       	yAxisLabel_textAngle: -Math.PI*" + chart.getYaxisAngle() + "/180,\n" +
                "           bar_lineWidth:     1,\n" +
                "           title_fillStyle:   '#" + chart.getTitleColor() + "',\n" +
                "           titleLabel_font:   '" + chart.getTitleFontSize() + "px sans-serif',\n" +

                "           xAxisLabel_font:   'normal " + chart.getAxisLabelFontSize() + "px sans-serif',\n" +
                "           yAxisLabel_font:   'normal " + chart.getAxisLabelFontSize() + "px sans-serif',\n" +
                
                "       dot_shapeRadius: " + chart.getDotShapeSize() + ",\n" +
                "       dot_shape: '" + chart.getDotShape() + "',\n" +
                
                "           title_strokeStyle: 'black',\n" +
                "           legend_fillStyle:  'green',\n" +
                "           yAxisRule_strokeStyle: 'blue'\n";
    	return options;
    }
    
    
}
