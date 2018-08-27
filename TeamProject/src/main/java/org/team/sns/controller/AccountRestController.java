package org.team.sns.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.team.sns.domain.Member;
import org.team.sns.persistence.MemberRepository;
import org.team.sns.service.SecurityUserServiceImpl;
import org.team.sns.vo.RestMsgObject;

/**
 * @author ParkHyeokJoon
 * @since 2018.08.14
 * @version 2018.08.21
 *
 */
@RestController
@CrossOrigin(origins = "*")
public class AccountRestController {
	@Autowired
	MemberRepository memberrepo;
	@Autowired
	SecurityUserServiceImpl secUserService;
	@GetMapping("/idCheck")
	public RestMsgObject idCheck(String _id) {
		RestMsgObject rmo = new RestMsgObject();
		if (memberrepo.existsById(_id)) {
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

	@PostMapping("/signup")
	public void signUp(Member member) {
		secUserService.createUser(member);
	}

	@PostMapping("/loginCheck")
	public RestMsgObject loginCheck(Principal principal) {
		RestMsgObject msg = new RestMsgObject();
		if(principal!=null) {
			msg.setMsg(principal.getName());	
		}else {
			msg.setMsg("Not Logined");		
		}
		return msg;
	}

	/*
	@PostMapping("/signin")
	public AuthToken signin(String userid, String password,HttpSession sess) {
		System.out.println("input value-------------------");
		System.out.println(memberrepo.findById(userid).get());
		System.out.println(userid);
		System.out.println(password);
		UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(userid, password);
				SecurityContextHolder.getContext().setAuthentication(auth); 
		sess.setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, SecurityContextHolder.getContext());
		return new AuthToken(userid,"USER",sess.getId());

	}*/
}
