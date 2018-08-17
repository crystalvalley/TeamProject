package org.team.sns.persistence;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.team.sns.domain.Board;
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
		System.out.println("출력결과"+br.getBoardByHitCount(5));
	}
}
