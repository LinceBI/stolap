/*
 * ====================================================================
 * This software is subject to the terms of the Common Public License
 * Agreement, available at the following URL:
 *   http://www.opensource.org/licenses/cpl.html .
 * You must accept the terms of that agreement to use this software.
 * ====================================================================
 */
package com.stratebi.stpivot4.analytics.ui;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.lang.reflect.Field;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.RequestScoped;
import javax.faces.context.ExternalContext;
import javax.faces.context.FacesContext;
import javax.print.attribute.standard.MediaSize;
import javax.print.attribute.standard.MediaSizeName;
import javax.print.attribute.standard.OrientationRequested;

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.pivot4j.PivotModel;
import org.pivot4j.analytics.ui.ViewHandlerPivot4j;
import org.pivot4j.ui.poi.Format;
import org.pivot4j.ui.table.TableRenderer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.stratebi.stpivot4.analytics.exporter.ExcelExporter;
import com.stratebi.stpivot4.analytics.exporter.FopExporter;

@ManagedBean(name = "pivotExportHandler")
@RequestScoped
public class PivotExportHandler extends org.pivot4j.analytics.ui.PivotExportHandler {
	

	private final static Logger logger = LoggerFactory.getLogger(PivotExportHandler.class);
	
	/**
	 * Para el envio por mail como fichero adjunto
	 * 
	 * @param format
	 * @return
	 */
	public byte[] exportExcelToByteArray(Format format) {
		TableRenderer renderer = getViewHandler().getRenderer();

		boolean renderSlicer = renderer.getRenderSlicer();
		boolean inline = renderer.getShowSlicerMembersInline();

		ByteArrayOutputStream out = new ByteArrayOutputStream();

		ExcelExporter exporter = new ExcelExporter(out, readChartHtml());
		exporter.setFormat(format);


		try {
			renderer.setRenderSlicer(getViewHandler().getRenderSlicer());
			renderer.setShowSlicerMembersInline(false);

			renderer.render(getModel(), exporter);
		} finally {
			renderer.setRenderSlicer(renderSlicer);
			renderer.setShowSlicerMembersInline(inline);
			IOUtils.closeQuietly(out);
		}
		
		return out.toByteArray();
	}
	
	/**
	 * Para el envio por mail como fichero adjunto
	 * 
	 * @return
	 * @throws IllegalArgumentException
	 * @throws IllegalAccessException
	 */
	public byte[] exportPdfToByteArray() throws IllegalArgumentException, IllegalAccessException {
		TableRenderer renderer = getViewHandler().getRenderer();

		ByteArrayOutputStream out = new ByteArrayOutputStream();

		FopExporter exporter = new FopExporter(out, readChartHtml());
		
		exporter.setShowHeader(getShowHeader());

		if (StringUtils.isNotBlank(getHeaderText())) {
			exporter.setTitleText(getHeaderText());
		}

		exporter.setShowFooter(getShowFooter());

		if (StringUtils.isNotBlank(getFooterText())) {
			exporter.setFooterText(getFooterText());
		}

		exporter.setFontSize(getFontSize() + "pt");
		exporter.setTitleFontSize(getHeaderFontSize() + "pt");
		exporter.setFooterFontSize(getFooterFontSize() + "pt");
		
		if (getOrientation()!=null || getOrientation()==Orientation.Landscape) {
			exporter.setOrientation(OrientationRequested.LANDSCAPE);
		}
		else {
			exporter.setOrientation(OrientationRequested.PORTRAIT);
		}

		MediaSize mediaSize = null;

		Field[] fields = MediaSizeName.class.getFields();
		for (Field field : fields) {
			MediaSizeName name = (MediaSizeName) field.get(null);
			if (name.getValue() == getPaperSize()) {
				mediaSize = MediaSize.getMediaSizeForName(name);
				break;
			}
		}

		exporter.setMediaSize(mediaSize);


		boolean renderSlicer = renderer.getRenderSlicer();

		try {
			renderer.setRenderSlicer(getViewHandler().getRenderSlicer());

			renderer.render(getModel(), exporter);
		} finally {
			renderer.setRenderSlicer(renderSlicer);
			IOUtils.closeQuietly(out);
		}
		
		return out.toByteArray();

	}

	
	
	
	@Override
	public void exportPdf() throws IOException, IllegalAccessException {
		ViewHandlerPivot4j viewHandler = getViewHandler();
		PivotModel model = getModel();
		
		
		TableRenderer renderer = viewHandler .getRenderer();

		FacesContext context = FacesContext.getCurrentInstance();

		String disposition = String.format("attachment; filename=\"%s.%s\"",
				model .getCube().getName(), "pdf");

		ExternalContext externalContext = context.getExternalContext();

		OutputStream out = externalContext.getResponseOutputStream();

		FopExporter exporter = new FopExporter(out, readChartHtml());
		exporter.setShowHeader(getShowHeader());

		if (StringUtils.isNotBlank(getHeaderText())) {
			exporter.setTitleText(getHeaderText());
		}

		exporter.setShowFooter(getShowFooter());

		if (StringUtils.isNotBlank(getFooterText())) {
			exporter.setFooterText(getFooterText());
		}

		exporter.setFontSize(getFontSize() + "pt");
		exporter.setTitleFontSize(getHeaderFontSize() + "pt");
		exporter.setFooterFontSize(getFooterFontSize() + "pt");
		exporter.setOrientation(getOrientation().getValue());

		MediaSize mediaSize = null;

		Field[] fields = MediaSizeName.class.getFields();
		for (Field field : fields) {
			MediaSizeName name = (MediaSizeName) field.get(null);
			if (name.getValue() == getPaperSize()) {
				mediaSize = MediaSize.getMediaSizeForName(name);
				break;
			}
		}

		exporter.setMediaSize(mediaSize);

		externalContext.setResponseContentType(exporter.getContentType());
		externalContext.setResponseHeader("Content-Disposition", disposition);

		boolean renderSlicer = renderer.getRenderSlicer();

		try {
			renderer.setRenderSlicer(viewHandler.getRenderSlicer());

			renderer.render(model, exporter);
		} finally {
			renderer.setRenderSlicer(renderSlicer);

			out.flush();
			IOUtils.closeQuietly(out);
		}

		context.responseComplete();
	}

	
	/**
	 * @param format
	 * @throws IOException
	 */
	protected void exportExcel(Format format) throws IOException {
		ViewHandlerPivot4j viewHandler = getViewHandler();
		PivotModel model = getModel();
		
		FacesContext context = FacesContext.getCurrentInstance();

		String disposition = String.format("attachment; filename=\"%s.%s\"",
				model.getCube().getName(), format.getExtension());

		ExternalContext externalContext = context.getExternalContext();
		externalContext.setResponseHeader("Content-Disposition", disposition);

		TableRenderer renderer = viewHandler.getRenderer();

		boolean renderSlicer = renderer.getRenderSlicer();
		boolean inline = renderer.getShowSlicerMembersInline();

		OutputStream out = externalContext.getResponseOutputStream();

		ExcelExporter exporter = new ExcelExporter(out, readChartHtml());
		exporter.setFormat(format);

		externalContext.setResponseContentType(exporter.getContentType());

		try {
			renderer.setRenderSlicer(viewHandler.getRenderSlicer());
			renderer.setShowSlicerMembersInline(false);

			renderer.render(model, exporter);
		} finally {
			renderer.setRenderSlicer(renderSlicer);
			renderer.setShowSlicerMembersInline(inline);

			out.flush();
			IOUtils.closeQuietly(out);
		}
	}
	
	private String[] readChartHtml() {
	    ExternalContext ec = FacesContext.getCurrentInstance().getExternalContext();
	    String[] chartHtml = ec.getRequestParameterValuesMap().get("chartHtml");
	    return chartHtml;
	}
	

}
