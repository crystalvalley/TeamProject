package org.team.sns.controller;

import java.io.IOException;
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
import org.team.sns.service.SocketService;

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
	@Autowired
	SocketService ss;
	
	@GetMapping("/requestFriend")
	public void requestFriend(Principal principal, String target) {
		System.out.println("친구추가들어옴");
		ns.friendRequest("crystalvalley", target);
		as.saveFriendRequest(target, "crystalvalley");
		
		try {
			ss.refreshAlarm(target);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	@GetMapping("/acceptFriend")
	public void acceptFriend(Principal principal, String target, String alarmId) {
		System.out.println("accept trying");
		System.out.println("crystalvalley"+"target:"+target);
		ns.acceptFriend("crystalvalley", target);
		Alarm alarm=ar.findById(Integer.parseInt(alarmId)).get();
		alarm.setChecked(true);
		try {
			ss.refreshAlarm(alarm.getReceiver_id().getId());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		ar.save(alarm);
		
		
	}
		
	@GetMapping("/getNetworks")
	public HashMap<String,List<Member>> getNetworks(Principal principal){
		HashMap<String,List<Member>> result = new HashMap<>();
		result.put("friendList", ns.getFriends("crystalvalley"));
		result.put("friendRequest", ns.getFriendsRequest("crystalvalley"));
		return result;
	}
	
	@GetMapping("/addFollow")
	public void addFollow(Principal principal, String target) {
		ns.addFollow("crystalvalley", target);
	}
	
	@GetMapping("/delFollow")
	public void delFollow(Principal principal, String target) {
		ns.delFollow("crystalvalley", target);
	}
	
	@GetMapping("/addBlock")
	public void addBlock(Principal principal, String target) {
		ns.addBlock("crystalvalley", target);
	}
	// 2.axios로 보낸 정보를 받아줄 Controller
	@GetMapping("/delFriend")
	public void delFriend(Principal principal, String target) {
		ns.delFriend("crystalvalley", target);
	}

}
