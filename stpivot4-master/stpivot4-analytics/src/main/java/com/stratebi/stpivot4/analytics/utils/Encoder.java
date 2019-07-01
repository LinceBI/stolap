/*
 * ====================================================================
 * This software is subject to the terms of the Common Public License
 * Agreement, available at the following URL:
 *   http://www.opensource.org/licenses/cpl.html .
 * You must accept the terms of that agreement to use this software.
 * ====================================================================
 */
package com.stratebi.stpivot4.analytics.utils;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.nio.charset.StandardCharsets;
import java.util.zip.GZIPInputStream;
import java.util.zip.GZIPOutputStream;

import org.apache.commons.codec.binary.Base64;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Encoder {
	
	private final static Logger logger = LoggerFactory.getLogger(Encoder.class);
	
	public static Object decodeToObject(String encodedObject) {
		Object obj = null;
		try {
		     byte b[] = Base64.decodeBase64(encodedObject.getBytes(StandardCharsets.UTF_8));
		     ByteArrayInputStream bi = new ByteArrayInputStream(b);
             GZIPInputStream gzip = new GZIPInputStream(bi);
		     ObjectInputStream si = new ObjectInputStream(gzip);
		     obj = si.readObject();
		     gzip.close();
		     bi.close();
		 } catch (Exception e) {
			 logger.warn(e.getMessage(), e);
		 }		
		return obj;
	}
	
	public static String encodeObject(Object serializableObject) {
		String encoded = null;
		try {
		     ByteArrayOutputStream bo = new ByteArrayOutputStream();
             GZIPOutputStream gzip = new GZIPOutputStream(bo);
		     ObjectOutputStream so = new ObjectOutputStream(gzip);
		     so.writeObject(serializableObject);
		     so.flush();
		     gzip.close();
		     bo.close();
		     encoded = new String(Base64.encodeBase64(bo.toByteArray()), StandardCharsets.UTF_8);
		 } catch (Exception e) { 
			 logger.warn(e.getMessage(), e);
		 }		
		return encoded;
	}

}
