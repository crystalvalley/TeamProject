package org.team.sns.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.team.sns.domain.Board;
import org.team.sns.domain.Member;
/**
 * @author ParkHyeokjoon
 * @since 18.08.12
 * @version 18.08.12
 *
 */
public interface MemberRepository extends CrudRepository<Member, String>,MemberRepositoryCustom{
	@Query(value="select m.boards from Member m where m.id = :id")
	public List<Board> findBoards(@Param("id")String _id);
}
