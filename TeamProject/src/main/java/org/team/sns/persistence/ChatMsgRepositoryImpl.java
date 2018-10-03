package org.team.sns.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.team.sns.domain.ChatMsg;
import org.team.sns.domain.QChatMsg;

import com.querydsl.jpa.JPQLQuery;

public class ChatMsgRepositoryImpl extends QuerydslRepositorySupport implements ChatMsgRepositoryCustom{

	public ChatMsgRepositoryImpl() {
		super(ChatMsg.class);
		// TODO Auto-generated constructor stub
	}

	@Override
	public List<ChatMsg> getChattingLog(int roomId) {
		// TODO Auto-generated method stub
		QChatMsg chatMsg = QChatMsg.chatMsg;
		JPQLQuery<ChatMsg> query = from(chatMsg);
		query.where(chatMsg.room.roomId.eq(roomId));
		query.orderBy(chatMsg.id.asc());
		return query.fetch();
	}
	

}
