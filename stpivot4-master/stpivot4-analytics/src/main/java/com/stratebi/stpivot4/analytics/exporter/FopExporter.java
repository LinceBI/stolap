/*
 * ====================================================================
 * This software is subject to the terms of the Common Public License
 * Agreement, available at the following URL:
 *   http://www.opensource.org/licenses/cpl.html .
 * You must accept the terms of that agreement to use this software.
 * ====================================================================
 */
package com.stratebi.stpivot4.analytics.exporter;

import java.io.InputStream;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.Map;

import javax.faces.context.FacesContext;
import javax.xml.bind.DatatypeConverter;

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.fop.fo.FOElementMapping;
import org.olap4j.Axis;
import org.pivot4j.PivotException;
import org.pivot4j.ui.table.TableRenderContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.AttributesImpl;
import org.xml.sax.helpers.DefaultHandler;

import com.stratebi.stpivot4.analytics.state.RenderFormat;

public class FopExporter extends org.pivot4j.ui.fop.FopExporter {

	private final static Logger logger = LoggerFactory.getLogger(FopExporter.class);
	
	private String[] chartImg;

	private Map<String, String> arrowImagesURI;
	
	public FopExporter(OutputStream out, String[] chartImg) {
		super(out);
		this.chartImg = chartImg;
		
		//Load arrow images uri
		arrowImagesURI = new HashMap<String, String>();
		
		arrowImagesURI.put("arrow-upred", imageToURI("/resources/stpivot4/images/table/arrow-rup.gif", "gif"));
		arrowImagesURI.put("arrow-upgreen", imageToURI("/resources/stpivot4/images/table/arrow-gup.gif", "gif"));
		arrowImagesURI.put("arrow-upblack", imageToURI("/resources/stpivot4/images/table/arrow-nup.gif", "gif"));

		arrowImagesURI.put("arrow-downred", imageToURI("/resources/stpivot4/images/table/arrow-down.gif", "gif"));
		arrowImagesURI.put("arrow-downgreen", imageToURI("/resources/stpivot4/images/table/arrow-gdown.gif", "gif"));
		arrowImagesURI.put("arrow-downblack", imageToURI("/resources/stpivot4/images/table/arrow-ndown.gif", "gif"));
		
		arrowImagesURI.put("arrow-pinred", imageToURI("/resources/stpivot4/images/table/arrow-red.gif", "gif"));
		arrowImagesURI.put("arrow-pingreen", imageToURI("/resources/stpivot4/images/table/arrow-green.gif", "gif"));
		arrowImagesURI.put("arrow-pinblack", imageToURI("/resources/stpivot4/images/table/arrow-black.gif", "gif"));
		arrowImagesURI.put("arrow-pinyellow", imageToURI("/resources/stpivot4/images/table/arrow-yellow.gif", "gif"));
		arrowImagesURI.put("arrow-pinblue", imageToURI("/resources/stpivot4/images/table/arrow-blue.gif", "gif"));
	}
	
	@Override
	public void endRender(TableRenderContext context) {
		try {
			//print chart
			if (chartImg!=null && chartImg.length>0) {
				DefaultHandler documentHandler = getDocumentHandler();
				for (String img : chartImg) {
					if (StringUtils.isNotEmpty(img)) {

						documentHandler.startElement(FOElementMapping.URI,
								"block", "block", createBlockChartTextAttributes(context));
						
						documentHandler.startElement(FOElementMapping.URI, "external-graphic",
								"external-graphic", createChartAttributes(context, img));
						
						documentHandler.endElement(FOElementMapping.URI, "external-graphic",
								"external-graphic");

						documentHandler.endElement(FOElementMapping.URI, "block",
								"block");
						
					}
				}
			}
			
		} catch (SAXException e) {
			logger.error(e.getMessage(), e);
			throw new PivotException(e);
		}
		super.endRender(context);
		
	}

	
	protected AttributesImpl createBlockChartTextAttributes(
			TableRenderContext context) {
		AttributesImpl attributes = new AttributesImpl();

		attributes
				.addAttribute("", "text-align", "text-align", "CDATA", "left");

		if (context.getAxis() == Axis.FILTER) {
			attributes.addAttribute("", "margin-top", "margin-top", "CDATA",
					"3.0em");
			attributes.addAttribute("", "margin-bottom", "margin-bottom",
					"CDATA", "3.0em");
		}

		return attributes;
	}
	


	private Attributes createChartAttributes(TableRenderContext context, String img) {
		AttributesImpl attributes = new AttributesImpl();
		attributes.addAttribute("", "src", "src", "CDATA","url('" +  img + "')");
		return attributes;
	}



	@Override
	public void renderContent(TableRenderContext context, String label, Double value) {
		RenderFormat rf = RenderFormat.parseFormatString(label);
		if (rf!=null) {
			label = rf.getId();
		}
		
		try {
			DefaultHandler documentHandler = getDocumentHandler();
			documentHandler.startElement(FOElementMapping.URI, "inline",
					"inline", createRenderFormatAttributes(context, rf));

			if (label != null) {
				documentHandler.characters(label.toCharArray(), 0,
						label.length());
			}

			documentHandler.endElement(FOElementMapping.URI, "inline",
					"inline");
			
			if (rf!=null && StringUtils.isNotBlank(rf.getArrowSignClass())) {
				createArrowImage(context, rf.getArrowSignClass());
			}
			
		} catch (SAXException e) {
			throw new PivotException(e);
		}
	}
	
	private void createArrowImage(TableRenderContext context, String arrowClass) {
		try {
			//print chart
			if (arrowClass!=null) {
				DefaultHandler documentHandler = getDocumentHandler();
				String imgURI = arrowImagesURI.get(arrowClass);
				if (StringUtils.isNotEmpty(imgURI)) {
					documentHandler.startElement(FOElementMapping.URI, "inline",
							"inline", new AttributesImpl());

					documentHandler.characters(" ".toCharArray(), 0,
							" ".length());
					
					documentHandler.startElement(FOElementMapping.URI, "external-graphic",
							"external-graphic", createArrowImageAttributes(context, imgURI));
					documentHandler.endElement(FOElementMapping.URI, "external-graphic",
							"external-graphic");
					
					documentHandler.endElement(FOElementMapping.URI, "inline",
							"inline");
					
				}
			}
		} catch (SAXException e) {
			logger.error(e.getMessage(), e);
			throw new PivotException(e);
		}
	}
	
	private Attributes createArrowImageAttributes(TableRenderContext context, String img) {
		AttributesImpl attributes = new AttributesImpl();
		attributes.addAttribute("", "src", "src", "CDATA","url('" +  img + "')");
		return attributes;
	}


	private Attributes createRenderFormatAttributes(TableRenderContext context, RenderFormat rf) {
		AttributesImpl attributes = new AttributesImpl();
		if (rf!=null) {
			if (StringUtils.isNotBlank(rf.getFgColor())) {
				attributes.addAttribute("", "color", "color", "CDATA", "#" + rf.getFgColor());
			}
		}
		return attributes;
	}
	

	private String imageToURI(String imgResourcePath, String imgType) {
		String imageString = null;
		try {
			InputStream is = FacesContext.getCurrentInstance().getExternalContext().getResourceAsStream(imgResourcePath);
			byte[] imgBytes = IOUtils.toByteArray(is);
			imageString = "data:image/" + imgType + ";base64," + DatatypeConverter.printBase64Binary(imgBytes);
		} catch (Throwable th) {
			logger.error(th.getMessage(), th);
		}
		return imageString;		
	}

	
	
}
