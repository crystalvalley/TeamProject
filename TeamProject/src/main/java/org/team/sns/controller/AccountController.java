package org.team.sns.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.team.sns.domain.Member;
import org.team.sns.persistence.MemberRepository;

/**
 * @author ParkHyeokJoon
 * @since 2018.08.14
 * @version 2018.08.14
 */
@Controller
@CrossOrigin(origins="*")
public class AccountController {
	@Autowired
	MemberRepository memberrepo;

	@PostMapping("/signup")
	public String signUp(Member member) {
		// 이미 유효성처리가 끝난 상태이므로 바로 저장
		memberrepo.save(member);
		return "index";
	}
	@GetMapping("/")
	public String goHome() {
		return "index";
	}
}