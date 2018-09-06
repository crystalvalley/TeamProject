package org.team.sns.persistence;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.team.sns.domain.QReply;
import org.team.sns.domain.Reply;

import com.querydsl.jpa.JPQLQuery;
import lombok.extern.java.Log;

/**
 * @author Cha MinJu
 * @since 18.09.06
 * @version 18.09.06
 * 
 * */


@Log
public class ReplyRepositorympl extends QuerydslRepositorySupport implements ReplyRepositoryCustom {

	@Autowired
	ReplyRepository rr;
	@Autowired
	TagRepository tr;
	
	public ReplyRepositorympl() {
		super(Reply.class);
		// TODO Auto-generated constructor stub
	}
	
	/**
	 * @author Cha MinJu
	 * @since 18.09.06
	 * @version 18.09.06
	 * 
	 * */
	
	@Override
	public List<Reply> getReplysByBoardId(int boardnum) {
		// TODO Auto-generated method stub
		
		QReply reply = QReply.reply;
		
		JPQLQuery<Reply> replyQuery = from(reply);
		
		replyQuery.select(reply);
		
		replyQuery.where(reply.board.id.gt(boardnum));
		List<Reply> result = replyQuery.fetch();
		return result;
	}

}