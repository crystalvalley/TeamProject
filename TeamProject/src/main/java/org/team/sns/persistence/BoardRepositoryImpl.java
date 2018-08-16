package org.team.sns.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.team.sns.domain.Board;
import org.team.sns.domain.QBoard;

import com.querydsl.jpa.JPQLQuery;

import lombok.extern.java.Log;

/**
 * 
 * @author ParkHyeokjoon
 * @since 18.08.12
 * @version 18.08.16
 *
 */
@Log
public class BoardRepositoryImpl extends QuerydslRepositorySupport implements BoardRepositoryCustom{

	public BoardRepositoryImpl() {
		super(Board.class);
		// TODO Auto-generated constructor stub
	}

	@Override
	public List<Board> getBoardsByUserId(String _id) {
		log.info("==========");
		log.info("user_id : " + _id);
		log.info("==========");
		QBoard board = QBoard.board;		
		// Query생성
		JPQLQuery<Board> boardQuery = from(board);
		// select board
		boardQuery.select(board);
		// 조건 : 작성자 id와 같음
		// 원소 하나 짜리 list안에 포함되어있냐랑 같음
		// .get(0)를 할 경우 쿼리를 하나 더 날리기 때문에 이걸로 처리
		boardQuery.where(board.writer.id.eq(_id));
		// 결과 받아오기
		List<Board> result = boardQuery.fetch();		
		return result;
	}

	@Override
	public List<Board> getBoardsByTitle(String  searchTitle) {
		// TODO Auto-generated method stub
		// 1. 찾을 대상의 QDomain을 가져옴
		// board를 찾을 거니까 QBoard를 가져옴
		QBoard board = QBoard.board;
		
		// 2. Query를 생성해주는 JPQLQuery 객체를 만듬
		// Board에 대한 쿼리니까 generic은 Board
		// from부터 설정
		// from boards
		JPQLQuery<Board> boardQuery = from(board);
		// select * from boards
		boardQuery.select(board);
		// QueryDSL에서는 where안의 조건이 참이면 반환
		// board의 title에 파라미터(검색어) title이 포함되어 있다면
		// select *  from boards b where b.title like %searchTitle% 
		boardQuery.where(board.title.contains(searchTitle));
		// 3. 쿼리 실행 후 result에 대입
		List<Board> result = boardQuery.fetch();
		// 4. result 반환
		return result;
	}
	
	
}
