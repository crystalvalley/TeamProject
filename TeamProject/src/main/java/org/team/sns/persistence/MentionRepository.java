package org.team.sns.persistence;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.team.sns.domain.Board;
import org.team.sns.domain.Member;
import org.team.sns.domain.Mention;
import org.team.sns.domain.MentionPK;

/**
 * 
 * @author ParkHyeokJoon
 * @since 2018.08.30
 * @version 2018.08.30
 *
 */
public interface MentionRepository extends CrudRepository<Mention, MentionPK>{
	public List<Mention> findByMentioned(Member member);
	public List<Mention> findByMentionBoard(Board board);
}
