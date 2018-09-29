package org.team.sns.controller;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.team.sns.domain.Alarm;
import org.team.sns.domain.Member;
import org.team.sns.persistence.AlarmRepository;
import org.team.sns.persistence.MemberRepository;
import org.team.sns.service.AlarmService;
import org.team.sns.service.NetworkService;

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
	NetworkService ns;
	@Autowired
	MemberRepository mr;
	@Autowired
	AlarmService as;
	@Autowired
	AlarmRepository ar;
	
	@GetMapping("/requestFriend")
	public void requestFriend(Principal principal, String target) {
		System.out.println("친구추가들어옴");
		ns.friendRequest("testid", target);
		as.saveFriendRequest(target, "testid");
	}
	@GetMapping("/acceptFriend")
	public void acceptFriend(Principal principal, String target, String alarmId) {
		System.out.println("accept trying");
		System.out.println("testid"+"target:"+target);
		ns.acceptFriend("testid", target);
		Alarm alarm=ar.findById(Integer.parseInt(alarmId)).get();
		alarm.setChecked(true);
		ar.save(alarm);
		
		
	}
		
	@GetMapping("/getNetworks")
	public HashMap<String,List<Member>> getNetworks(Principal principal){
		HashMap<String,List<Member>> result = new HashMap<>();
		result.put("friendList", ns.getFriends(principal.getName()));
		result.put("friendRequest", ns.getFriendsRequest(principal.getName()));
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
	// 2.axios로 보낸 정보를 받아줄 Controller
	@GetMapping("/delFriend")
	public void delFriend(Principal principal, String target) {
		ns.delFriend("testid", target);
	}

}
