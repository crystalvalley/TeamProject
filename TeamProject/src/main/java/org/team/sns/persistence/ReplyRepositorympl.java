package org.team.sns.persistence;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.team.sns.domain.Reply;

/*
 * @author Cha MinJu
 * @since 18.09.06
 * @version 18.09.06
 * 
 * */



public class ReplyRepositorympl extends QuerydslRepositorySupport implements ReplyRepositoryCustom{

	@Autowired
	ReplyRepository rr;
	
	
	public ReplyRepositorympl() {
		super(Reply.class);
		// TODO Auto-generated constructor stub
	}

	
	
	
}