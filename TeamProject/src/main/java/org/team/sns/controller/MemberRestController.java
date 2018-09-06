package org.team.sns.controller;

import java.util.ArrayList;
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
public class MemberRestController {

	@Autowired
	private MemberRepository mr;

	@GetMapping("/getMembers2")
	public String getMembers22(){
		List<Member> list = new ArrayList<>();
		Iterable<Member> m = mr.findAll();
		for(Member member : m) {
			list.add(member);
		}
		System.out.println(list);
		return "돼냐";
	}
	
	
}
