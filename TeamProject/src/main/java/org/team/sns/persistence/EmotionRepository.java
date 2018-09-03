package org.team.sns.persistence;

import org.springframework.data.repository.CrudRepository;
import org.team.sns.domain.Board;
import org.team.sns.domain.EmotionExpression;
import org.team.sns.domain.Member;

public interface EmotionRepository extends CrudRepository<EmotionExpression, Integer>,EmotionRepositoryCustom{
	public EmotionExpression findByExpresserAndTargetBoard(Member expresser, Board targetboard);

}
