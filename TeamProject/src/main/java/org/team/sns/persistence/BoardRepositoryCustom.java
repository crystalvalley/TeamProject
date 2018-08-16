package org.team.sns.persistence;

import java.util.List;

import org.team.sns.domain.Board;

/**
 * 
 * @author ParkHyeokjoon
 * @since 18.08.12
 * @version 18.08.12
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
}
