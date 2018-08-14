package org.team.sns.persistence;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.team.sns.domain.Member;
/**
 * 
 * @author ParkHyeokJoon
 * @since 2018.08.14
 * @version 2018.08.14
 *
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class insertTest {
	@Autowired
	MemberRepository mr;
	
	@Test
	public void test() {
	}
}
