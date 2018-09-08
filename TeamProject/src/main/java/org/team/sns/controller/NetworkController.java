package org.team.sns.controller;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.team.sns.service.NetworkServiceImpl;

/**
 * @author ParkHyeokJoon
 * @since 2018.09.08
 * @version 2018.09.08
 *
 */
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/networks")
public class NetworkController {
	@Autowired
	NetworkServiceImpl ns;
	
	@GetMapping("/requestFriend")
	public void requestFrien(Principal principal, String target) {
		ns.friendRequest("testid", target);
	}
	
	@GetMapping("/getNetworks")
	public HashMap<String,Object> getNetworks(Principal principal){
		HashMap<String,Object> result = new HashMap<>();
		result.put("friendList", ns.getFriends("testid"));
		result.put("friendRequest", ns.getFriendsRequest("testid"));
		return result;
	}

}
