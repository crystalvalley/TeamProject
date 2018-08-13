package org.team.sns.persistence;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.team.sns.domain.Member;

@RunWith(SpringRunner.class)
@SpringBootTest
public class insertTest {
	@Autowired
	MemberRepository mr;
	
	@Test
	public void test() {
		for(int i=0;i<50;i++) {
			Member member = new Member();
			member.set_id("testid"+i);
			member.setPassword("testid"+i);
			member.setNickname("testid"+i);
			member.setUserName("testid"+i);
			mr.save(member);			
		}
	}
}
