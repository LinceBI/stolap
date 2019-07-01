package com.stratebi.stpivot4.analytics.ui.chart.ccc.chart;

import javax.faces.component.UINamingContainer;
import javax.faces.context.FacesContext;

import org.primefaces.component.api.Widget;
import org.primefaces.component.chart.CartesianChart;

/**
 * Created by manuel on 6/02/16.
 */
public class CccChart extends CartesianChart implements Widget {
    public static final String COMPONENT_FAMILY = "com.stratebi.stpivot4.analytics.ui.chart.ccc";

    public String getWidgetVar() {
        return (String)this.getStateHelper().eval(PropertyKeys.widgetVar, (Object)null);
    }

    public void setWidgetVar(String _widgetVar) {
        this.getStateHelper().put(PropertyKeys.widgetVar, _widgetVar);
    }

    public boolean isDotsVisible() {
        return ((Boolean)this.getStateHelper().eval(PropertyKeys.dotsVisible, Boolean.valueOf(false))).booleanValue();
    }
    public void setDotsVisible(boolean _dotsVisible) {
        this.getStateHelper().put(PropertyKeys.dotsVisible, Boolean.valueOf(_dotsVisible));
    }
    public int getDotShapeSize() {
        return ((Integer)this.getStateHelper().eval(PropertyKeys.dotShapeSize, Integer.valueOf(0))).intValue();
    }
    public void setDotShapeSize(int _dotShapeSize) {
        this.getStateHelper().put(PropertyKeys.dotShapeSize, Integer.valueOf(_dotShapeSize));
    }
    public String getDotShape() {
        return (String)this.getStateHelper().eval(PropertyKeys.dotShape, "circle");
    }
    public void setDotShape(String _dotShape) {
        this.getStateHelper().put(PropertyKeys.dotShape, _dotShape);
    }

    
    public String getAxisXTitle() {
        return (String)this.getStateHelper().eval(PropertyKeys.axisXTitle, "");
    }
    public void setAxisXTitle(String _title) {
        this.getStateHelper().put(PropertyKeys.axisXTitle, _title);
    }
    public String getAxisYTitle() {
        return (String)this.getStateHelper().eval(PropertyKeys.axisYTitle, "");
    }
    public void setAxisYTitle(String _title) {
        this.getStateHelper().put(PropertyKeys.axisYTitle, _title);
    }
    
    public boolean isAxisXGrid() {
        return ((Boolean)this.getStateHelper().eval(PropertyKeys.axisXGrid, Boolean.valueOf(true))).booleanValue();
    }
    public void setAxisXGrid(boolean _xAxisGrid) {
        this.getStateHelper().put(PropertyKeys.axisXGrid, Boolean.valueOf(_xAxisGrid));
    }
    public boolean isAxisYGrid() {
        return ((Boolean)this.getStateHelper().eval(PropertyKeys.axisYGrid, Boolean.valueOf(true))).booleanValue();
    }
    public void setAxisYGrid(boolean _yAxisGrid) {
        this.getStateHelper().put(PropertyKeys.axisYGrid, Boolean.valueOf(_yAxisGrid));
    }

    public int getAxisXMargins() {
        return ((Integer)this.getStateHelper().eval(PropertyKeys.axisXMargins, Integer.valueOf(0))).intValue();
    }
    public void setAxisXMargins(int _margins) {
        this.getStateHelper().put(PropertyKeys.axisXMargins, Integer.valueOf(_margins));
    }
    public int getAxisYMargins() {
        return ((Integer)this.getStateHelper().eval(PropertyKeys.axisYMargins, Integer.valueOf(0))).intValue();
    }
    public void setAxisYMargins(int _margins) {
        this.getStateHelper().put(PropertyKeys.axisYMargins, Integer.valueOf(_margins));
    }
    
    
    public int getValuesFontSize() {
        return ((Integer)this.getStateHelper().eval(PropertyKeys.valuesFontSize, Integer.valueOf(10))).intValue();
    }
    public void setValuesFontSize(int _fontSize) {
        this.getStateHelper().put(PropertyKeys.valuesFontSize, Integer.valueOf(_fontSize));
    }
    public int getAxisLabelFontSize() {
        return ((Integer)this.getStateHelper().eval(PropertyKeys.axisLabelFontSize, Integer.valueOf(9))).intValue();
    }
    public void setAxisLabelFontSize(int _fontSize) {
        this.getStateHelper().put(PropertyKeys.axisLabelFontSize, Integer.valueOf(_fontSize));
    }
    
    
    public String getTitlePosition() {
        return (String)this.getStateHelper().eval(PropertyKeys.titlePosition, "left");
    }

    public void setTitlePosition(String _titlePosition) {
        this.getStateHelper().put(PropertyKeys.titlePosition, _titlePosition);
    }
	

    public int getTitleFontSize() {
        return ((Integer)this.getStateHelper().eval(PropertyKeys.titleFontSize, Integer.valueOf(16))).intValue();
    }

    public void setTitleFontSize(int _fontSize) {
        this.getStateHelper().put(PropertyKeys.titleFontSize, Integer.valueOf(_fontSize));
    }

    public String getTitleColor() {
        return (String)this.getStateHelper().eval(PropertyKeys.titleColor, "ADD8E6");
    }

    public void setTitleColor(String _titleColor) {
        this.getStateHelper().put(PropertyKeys.titleColor, _titleColor);
    }
    
    
    public int getBarPadding() {
        return ((Integer)this.getStateHelper().eval(PropertyKeys.barPadding, Integer.valueOf(8))).intValue();
    }

    public void setBarPadding(int _barPadding) {
        this.getStateHelper().put(PropertyKeys.barPadding, Integer.valueOf(_barPadding));
    }

    public int getBarMargin() {
        return ((Integer)this.getStateHelper().eval(PropertyKeys.barMargin, Integer.valueOf(10))).intValue();
    }

    public void setBarMargin(int _barMargin) {
        this.getStateHelper().put(PropertyKeys.barMargin, Integer.valueOf(_barMargin));
    }

    public String getOrientation() {
        return (String)this.getStateHelper().eval(PropertyKeys.orientation, "vertical");
    }

    public void setOrientation(String _orientation) {
        this.getStateHelper().put(PropertyKeys.orientation, _orientation);
    }

    public boolean isStacked() {
        return ((Boolean)this.getStateHelper().eval(PropertyKeys.stacked, Boolean.valueOf(false))).booleanValue();
    }

    public void setStacked(boolean _stacked) {
        this.getStateHelper().put(PropertyKeys.stacked, Boolean.valueOf(_stacked));
    }

    public double getMin() {
        return ((Double)this.getStateHelper().eval(PropertyKeys.min, Double.valueOf(4.9E-324D))).doubleValue();
    }

    public void setMin(double _min) {
        this.getStateHelper().put(PropertyKeys.min, Double.valueOf(_min));
    }

    public double getMax() {
        return ((Double)this.getStateHelper().eval(PropertyKeys.max, Double.valueOf(1.7976931348623157E308D))).doubleValue();
    }

    public void setMax(double _max) {
        this.getStateHelper().put(PropertyKeys.max, Double.valueOf(_max));
    }

    public boolean isBreakOnNull() {
        return ((Boolean)this.getStateHelper().eval(PropertyKeys.breakOnNull, Boolean.valueOf(false))).booleanValue();
    }

    public void setBreakOnNull(boolean _breakOnNull) {
        this.getStateHelper().put(PropertyKeys.breakOnNull, Boolean.valueOf(_breakOnNull));
    }

    public boolean isZoom() {
        return ((Boolean)this.getStateHelper().eval(PropertyKeys.zoom, Boolean.valueOf(false))).booleanValue();
    }

    public void setZoom(boolean _zoom) {
        this.getStateHelper().put(PropertyKeys.zoom, Boolean.valueOf(_zoom));
    }

    public boolean isAnimate() {
        return ((Boolean)this.getStateHelper().eval(PropertyKeys.animate, Boolean.valueOf(false))).booleanValue();
    }

    public void setAnimate(boolean _animate) {
        this.getStateHelper().put(PropertyKeys.animate, Boolean.valueOf(_animate));
    }

    public boolean isShowDatatip() {
        return ((Boolean)this.getStateHelper().eval(PropertyKeys.showDatatip, Boolean.valueOf(true))).booleanValue();
    }

    public void setShowDatatip(boolean _showDatatip) {
        this.getStateHelper().put(PropertyKeys.showDatatip, Boolean.valueOf(_showDatatip));
    }

    public String getDatatipFormat() {
        return (String)this.getStateHelper().eval(PropertyKeys.datatipFormat, (Object)null);
    }

    public void setDatatipFormat(String _datatipFormat) {
        this.getStateHelper().put(PropertyKeys.datatipFormat, _datatipFormat);
    }

    public String resolveWidgetVar() {
        FacesContext context = this.getFacesContext();
        String userWidgetVar = (String)this.getAttributes().get("widgetVar");
        return userWidgetVar != null?userWidgetVar:"widget_" + this.getClientId(context).replaceAll("-|" + UINamingContainer.getSeparatorChar(context), "_");
    }

    protected static enum PropertyKeys {
        widgetVar,
        barPadding,
        barMargin,
        orientation,
        stacked,
        min,
        max,
        breakOnNull,
        zoom,
        animate,
        showDatatip,
        datatipFormat,
        
    	titlePosition,
    	titleFontSize,
    	
    	axisXTitle,
    	axisYTitle,
    	axisXGrid,
    	axisYGrid,
    	axisXMargins,
    	axisYMargins,

    	valuesFontSize,
    	axisLabelFontSize,
    	
    	dotsVisible,
    	dotShapeSize,
    	dotShape,

    	titleColor;

        String toString;

        private PropertyKeys(String toString) {
            this.toString = toString;
        }

        private PropertyKeys() {
        }

        public String toString() {
            return this.toString != null?this.toString:super.toString();
        }
    }
}
