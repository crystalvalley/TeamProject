package org.team.sns.persistence;

import org.springframework.data.repository.CrudRepository;
import org.team.sns.domain.Reply;


public interface ReplyRepository extends CrudRepository<Reply, String>,ReplyRepositoryCustom{

}