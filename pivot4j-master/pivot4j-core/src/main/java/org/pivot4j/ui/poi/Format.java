/*
 * ====================================================================
 * This software is subject to the terms of the Common Public License
 * Agreement, available at the following URL:
 *   http://www.opensource.org/licenses/cpl.html .
 * You must accept the terms of that agreement to use this software.
 * ====================================================================
 */
package org.pivot4j.ui.poi;

public enum Format {

	HSSF("xls"), XSSF("xlsx"), SXSSF("xlsx");

	private String extension;

	/**
	 * @param extension
	 */
	private Format(String extension) {
		this.extension = extension;
	}

	/**
	 * @return the extension
	 */
	public String getExtension() {
		return extension;
	}

}
