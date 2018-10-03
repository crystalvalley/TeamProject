package org.team.sns.service;

import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Service;

/**
 * 
 * @author ParkHyeokJoon
 * @since 2018.09.19
 * @version 2018.09.19
 *
 */
@Service
public interface SocketService {
	public void makeChatting(String userid, String target) throws IOException;

	public void sendRefreshMsg(List<String> ids, String dataType) throws IOException;

	public void sendSystemhMsg(List<String> ids, String msgType, String dataType, int roomId) throws IOException;

	public void sendSystemhMsg(String id, String msgType, String dataType, int roomId) throws IOException;

	public void refreshAlarm(String targetid) throws IOException;

	public void sendExitMsg(List<String> ids, String userid, int roomnumber) throws IOException;

	public void endChatting(String userid, int roomnumber) throws IOException;

	public void joinChatMembers(int roomId, List<String> ids) throws IOException;

	public void changeRoomName(int roomId, String roomName, String userid);
}
