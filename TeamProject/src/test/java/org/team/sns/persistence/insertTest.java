package org.team.sns.persistence;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.team.sns.domain.Board;
import org.team.sns.domain.CustomListPK;
import org.team.sns.domain.Member;
import org.team.sns.domain.NetworkingPK;
import org.team.sns.service.BoardService;
import org.team.sns.service.MemberServiceImpl;
import org.team.sns.service.NetworkServiceImpl;
import org.team.sns.service.SecurityUserService;

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
	EmotionRepository er;
	@Autowired
	private ProductStrategyRepository pstr;
	@Autowired
	private StrategyRepository str;
	@Autowired
	MemberServiceImpl ms;
	@Autowired
	SecurityUserService sus;
	@Autowired
	BoardService bs;
	@Autowired
	NetworkServiceImpl ns;

	/*
	 * board에 적당히 값 넣어두는 test
	 * 
	 * @Test public void test() { for(int i=0;i<10;i++) { Board board = new Board();
	 * board.setTitle("제목"+i); board.setContent("내요요요요요옹"+i);
	 * board.setWriter(mr.findById("administrator").get()); br.save(board); } }
	 */

	/*
	 * @Test public void newQueryTest() {
	 * System.out.println(br.getBoardsByTitle("5")); }
	 */

	@Test
	public void searchbycontentTest() {
		for(int i=0;i<5;i++) {
			Member member = new Member();
			member.setId("testid"+i);
			member.setPassword("12345678");
			member.setEmail("test@gmail.com");
			member.setUsername("testman"+i);
			sus.createUser(member);
			ms.signup(member);			
		}
		ns.friendRequest("testid", "testid1");
		ns.friendRequest("testid", "testid2");
		ns.friendRequest("testid", "testid3");
		ns.friendRequest("testid", "testid4");
		ns.acceptFriend("testid1", "testid");
		ns.acceptFriend("testid2", "testid");
		ns.acceptFriend("testid3", "testid");
		ns.acceptFriend("testid4", "testid");
	}
}
