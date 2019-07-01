/*
 * ====================================================================
 * This software is subject to the terms of the Common Public License
 * Agreement, available at the following URL:
 *   http://www.opensource.org/licenses/cpl.html .
 * You must accept the terms of that agreement to use this software.
 * ====================================================================
 */
package com.stratebi.stpivot4.analytics.ui.metadata;

import java.util.Map;

public interface Calculated {

	public String getFormula();

	public Map<String, String> getFormatProperties();

	public String getUniqueName();

	public int getSolveOrder();

}