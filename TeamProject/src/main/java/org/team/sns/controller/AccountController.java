package org.team.sns.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.team.sns.domain.Member;
import org.team.sns.persistence.MemberRepository;
import org.team.sns.vo.RestMsgObject;

/**
 * @author ParkHyeokJoon
 * @since 2018.08.14
 * @version 2018.08.14
 */
public class AccountController {
	@Autowired
	MemberRepository memberrepo;

	@GetMapping("/signup")
	public RestMsgObject signUp(Member member) {
		RestMsgObject rmo = new RestMsgObject();
		// 이미 유효성처리가 끝난 상태이므로 바로 저장
		memberrepo.save(member);
		return rmo;
	}

}
