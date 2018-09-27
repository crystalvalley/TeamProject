package org.team.sns.service;

import java.security.Principal;

import org.team.sns.domain.Alarm;
import org.team.sns.domain.Board;

/**
 * @author Gil Joonsung
 * @since 2018.09.10
 * @version 2018.09.10
 *
 */

public interface AlarmService {
	public void savementionAlarms(Board board, Principal principal);
	public boolean saveFriendRequest(String target, Principal principal) ;

}
