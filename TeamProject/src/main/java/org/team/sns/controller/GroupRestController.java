package org.team.sns.controller;

import java.security.Principal;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.team.sns.domain.Group;
import org.team.sns.domain.Member;
import org.team.sns.persistence.GroupRepository;
import org.team.sns.persistence.MemberRepository;
import org.team.sns.vo.RestMsgObject;

/**
 * @author JoonsungGil
 * @since 2018.09.06
 * @version 2018.09.06
 *
 */
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/groups")
public class GroupRestController {
	@Autowired
	private MemberRepository mr;
	@Autowired
	private GroupRepository gr;

	

	

	@PostMapping("/createGroup")
	public void createGroup(Group group, Principal principal) {
		System.out.println("그룹 만들기 시도는 했네?");
		System.out.println(group.toString());
		Optional<Member> member = mr.findById(group.getGroupMaster().getId());
		group.setGroupMaster(member.get());
		gr.save(group);
		
		
	}

	@GetMapping("/nameValid")
	public RestMsgObject idCheck(String _id) {
		System.out.println("name valid는 했네?");
		RestMsgObject rmo = new RestMsgObject();
		if (gr.existsById(_id)) {
			rmo.setMsg("fail");
			return rmo;
		} else {
			rmo.setMsg("success");
			return rmo;
		}
		
	}

	
	
}
