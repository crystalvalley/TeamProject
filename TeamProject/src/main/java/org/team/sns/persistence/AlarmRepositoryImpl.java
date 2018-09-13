package org.team.sns.persistence;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.team.sns.domain.Alarm;
import org.team.sns.domain.QAlarm;

import com.querydsl.jpa.JPQLQuery;

/**
 * 
 * @author Gil Joonsung
 * @since 18.09.10
 * @version 18.09.10
 *
 */


public class AlarmRepositoryImpl extends QuerydslRepositorySupport implements AlarmRepositoryCustom{

	@Autowired
	MemberRepository mr;
	
	
	public AlarmRepositoryImpl() {
		super(Alarm.class);
		// TODO Auto-generated constructor stub
	}

	@Override
	public boolean setAlarms(Alarm alarm) {
		
		QAlarm qalarm = QAlarm.alarm;
		JPQLQuery<Alarm> alarmQuery = from(alarm);
		alarmQuery.
		
		return false;
	}

	
	
	
}
