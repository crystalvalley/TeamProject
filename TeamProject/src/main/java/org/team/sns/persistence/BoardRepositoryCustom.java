package org.team.sns.persistence;

import java.util.List;

import org.team.sns.domain.Board;

/**
 * 
 * @author ParkHyeokjoon
 * @since 18.08.12
 * @version 18.08.12
 *
 */
public interface BoardRepositoryCustom {
	public List<Board> getBoardsByUserId(String _id);
}
