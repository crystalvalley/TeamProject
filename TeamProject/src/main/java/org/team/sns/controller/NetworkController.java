package org.team.sns.controller;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.team.sns.domain.Member;
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
	public void requestFriend(Principal principal, String target) {
		System.out.println("친구추가들어옴");
		ns.friendRequest("testid", target);
	}
	
	@GetMapping("/delFriend")
	public void delFreind(Principal principal, String target) {
		ns.delFriend("testid", target);
	}
	
	@GetMapping("/getNetworks")
	public HashMap<String,List<Member>> getNetworks(Principal principal){
		HashMap<String,List<Member>> result = new HashMap<>();
		result.put("friendList", ns.getFriends("testid"));
		result.put("friendRequest", ns.getFriendsRequest("testid"));
		return result;
	}
	
	@GetMapping("/addFollow")
	public void addFollow(Principal principal, String target) {
		ns.addFollow("testid", target);
	}
	@GetMapping("/delFollow")
	public void delFollow(Principal principal, String target) {
		ns.delFollow("testid", target);
	}
	@GetMapping("/addBlock")
	public void addBlock(Principal principal, String target) {
		ns.addBlock("testid", target);
	}

}
