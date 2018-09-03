package org.team.sns.persistence;

import java.util.List;

import org.team.sns.domain.Board;
import org.team.sns.domain.Member;
/**
 * 
 * @author ParkHyeokJoon
 * @since 2018.09.03
 * @version 2018.09.03
 *
 */
public interface EmotionRepositoryCustom {
	public List<Integer> getEmotions(Board board,Member member);

}
