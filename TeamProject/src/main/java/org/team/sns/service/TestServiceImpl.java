package org.team.sns.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.team.sns.domain.Member;
import org.team.sns.persistence.MemberRepository;

@Service
public class TestServiceImpl implements TestService{

	@Autowired
	MemberRepository mr;
	
	@Override
	public void test(String id, String pw, String email, String name) {
		// TODO Auto-generated method stub
		Member member =  new Member();
		member.setId(id);
		member.setPassword(pw);
		member.setEmail(email);
		member.setUsername(name);
		if(mr.existsById(id)) {
			return;
		}else {
			mr.save(member);
		}
	}

}
