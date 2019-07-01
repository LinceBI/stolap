/*
 * ====================================================================
 * This software is subject to the terms of the Common Public License
 * Agreement, available at the following URL:
 *   http://www.opensource.org/licenses/cpl.html .
 * You must accept the terms of that agreement to use this software.
 * ====================================================================
 */
package com.stratebi.stpivot4.analytics.ui;

import java.util.List;

import org.olap4j.Axis;
import org.olap4j.metadata.Level;
import org.olap4j.metadata.Measure;
import org.olap4j.metadata.Member;
import org.pivot4j.ui.aggregator.Aggregator;
import org.pivot4j.ui.aggregator.DefaultAggregatorFactory;

import com.stratebi.stpivot4.analytics.ui.aggregator.CountAggregator;
import com.stratebi.stpivot4.analytics.ui.aggregator.MedianAggregator;
import com.stratebi.stpivot4.analytics.ui.aggregator.StdevAggregator;
import com.stratebi.stpivot4.analytics.ui.aggregator.StdevPAggregator;
import com.stratebi.stpivot4.analytics.ui.aggregator.VarianceAggregator;
import com.stratebi.stpivot4.analytics.ui.aggregator.VariancePAggregator;

public class STAggregatorFactory extends DefaultAggregatorFactory {
	
	/**
	 * @see org.pivot4j.ui.aggregator.AggregatorFactory#getAvailableAggregations()
	 */
	@Override
	public List<String> getAvailableAggregations() {
		List<String> names = super.getAvailableAggregations();
		names.add(MedianAggregator.NAME);
		names.add(StdevAggregator.NAME);
		names.add(StdevPAggregator.NAME);
		names.add(VarianceAggregator.NAME);
		names.add(VariancePAggregator.NAME);
		return names;
	}

	
	
	@Override
	public Aggregator createAggregator(String name, Axis axis, List<Member> members, Level level, Measure measure) {
		if (name!=null && MedianAggregator.NAME.equals(name)) {
			return  new MedianAggregator(axis, members, level, measure);
		} else if (name!=null && StdevAggregator.NAME.equals(name)) {
			return  new StdevAggregator(axis, members, level, measure);
		} else if (name!=null && StdevPAggregator.NAME.equals(name)) {
			return  new StdevPAggregator(axis, members, level, measure);
		} else if (name!=null && VarianceAggregator.NAME.equals(name)) {
			return  new VarianceAggregator(axis, members, level, measure);
		} else if (name!=null && VariancePAggregator.NAME.equals(name)) {
			return  new VariancePAggregator(axis, members, level, measure);
		} else if (name!=null && CountAggregator.NAME.equals(name)) {
			return  new CountAggregator(axis, members, level, measure);
		}
		else {
			return super.createAggregator(name, axis, members, level, measure);
		}
	}
	

}
