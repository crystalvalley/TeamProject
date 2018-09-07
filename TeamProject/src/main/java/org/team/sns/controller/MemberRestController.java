package org.team.sns.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.team.sns.domain.Member;
import org.team.sns.persistence.MemberRepository;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/members")
public class MemberRestController{
	@Autowired
	MemberRepository mr;
	
	
	@GetMapping("/getAllMembers")
	public List<Member> getAllMembers() {
		System.out.println("컨트롤러는 들어오나");
		//List<Member> result = mr.getAllMembers();
		return null; //result;
	}
}
	
	