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
	public void refreshAlarm(String targetid) throws IOException;
}
