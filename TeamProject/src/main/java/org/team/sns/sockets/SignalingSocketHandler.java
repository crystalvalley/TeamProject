package org.team.sns.sockets;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import org.team.sns.vo.SignalMessage;

import com.fasterxml.jackson.databind.ObjectMapper;

public class SignalingSocketHandler extends TextWebSocketHandler {

	private static final Logger LOG = LoggerFactory.getLogger(SignalingSocketHandler.class);

	private static final String LOGIN_TYPE = "login";
	private static final String RTC_TYPE = "rtc";

	// Jackson JSON converter
	private ObjectMapper objectMapper = new ObjectMapper();

	// Here is our Directory (MVP way)
	// 소켓을 username을 키로 저장
	private Map<String, WebSocketSession> clients = new HashMap<String, WebSocketSession>();
	// 소켓ID로 유저네임 저장
	private Map<String, String> clientIds = new HashMap<String, String>();

	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		LOG.debug("handleTextMessage : {}", message.getPayload());

		SignalMessage signalMessage = objectMapper.readValue(message.getPayload(), SignalMessage.class);

		if (LOGIN_TYPE.equalsIgnoreCase(signalMessage.getType())) {
			// 로그인 메시지이므로 string일 거라 예상가능
			// 유저네임 받아오기
			String username = (String) signalMessage.getData();
			System.out.println(username);

			WebSocketSession client = clients.get(username);

			// 유저네임이 이미 있거나 없을 경우를 체크
			if (client == null || !client.isOpen()) {
				LOG.debug("Login {} : OK", username);
				// 유저네임을 키로 세션을 저장
				clients.put(username, session);
				clientIds.put(session.getId(), username);
			} else {
				LOG.debug("Login {} : KO", username);
			}

		} else if (RTC_TYPE.equalsIgnoreCase(signalMessage.getType())) {

			// with the dest username, we can find the targeted socket, if any
			String dest = signalMessage.getDest();
			WebSocketSession destSocket = clients.get(dest);
			// if the socket exists and is open, we go on
			if (destSocket != null && destSocket.isOpen()) {

				// We write the message to send to the dest socket (it's our propriatary format)

				SignalMessage out = new SignalMessage();
				// still an RTC type
				out.setType(RTC_TYPE);
				// we use the dest field to specify the actual exp., but it will be the next
				// dest.
				out.setDest(clientIds.get(session.getId()));
				// The data stays as it is
				out.setData(signalMessage.getData());

				// Convert our object back to JSON
				String stringifiedJSONmsg = objectMapper.writeValueAsString(out);

				LOG.debug("send message {}", stringifiedJSONmsg);

				destSocket.sendMessage(new TextMessage(stringifiedJSONmsg));
			}
		}

	}

}
