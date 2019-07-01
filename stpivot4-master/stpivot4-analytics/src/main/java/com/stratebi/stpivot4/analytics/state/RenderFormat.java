/*
 * ====================================================================
 * This software is subject to the terms of the Common Public License
 * Agreement, available at the following URL:
 *   http://www.opensource.org/licenses/cpl.html .
 * You must accept the terms of that agreement to use this software.
 * ====================================================================
 */
package com.stratebi.stpivot4.analytics.state;

import java.io.Serializable;
import java.util.List;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.stratebi.stpivot4.analytics.utils.Encoder;

public class RenderFormat implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private final static Logger logger = LoggerFactory.getLogger(RenderFormat.class);
	
	private String id;
	private String comparisonOperator;
	private double comparisonValue;
	private String formatString;
	private String fgColor;
	private String arrowSignClass;
	private String link;
	

	public static String generateRandomId() {
		return UUID.randomUUID().toString();
	}
	
	public static RenderFormat parseFormatString(String formatedString) {
		RenderFormat renderFormat = null;
		if (formatedString!=null && formatedString.startsWith("|")) {
			int nextPipe = formatedString.indexOf("|", 1);
			if (nextPipe!=-1) {
				try {
					String[] formats = (String[]) Encoder.decodeToObject(formatedString.substring(1,nextPipe));
					if (formats!=null && formats.length==3) {
						renderFormat = new RenderFormat(); 
						renderFormat.setFgColor(formats[0]);
						renderFormat.setArrowSignClass(formats[1]);
						renderFormat.setLink(formats[2]);
						//id = real formatted value
						renderFormat.setId(formatedString.substring(nextPipe+1));
					}
				}
				catch(Throwable th) {
					logger.warn(th.getMessage(), th);
				}
			}
		}
		return renderFormat;
	}
	
	/**
	 *
	 * Genera  iif's anidados.
	 *  
	 * El ultimo de la lista es el formato por defecto.
	 * 
	 * @param renderFormats
	 * @return
	 */
	public static String generateFormatString(List<RenderFormat> renderFormats) {
		String formatString = null;
		if (renderFormats!=null && renderFormats.size()>0) {
			StringBuilder sb = new StringBuilder();
			
			for (int i = 0; i < renderFormats.size(); i++) {
				RenderFormat renderFormat = renderFormats.get(i);
				
				String format = "\"|" + Encoder.encodeObject(new String[] {renderFormat.getFgColor(), renderFormat.getArrowSignClass(), renderFormat.getLink()}) + "|\"";
				if (i==(renderFormats.size()-1)) {
					sb.append("'").append(format).append(renderFormat.getFormatString().replaceAll(";", ";" + format)).append("'");
				}
				else {
					sb.append("IIF(([Measures].CurrentMember");
					sb.append(renderFormat.getComparisonOperator());
					sb.append(renderFormat.getComparisonValue());
					sb.append("),");
					
					sb.append("'").append(format).append(renderFormat.getFormatString().replaceAll(";", ";" + format)).append("'");
					
					sb.append(", ");
				}
			}
			for (int i = 1; i < renderFormats.size(); i++) {
				sb.append(")");
			}
			formatString = sb.toString();
		}
		return formatString;
	}
	
	
	public double getComparisonValue() {
		return comparisonValue;
	}

	public void setComparisonValue(double comparisonValue) {
		this.comparisonValue = comparisonValue;
	}

	public String getFormatString() {
		return formatString;
	}

	public void setFormatString(String formatString) {
		this.formatString = formatString;
	}

	public String getFgColor() {
		return fgColor;
	}

	public void setFgColor(String fgColor) {
		this.fgColor = fgColor;
	}

	public String getLink() {
		return link;
	}

	public void setLink(String link) {
		this.link = link;
	}

	public String getComparisonOperator() {
		return comparisonOperator;
	}

	public void setComparisonOperator(String comparisonOperator) {
		this.comparisonOperator = comparisonOperator;
	}

	public String getArrowSignClass() {
		return arrowSignClass;
	}

	public void setArrowSignClass(String arrowSignClass) {
		this.arrowSignClass = arrowSignClass;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	
	
	
}
