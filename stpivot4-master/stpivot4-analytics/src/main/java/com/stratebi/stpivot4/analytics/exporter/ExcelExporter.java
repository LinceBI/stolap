/*
 * ====================================================================
 * This software is subject to the terms of the Common Public License
 * Agreement, available at the following URL:
 *   http://www.opensource.org/licenses/cpl.html .
 * You must accept the terms of that agreement to use this software.
 * ====================================================================
 */
package com.stratebi.stpivot4.analytics.exporter;

import static org.pivot4j.ui.CellTypes.VALUE;

import java.io.OutputStream;
import java.util.ArrayList;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.lang.StringUtils;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.ClientAnchor;
import org.apache.poi.ss.usermodel.CreationHelper;
import org.apache.poi.ss.usermodel.Drawing;
import org.apache.poi.ss.usermodel.Picture;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.olap4j.Axis;
import org.pivot4j.ui.table.TableRenderContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.stratebi.stpivot4.analytics.state.RenderFormat;

public class ExcelExporter extends org.pivot4j.ui.poi.ExcelExporter {

	private final static Logger logger = LoggerFactory.getLogger(ExcelExporter.class);
	
	private String[] chartImg;
	
	public ExcelExporter(OutputStream out, String[] chartImg) {
		super(out);
		this.chartImg = chartImg;
	}

	@Override
	public void endRender(TableRenderContext context) {
		if (chartImg!=null && chartImg.length>0) {
			Workbook workbook = getWorkbook();
			ArrayList<Integer> picturesIdx = new ArrayList<Integer>();
			String encodingPrefix = "base64,";
			for (String img : chartImg) {
				if (StringUtils.isNotEmpty(img)) {
					int contentStartIndex = img.indexOf(encodingPrefix) + encodingPrefix.length();
					byte[] imageData = Base64.decodeBase64(img.substring(contentStartIndex).getBytes());
					int pictureIdx = workbook.addPicture(imageData, Workbook.PICTURE_TYPE_PNG);
					
					picturesIdx.add(pictureIdx);
				}
			}

			//Returns an object that handles instantiating concrete classes
			CreationHelper helper = workbook.getCreationHelper();
			
			for (Integer pictureIdx : picturesIdx) {
				Sheet sheet = workbook.createSheet("chart " + pictureIdx);
				
				//Creates the top-level drawing patriarch.
				Drawing drawing = sheet.createDrawingPatriarch();

			   //Create an anchor that is attached to the worksheet
			   ClientAnchor anchor = helper.createClientAnchor();
			   //set top-left corner for the image
			   anchor.setCol1(1);
			   anchor.setRow1(2);

			   //Creates a picture
			   Picture pict = drawing.createPicture(anchor, pictureIdx);
			   //Reset the image to the original size
			   pict.resize();
			}
		}
		
		
	   
		super.endRender(context);
	}

	@Override
	public void renderContent(TableRenderContext context, String label, Double value) {
		RenderFormat rf = RenderFormat.parseFormatString(label);
		if (rf!=null) {
			label = rf.getId();
		}
		
		Cell cell = getCell();
		cell.setCellStyle(getCellStyle(context));

		if (VALUE.equals(context.getCellType())
				&& context.getAxis() != Axis.FILTER) {
			if (value == null) {
				cell.setCellValue("");
			} else {
				cell.setCellValue(value);
			}
		} else {
			boolean showParentMembers = context.getRenderer()
					.getShowParentMembers();

			if (!showParentMembers && label != null
					&& context.getAxis() == Axis.ROWS
					&& context.getMember() != null && context.getCell() == null) {
				label = StringUtils.leftPad(label, context.getMember()
						.getDepth() + label.length());
			}

			if (label==null) {
				label="";
			}
			cell.setCellValue(label);
			cell.setCellType(Cell.CELL_TYPE_STRING);
		}
	}

	
}
