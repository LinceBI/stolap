/*
 * ====================================================================
 * This software is subject to the terms of the Common Public License
 * Agreement, available at the following URL:
 *   http://www.opensource.org/licenses/cpl.html .
 * You must accept the terms of that agreement to use this software.
 * ====================================================================
 */
package com.stratebi.stpivot4j.analytics.component.menubutton;

import java.io.IOException;

import javax.faces.context.FacesContext;
import javax.faces.context.ResponseWriter;

import org.primefaces.component.menubutton.MenuButton;
import org.primefaces.util.HTML;

/**
 * Modificado el renderer original de primefaces para añadir al componente p:menubutton un title y mostrar el tooltip cuando tiene un styleclass 'menubutton-title'
 *
 */
public class MenuButtonRenderer extends org.primefaces.component.menubutton.MenuButtonRenderer {

	@Override
	protected void encodeButton(FacesContext context, MenuButton button, String buttonId, boolean disabled) throws IOException {
        ResponseWriter writer = context.getResponseWriter();
        boolean isIconLeft = button.getIconPos().equals("left");
        String value = button.getValue();
        String buttonTextClass = isIconLeft ? HTML.BUTTON_TEXT_ICON_LEFT_BUTTON_CLASS : HTML.BUTTON_TEXT_ICON_RIGHT_BUTTON_CLASS;
        String buttonClass = disabled ? buttonTextClass + " ui-state-disabled" : buttonTextClass;
        
        writer.startElement("button", null);
		writer.writeAttribute("id", buttonId, null);
		writer.writeAttribute("name", buttonId, null);
		writer.writeAttribute("type", "button", null);
        writer.writeAttribute("class", buttonClass, null);
        if(button.isDisabled()) {
            writer.writeAttribute("disabled", "disabled", null);
        }

        if (button.getStyleClass()!=null && button.getStyleClass().contains("menubutton-title") && value!=null && !"".equals(value)) {
            writer.writeAttribute("title", value, null);
        }
        
       
        //button icon
        String iconClass = isIconLeft ? HTML.BUTTON_LEFT_ICON_CLASS : HTML.BUTTON_RIGHT_ICON_CLASS;
        iconClass = iconClass + " " + MenuButton.ICON_CLASS;
        
        writer.startElement("span", null);
        writer.writeAttribute("class", iconClass, null);
        writer.endElement("span");
        
        //text
        writer.startElement("span", null);
        writer.writeAttribute("class", HTML.BUTTON_TEXT_CLASS, null);
        
        if(value == null)
            writer.write("ui-button");
        else
            writer.writeText(value, "value");
        
        writer.endElement("span");

		writer.endElement("button");
	}
	
	

}
