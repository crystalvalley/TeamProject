package org.team.sns.sockets;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import org.team.sns.domain.Member;
import org.team.sns.domain.Room;
import org.team.sns.persistence.RoomMemberRepository;
import org.team.sns.persistence.RoomRepository;
import org.team.sns.vo.ClientSockets;
import org.team.sns.vo.SignalMessage;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * 
 * @author ParkHyeokJoon
 * @since 2018.09.13
 * @version 2018.09.13
 *
 */
@CrossOrigin("*")
public class SignalingSocketHandler extends TextWebSocketHandler {
	@Autowired
	RoomRepository rr;
	@Autowired
	RoomMemberRepository rmr;

	private static final Logger LOG = LoggerFactory.getLogger(SignalingSocketHandler.class);

	private static final String LOGIN_TYPE = "login";
	private static final String LOGIN_RESPONSE = "login-response";
	private static final String RTC_TYPE = "rtc";
	private static final String MSG_TYPE = "chat-msg";
	private static final String REFRESH = "refresh";

	// Jackson JSON converter
	private ObjectMapper objectMapper = new ObjectMapper();

	// Here is our Directory (MVP way)
	// 소켓을 id를 키로 저장
	private Map<String, WebSocketSession> clients = ClientSockets.CLIENTS;
	// 소켓ID로 유저네임 저장
	private Map<String, String> clientIds = ClientSockets.CLIENTIDS;

	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		LOG.debug("handleTextMessage : {}", message.getPayload());
		System.out.println(message.getPayload());

		SignalMessage signalMessage = objectMapper.readValue(message.getPayload(), SignalMessage.class);
		System.out.println(signalMessage);

		if (LOGIN_TYPE.equalsIgnoreCase(signalMessage.getType())) {
			this.loginProcess(session, signalMessage);
		} else if (RTC_TYPE.equalsIgnoreCase(signalMessage.getType())) {

			/*
			 * 
			 * // with the dest username, we can find the targeted socket, if any String
			 * dest = signalMessage.getDest(); WebSocketSession destSocket =
			 * clients.get(dest); // if the socket exists and is open, we go on if
			 * (destSocket != null && destSocket.isOpen()) {
			 * 
			 * // We write the message to send to the dest socket (it's our propriatary
			 * format)
			 * 
			 * SignalMessage out = new SignalMessage(); // still an RTC type
			 * out.setType(RTC_TYPE); // we use the dest field to specify the actual exp.,
			 * but it will be the next // dest. out.setDest(clientIds.get(session.getId()));
			 * // The data stays as it is out.setData(signalMessage.getData());
			 * 
			 * // Convert our object back to JSON String stringifiedJSONmsg =
			 * objectMapper.writeValueAsString(out);
			 * 
			 * LOG.debug("send message {}", stringifiedJSONmsg);
			 * 
			 * destSocket.sendMessage(new TextMessage(stringifiedJSONmsg)); }
			 * 
			 */
		} else if (MSG_TYPE.equalsIgnoreCase(signalMessage.getType())) {
			System.out.println("채팅들어옴");
			this.msgProcess(session, signalMessage);

			/*
			 * // with the dest username, we can find the targeted socket, if any String
			 * dest = signalMessage.getDest(); WebSocketSession destSocket =
			 * clients.get(dest); // if the socket exists and is open, we go on if
			 * (destSocket != null && destSocket.isOpen()) {
			 * 
			 * // We write the message to send to the dest socket (it's our propriatary
			 * format)
			 * 
			 * SignalMessage out = new SignalMessage(); // still an RTC type
			 * out.setType(MSG_TYPE); // we use the dest field to specify the actual exp.,
			 * but it will be the next // dest. out.setDest(clientIds.get(session.getId()));
			 * // The data stays as it is out.setData(signalMessage.getData());
			 * 
			 * // Convert our object back to JSON String stringifiedJSONmsg =
			 * objectMapper.writeValueAsString(out);
			 * 
			 * LOG.debug("send message {}", stringifiedJSONmsg);
			 * 
			 * destSocket.sendMessage(new TextMessage(stringifiedJSONmsg)); }
			 */
		}else if(REFRESH.equalsIgnoreCase(signalMessage.getType())) {
			this.loginProcess(session, signalMessage);
		}
	}

	private void msgProcess(WebSocketSession session, SignalMessage signalMessage) throws Exception {
		// 유저네임 받아오기
		Member user = signalMessage.getSender();
		List<Member> targets = signalMessage.getDestination();
		int roomId = signalMessage.getRoomId();
		// 대상유저들의 소켓 찾기
		for (int i = 0; i < targets.size(); i++) {
			WebSocketSession target = clients.get(targets.get(i).getId());
			if (target == null) {
				continue;
			}
			SignalMessage out = new SignalMessage();
			out.setType("chat-response");
			out.setSender(user);
			out.setData(signalMessage.getData());
			out.setRoomId(roomId);
			String result = objectMapper.writeValueAsString(out);
			target.sendMessage(new TextMessage(result));

		}
	}

	private void loginProcess(WebSocketSession session, SignalMessage signalMessage) throws Exception {
		System.out.println("로그인");
		Member user = signalMessage.getSender();
		// 웹소켓 생성
		WebSocketSession client = clients.get(user.getId());

		// 유저네임이 이미 있거나 없을 경우를 체크
		if (client == null || !client.isOpen()) {
			LOG.debug("Login {} : OK", user);
			// 유저네임을 키로 세션을 저장
			clients.put(user.getId(), session);
			clientIds.put(session.getId(), user.getId());
		} else {
			LOG.debug("Login {} : KO", user.getId());
		}
		List<Room> rooms = rmr.getRoomsByloginedUser(user.getId());
		SignalMessage out = new SignalMessage();
		out.setType(LOGIN_RESPONSE);
		out.setSender(user);
		out.setData(rooms);
		String result = objectMapper.writeValueAsString(out);
		clients.get(user.getId()).sendMessage(new TextMessage(result));
	}

}
