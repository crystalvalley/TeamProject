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
 * @version 18.08.12
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
}
