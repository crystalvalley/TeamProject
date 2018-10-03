package org.team.sns.persistence;

import org.springframework.data.repository.CrudRepository;
import org.team.sns.domain.ChatMsg;

public interface ChatMsgRepository extends CrudRepository<ChatMsg, Integer>,ChatMsgRepositoryCustom{

}
