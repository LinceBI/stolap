package org.pivot4j.analytics.ui;

import com.stratebi.stolap.analytics.ui.STAggregatorFactory;

public class DefaultTableRenderer extends DefaultTableRendererPivot4j {

	public DefaultTableRenderer() {
		super();
		
		setAggregatorFactory(new STAggregatorFactory());
	}

}
