/*
 * ====================================================================
 * This software is subject to the terms of the Common Public License
 * Agreement, available at the following URL:
 *   http://www.opensource.org/licenses/cpl.html .
 * You must accept the terms of that agreement to use this software.
 * ====================================================================
 */
package com.stratebi.stpivot4.analytics.ui;


import java.util.Date;
import java.util.Properties;
import java.util.ResourceBundle;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.faces.application.FacesMessage;
import javax.faces.application.FacesMessage.Severity;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.RequestScoped;
import javax.faces.context.FacesContext;
import javax.mail.Authenticator;
import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.mail.util.ByteArrayDataSource;

import org.apache.commons.lang.ObjectUtils;
import org.pentaho.platform.api.email.IEmailConfiguration;
import org.pentaho.platform.api.email.IEmailService;
import org.pentaho.platform.engine.core.system.PentahoSessionHolder;
import org.pentaho.platform.engine.core.system.PentahoSystem;
import org.pivot4j.PivotModel;
import org.pivot4j.ui.poi.Format;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@ManagedBean(name = "mailHandler")
@RequestScoped
public class MailHandler {
	 
	@ManagedProperty(value="#{pivotExportHandler}")
    private PivotExportHandler export;
	
	@ManagedProperty(value = "#{pivotStateManager.model}")
	private PivotModel model;
	
	private Logger logger = LoggerFactory.getLogger(getClass());
	
	private String sender;
	
	private String receiver;
	
	private String subject;
	
	private String body;
	
	private String print;

	
	public void send() {
		 final IEmailService service = PentahoSystem.get(IEmailService.class, "IEmailService", PentahoSessionHolder.getSession());		
		
		 if (service.isValid()) {
			 sendEmail( service.getEmailConfig() );
		 } else { 
 			FacesContext context = FacesContext.getCurrentInstance();				
			ResourceBundle bundle = context.getApplication().getResourceBundle( context, "msg");
			String tempDetail = bundle.getString("stpivot4.mailserver.configNotValid");
			String tempSummary = bundle.getString("stpivot4.errorUppercase");
			 			 
			FacesContext.getCurrentInstance().addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR, tempSummary, tempDetail));			 
		 }		
	}//send

	
	public void sendEmail(final IEmailConfiguration emailConfig) {
		
		final Properties emailProperties = new Properties();
		
		emailProperties.setProperty("mail.smtp.host", emailConfig.getSmtpHost());		
	    emailProperties.setProperty("mail.smtp.port", ObjectUtils.toString(emailConfig.getSmtpPort()));
	    emailProperties.setProperty("mail.transport.protocol", emailConfig.getSmtpProtocol());
	    emailProperties.setProperty("mail.smtp.starttls.enable", ObjectUtils.toString(emailConfig.isUseStartTls()));
	    emailProperties.setProperty("mail.smtp.auth", ObjectUtils.toString(emailConfig.isAuthenticate()));	    
	    emailProperties.setProperty("mail.smtp.ssl", ObjectUtils.toString(emailConfig.isUseSsl()));
	    emailProperties.setProperty("mail.debug", ObjectUtils.toString(emailConfig.isDebug()));
		    
	    Session session = null;
	    if (emailConfig.isAuthenticate()) {
	        Authenticator authenticator = new Authenticator() {
	        
        	@Override
	        protected PasswordAuthentication getPasswordAuthentication() {
	            return new PasswordAuthentication(emailConfig.getUserId(), emailConfig.getPassword());
	            }
	        };
	        
	        session = Session.getInstance(emailProperties, authenticator);
	    } else {
	        session = Session.getInstance(emailProperties);
	    }//if..else
	    	    
	    
	    String mensaje = "";
	    Severity severity = null;
	    String summary;
	    
	    try {
	        MimeMessage msg = new MimeMessage(session);
	        msg.setFrom( new InternetAddress(emailConfig.getDefaultFrom(),sender) );	        	        
	        msg.setRecipients( Message.RecipientType.TO, InternetAddress.parse(receiver) );
	        msg.setSubject(subject);
	        msg.setText(body);	        	        
	        msg.setHeader("X-Mailer", "smtpsend");
	        msg.setSentDate(new Date());
	        	        
	        // Create the message part
	        BodyPart messageBodyPart = new MimeBodyPart();
	        // Now set the actual message
	        messageBodyPart.setText(body);
	        // Create a multipart message
	        Multipart multipart = new MimeMultipart();
	        // Set text message part
	        multipart.addBodyPart(messageBodyPart);
	        // Part two is attachment
	        messageBodyPart = new MimeBodyPart();
	         
	        //attachment
	        
	        DataSource dataSource = null;
	        String fileExtension = null;         
	        if (getPrint().equals("SXSSF")) {	        				    
			    dataSource = new ByteArrayDataSource( export.exportExcelToByteArray(Format.SXSSF), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" );
			    fileExtension = (".xlsx");
	        } else if (getPrint().equals("PDF")) {
	        	dataSource = new ByteArrayDataSource( export.exportPdfToByteArray(), "application/pdf" );
			    fileExtension = (".pdf");	        	
	        } else {
	        	dataSource = new ByteArrayDataSource( model.getCurrentMdx(), "text/plain");
			    fileExtension = (".txt");	        	
	        }//if..else
	        messageBodyPart.setDataHandler(new DataHandler(dataSource));
	        messageBodyPart.setFileName( String.format("%s%s", model.getCube().getName(), fileExtension));
	        multipart.addBodyPart(messageBodyPart);

	        //send email
	        msg.setContent(multipart);	        	        	       	       
	        Transport.send(msg);

 			FacesContext context = FacesContext.getCurrentInstance();				
			ResourceBundle bundle = context.getApplication().getResourceBundle( context, "msg");
			String tempDetail = bundle.getString("stpivot4.mailserver.emailSend");
			String tempSummary = bundle.getString("stpivot4.infoUppercase");

	        mensaje = String.format("%s %s ", tempDetail, receiver);
	        severity = FacesMessage.SEVERITY_INFO;
	        summary = tempSummary;
	        
	    } catch (Exception e) {	    	
	    	
	        logger.error("sendmail - Error al enviar el email {}", e);	
	        
	        mensaje = e.toString();
	        severity = FacesMessage.SEVERITY_ERROR;
	        summary = "ERROR";
	        
	    }//try..catch
	    
    	FacesContext.getCurrentInstance().addMessage(null, new FacesMessage(severity, summary, mensaje));	    	
	    	    	    
	}//sendEmail
	
	  
	public String getSender() {
		return sender;
	}

	public void setSender(String sender) {
		this.sender = sender;
	}

	public String getReceiver() {
		return receiver;
	}

	public void setReceiver(String receiver) {
		this.receiver = receiver;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getBody() {
		return body;
	}

	public void setBody(String body) {
		this.body = body;
	}

	public String getPrint() {
		return print;
	}

	public void setPrint(String print) {
		this.print = print;
	}

	public PivotExportHandler getExport() {
		return export;
	}

	public void setExport(PivotExportHandler export) {
		this.export = export;
	}

	public PivotModel getModel() {
		return model;
	}

	public void setModel(PivotModel model) {
		this.model = model;
	}
		
}
