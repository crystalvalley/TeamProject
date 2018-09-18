package org.team.sns.persistence;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.team.sns.domain.Member;
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
	@Autowired
	RoomRepository rr;
	@Autowired
	RoomMemberRepository rmr;

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
		Member member2 = new Member();
		member2.setId("testid");
		member2.setPassword("12345678");
		member2.setEmail("test@gmail.com");
		member2.setUsername("testman");
		sus.createUser(member2);
		ms.signup(member2);
		for (int i = 1; i < 5; i++) {
			Member member = new Member();
			member.setId("testid" + i);
			member.setPassword("12345678");
			member.setEmail("test@gmail.com");
			member.setUsername("testman" + i);
			sus.createUser(member);
			ms.signup(member);
		}
		ns.friendRequest("testid", "kmj1");
		ns.friendRequest("testid", "kmj2");
		ns.friendRequest("testid", "kmj3");
		ns.friendRequest("testid", "kmj4");
		ns.acceptFriend("kmj1", "testid");
		ns.acceptFriend("kmj2", "testid");
		ns.acceptFriend("kmj3", "testid");
		ns.acceptFriend("kmj4", "testid");
	}
}
