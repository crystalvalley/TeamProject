package org.team.sns.persistence;

import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;
import org.springframework.test.context.junit4.SpringRunner;
/**
 * 
 * @author ParkHyeokjoon
 * @since 2018.08.12
 * @version 2018.08.12
 *
 */
@RunWith(SpringRunner.class)
@SpringBootTest
@Commit
public class MemberRepoTest {
	@Autowired
	MemberRepository memberRepo;
	@Autowired
	BoardRepository boardRepo;
	/*
	@Test
	public void testInsertMembers() {
		for(int i=1;i<5;i++) {
			Member member = new Member();
			member.set_id("testid"+i);
			member.setPassword("testpw"+i);
			member.setNickname("testnickname"+i);
			member.setUserName("tester"+i);
			memberRepo.save(member);
		}
	}*/
	
	/*
	@Test
	public void testSelectMember() {
		Iterable<Member> results =  memberRepo.findAll();
		results.forEach(member -> System.out.println(member));
	}
	*/
	/*
	@Test
	@Transactional
	public void testSelectBoards() {
		Board board = new Board();
		board.setTitle("title1");
		board.setContent("content1");
		board.setWriter(memberRepo.findById("testid1").get());
		boardRepo.save(board);
		Member member = memberRepo.findById("testid1").get();
		System.out.println(member.getBoards()+"??");
	}
	*/
	/*
	@Test
	public void testDeleteMember() {
		List<Board> test = boardRepo.getBoardsByUserId("testid1");
		System.out.println("잘되냐");
		System.out.println(test);
	}*/
}
