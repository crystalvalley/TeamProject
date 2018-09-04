package org.team.sns.persistence;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.team.sns.domain.Board;
import org.team.sns.domain.Favorites;
import org.team.sns.domain.Networking;
import org.team.sns.domain.ProductStrategy;
import org.team.sns.domain.Reply;

/**
 * 
 * @author ParkHyeokjoon
 * @since 18.08.12
 * @version 18.08.31
 *
 */
public interface BoardRepositoryCustom {
	public List<Board> getBoardsByUserId(String _id);	
	public List<Board> getBoardsByTitle(String title);
	
	//Gil 내용으로 찾기
	public List<Board> getBoardByContent(String content);
	
	//일단 type 정해지기전까지 보류
	//public List<Board> getBoardAuthority(String type);
	
	public List<Board> getBoardByHitCount(int number); 
	

	// 리플객체들로 게시글 검색
	public List<Board> getBoardByReply(String searchWord);

	// 리플 내용으로 리스트를 받아온다
	public List<Reply> getReplyByContent(String content);

	// userid로 그 유저가 가지고 있는 이웃을 받아온다.
	public List<Networking> getMembersByUserId(String _id);

	// 유저가 가지고 있는 이웃을 받아와 그 이웃의 타입별로 뿌려준다.
	public List<Board> getUserTypeByBoard(String _id, String type);

	// 유저가 가지고 있는 즐겨찾기 목록을 가져온다.
	public List<Favorites> getUserByFavorites(String _id);

	// 유저 아이디로 즐겨찾기 목록에 있는 보드를 받아온다.
	public List<Board> getFavoritesByBoard(String _id);

	// 이건 수정필요
	public List<Board> getShareByMember(String type);
	
	//메인을 만들어 보쟝
	public List<Board> getUserAllBoard(String _id);
	
	// 식별방법에 따라 찾기
	public List<Board> getBoardByCondition(List<ProductStrategy> pstr,int page);
	
	//제목 내용 검색
	public List<Board> getBoardByKeyword(String keyword);
	//HashTag 검색
	public List<Board> getBoardByHashTag(String keyword);
	//Mention 검색
	public List<Board> getBoardByMention(String keyword);
	
}
