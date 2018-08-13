package org.team.sns.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.team.sns.domain.Member;
import org.team.sns.persistence.MemberRepository;
import org.team.sns.vo.RestMsgObject;

@RestController
@CrossOrigin(origins="*")
public class AccountController {
	@Autowired
	MemberRepository memberrepo;

	@GetMapping("/signup")
	public void signUp(String user_id, String password, String username, String nickname) {
		Member member = new Member();
		member.set_id(user_id);
		member.setPassword(password);
		member.setNickname(username);
		member.setUserName(nickname);
		memberrepo.save(member);
	}

	@GetMapping("/idCheck")
	public RestMsgObject idCheck(String user_id) {
		RestMsgObject rmo = new RestMsgObject();
		if (memberrepo.existsById(user_id)) {
			rmo.setMsg("fail");
			return rmo;
		} else {
			rmo.setMsg("success");
			return rmo;			
		}
	}

	@GetMapping("/delete")
	public void delete() {
		memberrepo.deleteById("PHJ");
	}

	@GetMapping("/search")
	public String search() {
		String result = "";
		result = memberrepo.getNickname("test");
		return result;
	}

}
