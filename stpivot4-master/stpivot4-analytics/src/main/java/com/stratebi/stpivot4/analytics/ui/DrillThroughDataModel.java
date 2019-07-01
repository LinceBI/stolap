/*
 * ====================================================================
 * This software is subject to the terms of the Common Public License
 * Agreement, available at the following URL:
 *   http://www.opensource.org/licenses/cpl.html .
 * You must accept the terms of that agreement to use this software.
 * ====================================================================
 */
package com.stratebi.stpivot4.analytics.ui;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.faces.FacesException;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ViewScoped;

import org.apache.commons.dbutils.DbUtils;
import org.primefaces.model.SortOrder;

@ManagedBean(name = "drillThroughData")
@ViewScoped
public class DrillThroughDataModel extends org.pivot4j.analytics.ui.DrillThroughDataModel {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private static final String ROW_KEY = "_id";
		
	public List<Map<String, Object>> load(int first, int pageSize,
			String sortField, SortOrder sortOrder, Map<String, Object> filters) {
		if (getColumns().isEmpty()) {
			return Collections.emptyList();
		}

		List<Map<String, Object>> data = new ArrayList<Map<String, Object>>(
				pageSize);

		ResultSet result = null;
		Statement stmt = null;

		try {
			result = execute();
			stmt = result.getStatement();

			boolean scrollable = (result.getStatement().getResultSetType() == ResultSet.TYPE_SCROLL_SENSITIVE);

			int rowIndex = 0;

			if (scrollable) {
				rowIndex = first;

				result.absolute(rowIndex + 1);
			} else {
				while (rowIndex < first) {
					if (!result.next()) {
						return Collections.<Map<String, Object>> emptyList();
					}

					rowIndex++;
				}
			}

			List<DataColumn> columnList = getColumns();

			for (int i = 0; i < pageSize; i++) {
				if (result.next()) {
					Map<String, Object> row = new HashMap<String, Object>(
							columnList.size() + 1);

					for (DataColumn column : columnList) {
						if (ROW_KEY.equals(column.getName())) {
							row.put(ROW_KEY, rowIndex + i + 1);
						} else {
							/*En algunos casos se producia una exception column not found al ejecutar el drill through. Al cambiar column.getName() por column.getLabel() se soluciona */
							row.put(column.getName(),
									result.getObject(column.getLabel()));
						}
					}

					data.add(row);
				} else {
					break;
				}
			}
		} catch (SQLException e) {
			throw new FacesException(e);
		} finally {
			DbUtils.closeQuietly(result);
			DbUtils.closeQuietly(stmt);
		}

		return data;
	}	
	
}
