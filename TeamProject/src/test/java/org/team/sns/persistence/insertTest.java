package org.team.sns.persistence;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.team.sns.domain.Room;
import org.team.sns.domain.RoomMember;
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
		Room room = new Room();
		room.setContentUrl("");
		room.setChatOrder(0);
		rr.save(room);
		RoomMember rmember = new RoomMember();
		rmember.setMember(mr.findById("testid").get());
		rmember.setRoom(room);
		rmr.save(rmember);
		RoomMember rmember2 = new RoomMember();
		rmember2.setMember(mr.findById("testid1").get());
		rmember2.setRoom(room);
		rmr.save(rmember2);
		
	}
}
