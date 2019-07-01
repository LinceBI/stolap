/*
 * ====================================================================
 * This software is subject to the terms of the Common Public License
 * Agreement, available at the following URL:
 *   http://www.opensource.org/licenses/cpl.html .
 * You must accept the terms of that agreement to use this software.
 * ====================================================================
 */
package com.stratebi.stpivot4.analytics.ui.aggregator;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.math.stat.descriptive.moment.Variance;
import org.olap4j.Axis;
import org.olap4j.Position;
import org.olap4j.metadata.Level;
import org.olap4j.metadata.Measure;
import org.olap4j.metadata.Member;
import org.pivot4j.ui.RenderContext;
import org.pivot4j.ui.aggregator.AbstractAggregator;

public class VariancePAggregator extends AbstractAggregator {

	public static final String NAME = "VARIANCEP";
	
	private List<Double> tempCalculate = new ArrayList<Double>();
	
	/**
	 * @param axis
	 * @param members
	 * @param level
	 * @param measure
	 */
	public VariancePAggregator(Axis axis, List<Member> members, Level level,
			Measure measure) {
		super(axis, members, level, measure);
	}

	/**
	 * @see org.pivot4j.ui.aggregator.Aggregator#getName()
	 */
	@Override
	public String getName() {
		return NAME;
	}

	/**
	 * @see org.pivot4j.ui.aggregator.AbstractAggregator#calculate(java.lang.Double,
	 *      java.lang.Double, org.olap4j.Position,
	 *      org.pivot4j.ui.RenderContext)
	 */
	@Override
	protected Double calculate(Double value, Double aggregation,
			Position position, RenderContext context) {
		if (value == null) {
			value = 0d;
		}

		if (aggregation == null) {
			tempCalculate.clear();
		}
					
		tempCalculate.add(value);
		Collections.sort(tempCalculate);
								
		//List -> Double[]
		Double[] tempArrayD = tempCalculate.toArray( new Double[tempCalculate.size()] );
		//Double[] -> double[]
		double[] tempArrayd = ArrayUtils.toPrimitive(tempArrayD);
		
		Variance variance = new Variance();		
		variance.setBiasCorrected(false);	//http://commons.apache.org/proper/commons-math/javadocs/api-3.3/index.html
		double varianza = variance.evaluate(tempArrayd);	
		return varianza;
											
	}

}
