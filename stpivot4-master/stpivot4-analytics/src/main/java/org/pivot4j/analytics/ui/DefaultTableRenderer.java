package org.pivot4j.analytics.ui;

import com.stratebi.stpivot4.analytics.ui.STAggregatorFactory;

public class DefaultTableRenderer extends DefaultTableRendererPivot4j {

	public DefaultTableRenderer() {
		super();
		
		setAggregatorFactory(new STAggregatorFactory());
	}

}
