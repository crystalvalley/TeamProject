package org.team.sns.vo;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.socket.WebSocketSession;


/**
 * 
 * @author ParkHyeokJoon
 * @since 2018.09.19
 * @version 2018.09.19
 *
 */
public class ClientSockets {
	public static final Map<String, WebSocketSession> CLIENTS  = new HashMap<String, WebSocketSession>();
	public static final  Map<String, String> CLIENTIDS = new HashMap<String, String>();
}
