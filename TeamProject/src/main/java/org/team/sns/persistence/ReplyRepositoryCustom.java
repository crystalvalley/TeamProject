package org.team.sns.persistence;

import java.util.List;

import org.team.sns.domain.Reply;

/*
 * @author Cha MinJu
 * @since 18.09.06
 * @version 18.09.06
 * 
 * */



public interface ReplyRepositoryCustom {
	
	// 보드 넘버로 댓글 리스트 불러오기
	public List<Reply> getReplysByBoardId(int boardnum);
	
	
}