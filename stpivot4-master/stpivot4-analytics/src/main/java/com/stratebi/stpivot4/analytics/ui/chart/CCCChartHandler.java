package com.stratebi.stpivot4.analytics.ui.chart;

import java.io.Serializable;
import java.util.LinkedList;
import java.util.List;
import java.util.ResourceBundle;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.faces.application.FacesMessage;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.ViewScoped;
import javax.faces.component.html.HtmlPanelGroup;
import javax.faces.context.FacesContext;
import javax.faces.event.ActionEvent;
import javax.faces.model.SelectItem;

import org.apache.commons.lang3.StringUtils;
import org.olap4j.Axis;
import org.olap4j.CellSet;
import org.olap4j.CellSetAxis;
import org.pivot4j.ModelChangeEvent;
import org.pivot4j.ModelChangeListener;
import org.pivot4j.PivotModel;
import org.pivot4j.analytics.ui.PivotStateManager;
import org.pivot4j.analytics.ui.chart.ChartBuilder;
import org.pivot4j.analytics.ui.chart.DefaultChartRenderer.Position;
import org.pivot4j.ui.chart.ChartRenderer;
import org.pivot4j.util.OlapUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@ManagedBean(name = "cccChartHandler")
@ViewScoped
public class CCCChartHandler implements ModelChangeListener, Serializable {

	private static final long serialVersionUID = 8929886836467291035L;
	
	private final static Logger logger = LoggerFactory.getLogger(CCCChartHandler.class);
	

	@ManagedProperty(value = "#{pivotStateManager}")
	private PivotStateManager stateManager;

	@ManagedProperty(value = "#{chartBuilderFactory}")
	private ChartBuilderFactory chartBuilderFactory;

	private PivotModel model;

	private CCCDefaultChartRenderer renderer;

	private HtmlPanelGroup component;

	private List<SelectItem> charts;
	

	private String title;
	

	private Axis pageAxis;

	private Axis chartAxis;

	private Axis seriesAxis;

	private Axis plotAxis;

	private int width;

	private int height;

	private Position legendPosition;

	private int xAxisAngle;

	private int yAxisAngle;

	
	private Position titlePosition = Position.w;
	private int titleFontSize;
	private String titleColor;
	
	private String orientation;

	private String axisXTitle;
	private String axisYTitle;
	private boolean axisXGrid;
	private boolean axisYGrid;
	private int axisXMargins;
	private int axisYMargins;
	
	private boolean showValues;
	private int valuesFontSize;
	private int axisLabelFontSize;

	private boolean stacked;
	
	private boolean dotsVisible;
	private int dotShapeSize;
	private String dotShape;

	private Position oldLegendPosition;
	
	@PostConstruct
	protected void initialize() {
		this.model = stateManager.getModel();

		if (model != null) {
			model.addModelChangeListener(this);
		}

		this.renderer = new CCCDefaultChartRenderer();

		Serializable state = stateManager.getChartState();

		if (state != null) {
			renderer.restoreState(state);
		}

		this.charts = new LinkedList<SelectItem>();

		reset();

		FacesContext context = FacesContext.getCurrentInstance();

		ResourceBundle resources = context.getApplication().getResourceBundle(
				context, "msg");

		String prefix = "label.chart.items.";

		for (String builder : chartBuilderFactory.getBuilderNames()) {
			charts.add(new SelectItem(builder, resources.getString(prefix
					+ builder)));
		}
	}

	@PreDestroy
	protected void destroy() {
		if (model != null) {
			model.removeModelChangeListener(this);
		}
	}

	/**
	 * @return the renderer
	 */
	public ChartRenderer getRenderer() {
		return renderer;
	}

	/**
	 * @return the component
	 */
	public HtmlPanelGroup getComponent() {
		return component;
	}

	/**
	 * @param component
	 *            the component to set
	 */
	public void setComponent(HtmlPanelGroup component) {
		this.component = component;
	}

	/**
	 * @return the stateManager
	 */
	public PivotStateManager getStateManager() {
		return stateManager;
	}

	/**
	 * @param stateManager
	 *            the stateManager to set
	 */
	public void setStateManager(PivotStateManager stateManager) {
		this.stateManager = stateManager;
	}

	/**
	 * @return the chartBuilderFactory
	 */
	public ChartBuilderFactory getChartBuilderFactory() {
		return chartBuilderFactory;
	}

	/**
	 * @param chartBuilderFactory
	 *            the chartBuilderFactory to set
	 */
	public void setChartBuilderFactory(ChartBuilderFactory chartBuilderFactory) {
		this.chartBuilderFactory = chartBuilderFactory;
	}

	/**
	 * @return the charts
	 */
	public List<SelectItem> getCharts() {
		return charts;
	}

	/**
	 * @return the chartName
	 */
	public String getChartName() {
		return renderer.getChartName();
	}

	/**
	 * @param chartName
	 *            the chartName to set
	 */
	public void setChartName(String chartName) {
		renderer.setChartName(chartName);
	}

	/**
	 * @return the pageAxis
	 */
	public Axis getPageAxis() {
		return pageAxis;
	}

	/**
	 * @param pageAxis
	 *            the pageAxis to set
	 */
	public void setPageAxis(Axis pageAxis) {
		this.pageAxis = pageAxis;
	}

	/**
	 * @return the chartAxis
	 */
	public Axis getChartAxis() {
		return chartAxis;
	}

	/**
	 * @param chartAxis
	 *            the chartAxis to set
	 */
	public void setChartAxis(Axis chartAxis) {
		this.chartAxis = chartAxis;
	}

	/**
	 * @return the seriesAxis
	 */
	public Axis getSeriesAxis() {
		return seriesAxis;
	}

	/**
	 * @param seriesAxis
	 *            the seriesAxis to set
	 */
	public void setSeriesAxis(Axis seriesAxis) {
		this.seriesAxis = seriesAxis;
	}

	/**
	 * @return the plotAxis
	 */
	public Axis getPlotAxis() {
		return plotAxis;
	}

	/**
	 * @param plotAxis
	 *            the plotAxis to set
	 */
	public void setPlotAxis(Axis plotAxis) {
		this.plotAxis = plotAxis;
	}

	/**
	 * @return the width
	 */
	public int getWidth() {
		return width;
	}

	/**
	 * @param width
	 *            the width to set
	 */
	public void setWidth(int width) {
		this.width = width;
	}

	/**
	 * @return the height
	 */
	public int getHeight() {
		return height;
	}

	/**
	 * @param height
	 *            the height to set
	 */
	public void setHeight(int height) {
		this.height = height;
	}

	/**
	 * @return the legendPosition
	 */
	public Position getLegendPosition() {
		return legendPosition;
	}

	/**
	 * @param legendPosition
	 *            the legendPosition to set
	 */
	public void setLegendPosition(Position legendPosition) {
		this.legendPosition = legendPosition;
	}

	/**
	 * @return the xAxisAngle
	 */
	public int getxAxisAngle() {
		return xAxisAngle;
	}

	/**
	 * @param xAxisAngle
	 *            the xAxisAngle to set
	 */
	public void setxAxisAngle(int xAxisAngle) {
		this.xAxisAngle = xAxisAngle;
	}

	/**
	 * @return the yAxisAngle
	 */
	public int getyAxisAngle() {
		return yAxisAngle;
	}

	/**
	 * @param yAxisAngle
	 *            the yAxisAngle to set
	 */
	public void setyAxisAngle(int yAxisAngle) {
		this.yAxisAngle = yAxisAngle;
	}

	public boolean isValid() {
		if (model == null || !model.isInitialized()) {
			return false;
		}

		CellSet cellSet = model.getCellSet();

		if (cellSet == null) {
			return false;
		}

		List<CellSetAxis> axes = model.getCellSet().getAxes();
		if (axes.size() < 2) {
			return false;
		}

		return axes.get(0).getPositionCount() > 0
				&& axes.get(1).getPositionCount() > 0;
	}

	public void onPreRenderView() {
		FacesContext context = FacesContext.getCurrentInstance();

		if (!context.isPostback()) {
			render();
		}
	}

	public void reset() {
		this.pageAxis = renderer.getPageAxis();
		this.chartAxis = renderer.getChartAxis();
		this.seriesAxis = renderer.getSeriesAxis();
		this.plotAxis = renderer.getPlotAxis();

		this.width = renderer.getWidth();
		this.height = renderer.getHeight();
		this.xAxisAngle = renderer.getXAxisAngle();
		this.yAxisAngle = renderer.getYAxisAngle();
		this.legendPosition = renderer.getLegendPosition();
		this.oldLegendPosition = renderer.getLegendPosition();
		
		this.title = renderer.getTitle();
		
		this.titlePosition = renderer.getTitlePosition();
		this.titleFontSize = renderer.getTitleFontSize();
		this.titleColor = renderer.getTitleColor();

		this.orientation = renderer.getOrientation();
		
		this.axisXTitle = renderer.getAxisXTitle();
		this.axisYTitle = renderer.getAxisYTitle();
		this.axisXGrid = renderer.isAxisXGrid();
		this.axisYGrid = renderer.isAxisYGrid();
		this.axisXMargins = renderer.getAxisXMargins();
		this.axisYMargins = renderer.getAxisYMargins();
		
		this.showValues = renderer.isShowValues();
		this.valuesFontSize = renderer.getValuesFontSize();
		this.axisLabelFontSize = renderer.getAxisLabelFontSize();
		this.stacked = renderer.isStacked();
		
		this.dotsVisible = renderer.isDotsVisible();
		this.dotShape = renderer.getDotShape();
		this.dotShapeSize = renderer.getDotShapeSize();
	}

	public void apply() {
		boolean valid = false;

		valid |= pageAxis != null && !OlapUtils.equals(plotAxis, pageAxis);
		valid |= chartAxis != null && !OlapUtils.equals(plotAxis, chartAxis);
		valid |= seriesAxis != null && !OlapUtils.equals(plotAxis, seriesAxis);

		if (valid) {
			renderer.setPageAxis(pageAxis);
			renderer.setChartAxis(chartAxis);
			renderer.setSeriesAxis(seriesAxis);
			renderer.setPlotAxis(plotAxis);

			renderer.setWidth(width);
			renderer.setHeight(height);

			renderer.setXAxisAngle(xAxisAngle);
			renderer.setYAxisAngle(yAxisAngle);

			renderer.setLegendPosition(legendPosition);
			
			renderer.setTitle(title);

			renderer.setTitlePosition(titlePosition);
			renderer.setTitleFontSize(titleFontSize);
			renderer.setTitleColor(titleColor);

			renderer.setOrientation(orientation);
			
			renderer.setAxisXTitle(axisXTitle);
			renderer.setAxisYTitle(axisYTitle);
			renderer.setAxisXGrid(axisXGrid);
			renderer.setAxisYGrid(axisYGrid);
			renderer.setAxisXMargins(axisXMargins);
			renderer.setAxisYMargins(axisYMargins);
			
			renderer.setShowValues(showValues);
			renderer.setValuesFontSize(valuesFontSize);
			renderer.setAxisLabelFontSize(axisLabelFontSize);
			renderer.setStacked(isStacked());
			
			renderer.setDotsVisible(dotsVisible);
			renderer.setDotShape(dotShape);
			renderer.setDotShapeSize(dotShapeSize);
			
			render();
		} else {
			FacesContext context = FacesContext.getCurrentInstance();

			ResourceBundle messages = context.getApplication()
					.getResourceBundle(context, "msg");

			String title = messages.getString("warn.chart.axis.unused.title");
			String msg = messages.getString("warn.chart.axis.unused.message");

			context.addMessage("axis-plot", new FacesMessage(
					FacesMessage.SEVERITY_WARN, title, msg));

		}
	}
	
	public void toggleLegend(ActionEvent event) {
		if (this.legendPosition==null) {
			this.legendPosition = this.oldLegendPosition==null ? Position.e : this.oldLegendPosition;
		}
		else {
			this.oldLegendPosition = this.legendPosition;
			this.legendPosition = null;
		}
		apply();
	}

	public void toggleOrientation(ActionEvent event) {
		if ("vertical".equals(orientation)) {
			this.orientation = "horizontal";
		}
		else {
			this.orientation = "vertical";
		}
		apply();
	}

	public void toggleShowValues(ActionEvent event) {
		this.showValues = !this.showValues;
		
		apply();
	}

	public void toggleStacked(ActionEvent event) {
		this.stacked = !this.stacked;
		
		apply();
	}
	
	public void render() {
		String chartName = getChartName();

		if (model != null && model.isInitialized()
				&& StringUtils.isNotBlank(chartName)) {
			FacesContext context = FacesContext.getCurrentInstance();

			try {
				ChartBuilder builder = chartBuilderFactory.createChartBuilder(
						chartName, context);
				builder.setComponent(component);

				renderer.render(model, builder);
			}
			catch(Throwable th) {
				logger.warn(th.getMessage(), th);
			}
		}

		if (renderer != null) {
			stateManager.setChartState(renderer.saveState());
		}
	}

	/**
	 * @see org.pivot4j.ModelChangeListener#modelInitialized(org.pivot4j.ModelChangeEvent)
	 */
	@Override
	public void modelInitialized(ModelChangeEvent e) {
	}

	/**
	 * @see org.pivot4j.ModelChangeListener#modelDestroyed(org.pivot4j.ModelChangeEvent)
	 */
	@Override
	public void modelDestroyed(ModelChangeEvent e) {
		setChartName("");
	}

	/**
	 * @see org.pivot4j.ModelChangeListener#modelChanged(org.pivot4j.ModelChangeEvent)
	 */
	@Override
	public void modelChanged(ModelChangeEvent e) {
	}

	/**
	 * @see org.pivot4j.ModelChangeListener#structureChanged(org.pivot4j.ModelChangeEvent)
	 */
	@Override
	public void structureChanged(ModelChangeEvent e) {
		render();
	}

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
