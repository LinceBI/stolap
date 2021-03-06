/*
 * ====================================================================
 * This software is subject to the terms of the Common Public License
 * Agreement, available at the following URL:
 *   http://www.opensource.org/licenses/cpl.html .
 * You must accept the terms of that agreement to use this software.
 * ====================================================================
 */
package com.stratebi.stolap.analytics.state;

import java.io.Serializable;

public class CalculadoraMember extends FunctionMember implements CustomMember, Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	
	public CalculadoraMember(String name, String expression) {
		super(name, expression, "[Measures]");
	}

}
