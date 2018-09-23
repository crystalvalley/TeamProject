package org.team.sns.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.team.sns.domain.Room;
import org.team.sns.domain.RoomMember;
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
public class SocketServiceImpl implements SocketService{
	private ObjectMapper objectMapper = new ObjectMapper();
	private Map<String, WebSocketSession> clients = ClientSockets.CLIENTS;
	@Autowired
	RoomMemberRepository rmr;
	@Autowired
	RoomRepository rr;
	@Autowired
	MemberRepository mr;
	@Override
	public void makeChatting(String userid, String target) throws IOException {
		// TODO Auto-generated method stub
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
		sendRefreshMsg(refresh,"Chatting");
		
	}

	@Override
	public void sendRefreshMsg(List<String> ids,String dataType) throws IOException {
		// TODO Auto-generated method stub
		for(String id : ids) {
			SignalMessage msg = new SignalMessage();
			msg.setType("refresh");
			msg.setData(dataType);
			String sendMsg = objectMapper.writeValueAsString(msg);
			clients.get(id).sendMessage(new TextMessage(sendMsg));
		}
	}
}
