package org.team.sns.persistence;

import java.security.Principal;
import java.util.List;

import org.team.sns.domain.Alarm;

/**
 * 
 * @author Gil Joonsung
 * @Since 18.09.10
 * @version 18.09.10
 *
 */


public interface AlarmRepositoryCustom{
	public boolean setAlarms(Alarm alarm);
	public List<Alarm> requestAlarms(String username);
}
