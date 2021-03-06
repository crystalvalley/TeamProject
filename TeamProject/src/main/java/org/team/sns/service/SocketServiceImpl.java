package org.team.sns.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.team.sns.domain.ChatMsg;
import org.team.sns.domain.Room;
import org.team.sns.domain.RoomMember;
import org.team.sns.domain.RoomMemberPK;
import org.team.sns.persistence.ChatMsgRepository;
import org.team.sns.persistence.MemberRepository;
import org.team.sns.persistence.RoomMemberRepository;
import org.team.sns.persistence.RoomRepository;
import org.team.sns.vo.ClientSockets;
import org.team.sns.vo.SignalMessage;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * 
 * @author ParkHyeokJoon
 * @since 2018.09.19
 * @version 2018.09.19
 *
 */
@Service
public class SocketServiceImpl implements SocketService {
	private ObjectMapper objectMapper = new ObjectMapper();
	private Map<String, WebSocketSession> clients = ClientSockets.CLIENTS;
	@Autowired
	RoomMemberRepository rmr;
	@Autowired
	RoomRepository rr;
	@Autowired
	MemberRepository mr;
	@Autowired
	ChatMsgRepository cmr;

	@Override
	public void makeChatting(String userid, String target) throws IOException {
		// TODO Auto-generated method stub
		// 이미 채팅방이 있다면 return
		Room room = new Room();
		room.setContentUrl("");
		room.setChatOrder(0);
		rr.save(room);
		List<RoomMember> members = new ArrayList<>();
		RoomMember roomMember = new RoomMember();
		roomMember.setRoom(room);
		roomMember.setMember(mr.findById(userid).get());
		members.add(roomMember);
		rmr.save(roomMember);
		roomMember = new RoomMember();
		roomMember.setRoom(room);
		roomMember.setMember(mr.findById(target).get());
		rmr.save(roomMember);
		members.add(roomMember);
		List<String> refresh = new ArrayList<>();
		refresh.add(userid);
		refresh.add(target);
		sendRefreshMsg(refresh, "Chatting");

	}

	@Override
	public void sendRefreshMsg(List<String> ids, String dataType) throws IOException {
		// TODO Auto-generated method stub
		for (String id : ids) {
			SignalMessage msg = new SignalMessage();
			msg.setType("refresh");
			msg.setData(dataType);
			String sendMsg = objectMapper.writeValueAsString(msg);
			if (clients.get(id) == null) {
				continue;
			}
			clients.get(id).sendMessage(new TextMessage(sendMsg));
		}
	}

	@Override
	public void refreshAlarm(String targetid) throws IOException {
		// TODO Auto-generated method stub
		SignalMessage msg = new SignalMessage();
		msg.setType("alarm-Refresh");
		String sendMsg = objectMapper.writeValueAsString(msg);
		if (clients.get(targetid) == null) {
			return;
		}
		clients.get(targetid).sendMessage(new TextMessage(sendMsg));

	}

	@Override
	public void endChatting(String userid, int roomnumber) throws IOException {
		// TODO Auto-generated method stub
		RoomMemberPK rmpk = new RoomMemberPK();
		rmpk.setMember(userid);
		rmpk.setRoom(roomnumber);
		rmr.deleteById(rmpk);
		Room room = rr.findById(roomnumber).get();
		List<RoomMember> members = room.getRoomMembers();
		ArrayList<String> targets = new ArrayList<>();
		ArrayList<String> refresh = new ArrayList<>();
		refresh.add(userid);
		for (RoomMember member : members) {
			targets.add(member.getMember().getId());
		}
		ChatMsg cmsg = new ChatMsg();
		cmsg.setMsg(userid + "님이 채팅방을 나갔습니다.");
		cmsg.setRoom(rr.findById(roomnumber).get());
		cmr.save(cmsg);
		sendExitMsg(targets, userid, roomnumber);
		if (members.size() == 0) {
			rr.delete(room);
		}
	}

	@Override
	public void sendSystemhMsg(List<String> ids, String msgType, String dataType, int roomId) throws IOException {
		// TODO Auto-generated method stub
		for (String id : ids) {
			SignalMessage msg = new SignalMessage();
			msg.setType(msgType);
			msg.setData(dataType);
			msg.setRoomId(roomId);
			String sendMsg = objectMapper.writeValueAsString(msg);
			if (clients.get(id) == null) {
				continue;
			}
			clients.get(id).sendMessage(new TextMessage(sendMsg));
		}

	}

	@Override
	public void sendSystemhMsg(String id, String msgType, String dataType, int roomId) throws IOException {
		// TODO Auto-generated method stub
		SignalMessage msg = new SignalMessage();
		msg.setType(msgType);
		msg.setData(dataType);
		msg.setRoomId(roomId);
		String sendMsg = objectMapper.writeValueAsString(msg);
		clients.get(id).sendMessage(new TextMessage(sendMsg));
	}

	@Override
	public void joinChatMembers(int roomId, List<String> ids) throws IOException {
		// TODO Auto-generated method stub
		System.out.println("새로 참여하는 뉴비");
		System.out.println(ids);
		String msg = "";
		for (String id : ids) {
			msg += "," + id;
			RoomMember rMember = new RoomMember();
			rMember.setMember(mr.findById(id).get());
			rMember.setRoom(rr.findById(roomId).get());
			rmr.save(rMember);
		}
		Room room = rr.findById(roomId).get();
		List<RoomMember> rMembers = room.getRoomMembers();
		for (RoomMember exRMember : rMembers) {
			ids.add(exRMember.getMember().getId());
		}
		ChatMsg cmsg = new ChatMsg();
		cmsg.setMsg(msg.substring(1) + "님이 채팅에 참여하였습니다.");
		cmsg.setRoom(rr.findById(roomId).get());
		cmr.save(cmsg);
		sendJoinMsg(ids, msg.substring(1), roomId);
		sendRefreshMsg(ids, "Chatting");
	}

	@Override
	public void sendExitMsg(List<String> ids, String userid, int roomnumber) throws IOException {
		// TODO Auto-generated method stub
		for (String id : ids) {
			SignalMessage msg = new SignalMessage();
			msg.setType("chat-exit");
			msg.setData(userid + "님이 채팅방을 나갔습니다.");
			msg.setRoomId(roomnumber);
			String sendMsg = objectMapper.writeValueAsString(msg);
			if (clients.get(id) == null) {
				continue;
			}
			clients.get(id).sendMessage(new TextMessage(sendMsg));
		}
	}

	@Override
	public void sendJoinMsg(List<String> ids, String users, int roomnumber) throws IOException {
		// TODO Auto-generated method stub
		for (String id : ids) {
			System.out.println("참여자 : "+id);
			SignalMessage msg = new SignalMessage();
			msg.setType("chat-join");
			msg.setData(users + "님이 채팅에 참여하였습니다.");
			msg.setRoomId(roomnumber);
			String sendMsg = objectMapper.writeValueAsString(msg);
			if (clients.get(id) == null) {
				continue;
			}
			clients.get(id).sendMessage(new TextMessage(sendMsg));
		}
	}

	@Override
	public void changeRoomName(int roomId, String roomName, String userid) {
		// TODO Auto-generated method stub
		RoomMemberPK rmpk = new RoomMemberPK();
		rmpk.setMember(userid);
		rmpk.setRoom(roomId);
		RoomMember roomMember = rmr.findById(rmpk).get();
		roomMember.setRoomName(roomName);
		rmr.save(roomMember);
	}
}
