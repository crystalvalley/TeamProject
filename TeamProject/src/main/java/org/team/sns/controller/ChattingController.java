package org.team.sns.controller;

import java.io.IOException;
import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.team.sns.domain.Room;
import org.team.sns.persistence.RoomRepository;
/**
 * 
 * @author ParkHyeokJoon
 * @since 2018.09.19
 * @version 2018.09.19
 *
 */
import org.team.sns.service.SocketService;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/chattings")
public class ChattingController {
	@Autowired
	SocketService ss;
	@Autowired
	RoomRepository rr;

	@GetMapping("/make")
	public void makeChat(Principal principal, String target) throws IOException {
		ss.makeChatting(principal.getName(), target);
	}

	@GetMapping("/end")
	public void endChat(Principal principal, int roomnumber) throws IOException {
		ss.endChatting(principal.getName(), roomnumber);
	}

	@GetMapping("/changeRoomName")
	public void changeRoomName(int roomId, String roomName,Principal principal) {
		ss.changeRoomName(roomId, roomName, principal.getName());
	}

	@PostMapping("/newMembers")
	public void newMembers(@RequestBody String payload) throws JsonParseException, JsonMappingException, IOException {
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> map = new HashMap<>();
		map = mapper.readValue(payload, new TypeReference<Map<String, Object>>() {});
		int roomId = (int) map.get("roomId");
		List<String> ids = (List<String>) map.get("newMembers");
		ss.joinChatMembers(roomId, ids);

	}
}
