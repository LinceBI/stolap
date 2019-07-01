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

import org.olap4j.metadata.Hierarchy;
import org.olap4j.metadata.Level;

public class CalculatedNamedSet extends CalculatedMeasure {

	public CalculatedNamedSet(Hierarchy hierarchy, Level level, String name, String uniqueName, String description, String formula, Map<String, String> properties) {
		super(hierarchy, level, name, uniqueName, description, formula, properties);
	}
	
}
