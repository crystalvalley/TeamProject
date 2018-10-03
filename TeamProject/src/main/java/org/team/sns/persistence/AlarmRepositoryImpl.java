package org.team.sns.persistence;

import java.util.List;

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
		System.out.println("여기 들어와서 어쩔건데?");
		return true;
	}

	public List<Alarm> requestAlarms(String userid) {
		QAlarm alarm = QAlarm.alarm;
		JPQLQuery<Alarm> alarmQuery = from(alarm);
		alarmQuery.select(alarm);
		alarmQuery.where(alarm.receiver_id.eq(mr.findById(userid).get()));
		alarmQuery.where(alarm.checked.eq(false));
		List<Alarm> result  = alarmQuery.fetch();
		System.out.println("리시버의 id:"+alarm.receiver_id);
		System.out.println("찾아온 결과:"+result);
		return result;
		/*System.out.println("result!!!!!!!!!!!"+result);
		for(int i=0;i<result.size();i++) {
			System.out.println("제발 아뒤 불러와::::"+result.get(i).getReceiver_id().getId());
		}*/
	}
	
	
}
