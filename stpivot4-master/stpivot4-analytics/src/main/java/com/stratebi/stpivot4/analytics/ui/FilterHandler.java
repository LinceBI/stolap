/*
 * ====================================================================
 * This software is subject to the terms of the Common Public License
 * Agreement, available at the following URL:
 *   http://www.opensource.org/licenses/cpl.html .
 * You must accept the terms of that agreement to use this software.
 * ====================================================================
 */
package com.stratebi.stpivot4.analytics.ui;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.RequestScoped;

import org.primefaces.event.DragDropEvent;

@ManagedBean(name = "filterHandler")
@RequestScoped
public class FilterHandler extends org.pivot4j.analytics.ui.FilterHandler {

	
	/* (non-Javadoc)
	 * 
	 * Fix error message when dragging dialog 
	 * 
	 * @see org.pivot4j.analytics.ui.FilterHandler#onDrop(org.primefaces.event.DragDropEvent)
	 */
	@Override
	public void onDrop(DragDropEvent e) {
		//To fix error message when dragging dialog 
		if (isSourceNode(e.getDragId())) {
			super.onDrop(e);
		}
	}

}
