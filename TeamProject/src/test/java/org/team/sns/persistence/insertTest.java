package org.team.sns.persistence;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.team.sns.domain.CustomList;
import org.team.sns.domain.Member;
import org.team.sns.domain.ProductStrategy;
import org.team.sns.domain.StrTarget;
import org.team.sns.domain.Strategy;
import org.team.sns.service.MemberServiceImpl;
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
	@Autowired
	BoardRepository br;
	@Autowired
	CustomListRepository clr;
	@Autowired
	private ProductStrategyRepository pstr;
	@Autowired
	private StrategyRepository str;
	@Autowired
	MemberServiceImpl ms;
	@Autowired
	StrTargetRepository sttr;
	/*
	 *  board에 적당히 값 넣어두는  test
	@Test
	public void test() {
		for(int i=0;i<10;i++) {
			Board board = new Board();
			board.setTitle("제목"+i);
			board.setContent("내요요요요요옹"+i);
			board.setWriter(mr.findById("administrator").get());
			br.save(board);			
		}		
	}
	*/
	
	/*@Test
	public void newQueryTest() {
		System.out.println(br.getBoardsByTitle("5"));
	}*/
	
	@Test
	public void searchbycontentTest() {
		Member member = new Member();
		member.setId("testid");
		member.setPassword("12345678");
		member.setUsername("testman");
		member.setEmail("hamkegaja2@gmail.com");
		ms.signin(member);
		
		CustomList test = new CustomList();
		ProductStrategy testp = new ProductStrategy();
		Strategy tests = new Strategy();
		StrTarget target = new StrTarget();
		System.out.println(0);
		test.setOwner(mr.findById("testid").get());
		System.out.println(1);
		test.setListName("testTag");
		System.out.println(2);
		clr.save(test);
		System.out.println(3);
		testp.setOwnedCl(test);
		System.out.println(4);
		pstr.save(testp);
		System.out.println(5);
		tests.setOwned(testp);
		System.out.println(6);
		tests.setType("tag");
		System.out.println(7);
		str.save(tests);
		System.out.println(8);
		target.setOwned(tests);
		System.out.println(9);
		target.setTarget("test");
		System.out.println(10);
		sttr.save(target);
		System.out.println(11);
	}
}
