package org.team.sns.persistence;

import java.util.List;

import org.team.sns.domain.ChatMsg;

public interface ChatMsgRepositoryCustom{
	public List<ChatMsg> getChattingLog(int roomId);

}
