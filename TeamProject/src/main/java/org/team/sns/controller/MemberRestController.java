package org.team.sns.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.team.sns.domain.Member;
import org.team.sns.persistence.MemberRepository;
import org.team.sns.persistence.TagRepository;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/members")
public class MemberRestController {

	@Autowired
	private MemberRepository mr;
	@Autowired
	private TagRepository tr;
	
	@GetMapping("/members")
	public Map<String,Object> getMembers() {
		Map<String,Object> result = new HashMap<>();
		List<Member> list = new ArrayList<>();
		Iterable<Member> m = mr.findAll();
		for(Member member : m) {
			list.add(member);
			result.put(member.getId(), tr.getTagPercent(member.getId()));
		}
		result.put("memberlist", list);
		return result;
	}
}
