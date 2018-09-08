package org.team.sns.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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
	
	@GetMapping("/members")
	public List<Member> test() {
		List<Member> list = new ArrayList<>();
		Iterable<Member> m = mr.findAll();
		for(Member member : m) {
			list.add(member);
		}
		return list;
	}
	
	
}
