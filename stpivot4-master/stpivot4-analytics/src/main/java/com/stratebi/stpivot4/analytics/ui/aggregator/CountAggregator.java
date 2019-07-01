/*
 * ====================================================================
 * This software is subject to the terms of the Common Public License
 * Agreement, available at the following URL:
 *   http://www.opensource.org/licenses/cpl.html .
 * You must accept the terms of that agreement to use this software.
 * ====================================================================
 */
package com.stratebi.stpivot4.analytics.ui.aggregator;

import java.util.List;

import org.olap4j.Axis;
import org.olap4j.Position;
import org.olap4j.metadata.Level;
import org.olap4j.metadata.Measure;
import org.olap4j.metadata.Member;

public class CountAggregator extends org.pivot4j.ui.aggregator.CountAggregator {

	public CountAggregator(Axis axis, List<Member> members, Level level, Measure measure) {
		super(axis, members, level, measure);
	}

	@Override
	protected Double getValue(Position position) {
		if (position!=null && position.getMembers()!=null && position.getMembers().isEmpty()) {
			return null;
		}
		return (double) getCount(position);
	}
}
