package org.team.sns.service;

import java.io.IOException;

import org.team.sns.domain.Board;

/**
 * @author Gil Joonsung
 * @since 2018.09.10
 * @version 2018.09.10
 *
 */

public interface AlarmService {
	public void savementionAlarms(Board board, String username) throws IOException;
	public boolean saveFriendRequest(String target, String username) ;

}
