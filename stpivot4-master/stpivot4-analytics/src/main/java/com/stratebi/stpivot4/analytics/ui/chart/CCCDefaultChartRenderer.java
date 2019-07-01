/*
 * ====================================================================
 * This software is subject to the terms of the Common Public License
 * Agreement, available at the following URL:
 *   http://www.opensource.org/licenses/cpl.html .
 * You must accept the terms of that agreement to use this software.
 * ====================================================================
 */
package com.stratebi.stpivot4.analytics.ui.chart;

import org.pivot4j.analytics.ui.chart.DefaultChartRenderer;

public class CCCDefaultChartRenderer extends DefaultChartRenderer {
	
	private String title;
	
	private Position titlePosition = Position.w;
	private int titleFontSize = 16;
	private String titleColor = "ADD8E6";
	private String orientation = "vertical";

	
	private String axisXTitle = "";
	private String axisYTitle = "";
	private boolean axisXGrid = true;
	private boolean axisYGrid = true;
	private int axisXMargins = 0;
	private int axisYMargins = 0;

	private boolean showValues = true;

	private boolean stacked = false;
	private int valuesFontSize = 10;
	private int axisLabelFontSize = 9;
	
	private boolean dotsVisible = false;
	private int dotShapeSize = 3;
	private String dotShape = "circle";

	
	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Position getTitlePosition() {
		return titlePosition;
	}

	public void setTitlePosition(Position titlePosition) {
		this.titlePosition = titlePosition;
	}

	public int getTitleFontSize() {
		return titleFontSize;
	}

	public void setTitleFontSize(int titleFontSize) {
		this.titleFontSize = titleFontSize;
	}

	public String getTitleColor() {
		return titleColor;
	}

	public void setTitleColor(String titleColor) {
		this.titleColor = titleColor;
	}

	public String getOrientation() {
		return orientation;
	}

	public void setOrientation(String orientation) {
		this.orientation = orientation;
	}

	public String getAxisXTitle() {
		return axisXTitle;
	}

	public void setAxisXTitle(String axisXTitle) {
		this.axisXTitle = axisXTitle;
	}

	public String getAxisYTitle() {
		return axisYTitle;
	}

	public void setAxisYTitle(String axisYTitle) {
		this.axisYTitle = axisYTitle;
	}

	public boolean isAxisXGrid() {
		return axisXGrid;
	}

	public void setAxisXGrid(boolean axisXGrid) {
		this.axisXGrid = axisXGrid;
	}

	public boolean isAxisYGrid() {
		return axisYGrid;
	}

	public void setAxisYGrid(boolean axisYGrid) {
		this.axisYGrid = axisYGrid;
	}

	public boolean isShowValues() {
		return showValues;
	}

	public void setShowValues(boolean showValues) {
		this.showValues = showValues;
	}

	public boolean isStacked() {
		return stacked;
	}

	public void setStacked(boolean stacked) {
		this.stacked = stacked;
	}

	public int getValuesFontSize() {
		return valuesFontSize;
	}

	public void setValuesFontSize(int valuesFontSize) {
		this.valuesFontSize = valuesFontSize;
	}

	public int getAxisLabelFontSize() {
		return axisLabelFontSize;
	}

	public void setAxisLabelFontSize(int axisLabelFontSize) {
		this.axisLabelFontSize = axisLabelFontSize;
	}

	public int getAxisXMargins() {
		return axisXMargins;
	}

	public void setAxisXMargins(int axisXMargins) {
		this.axisXMargins = axisXMargins;
	}

	public int getAxisYMargins() {
		return axisYMargins;
	}

	public void setAxisYMargins(int axisYMargins) {
		this.axisYMargins = axisYMargins;
	}

	public boolean isDotsVisible() {
		return dotsVisible;
	}

	public void setDotsVisible(boolean dotsVisible) {
		this.dotsVisible = dotsVisible;
	}

	public int getDotShapeSize() {
		return dotShapeSize;
	}

	public void setDotShapeSize(int dotShapeSize) {
		this.dotShapeSize = dotShapeSize;
	}

	public String getDotShape() {
		return dotShape;
	}

	public void setDotShape(String dotShape) {
		this.dotShape = dotShape;
	}


}
