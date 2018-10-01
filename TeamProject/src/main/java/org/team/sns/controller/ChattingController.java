package org.team.sns.controller;

import java.io.IOException;
import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
/**
 * 
 * @author ParkHyeokJoon
 * @since 2018.09.19
 * @version 2018.09.19
 *
 */
import org.team.sns.service.SocketService;
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/chattings")
public class ChattingController {
	@Autowired
	SocketService ss;
	
	@GetMapping("/make")
	public void makeChat(Principal principal,String target) throws IOException {
		ss.makeChatting(principal.getName(), target);
	}
	
	@GetMapping("/end")
	public void endChat(Principal principal,int roomnumber) throws IOException {
		ss.endChatting(principal.getName(), roomnumber);
	}
}
