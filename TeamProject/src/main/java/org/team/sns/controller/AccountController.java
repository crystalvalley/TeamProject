package org.team.sns.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.team.sns.domain.Member;
import org.team.sns.persistence.MemberRepository;

@RestController
public class AccountController {
	@Autowired
	MemberRepository memberrepo;
	
	@GetMapping("/signup")
	public void signUp(String id, String pw) {
		Member member = new Member();
		member.set_id(id);
		member.setPassword(pw);
		member.setNickname("PHJ");
		member.setUserName("PHJ");
		memberrepo.save(member);
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
