package org.team.sns.service;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.team.sns.domain.Alarm;
import org.team.sns.domain.Board;
import org.team.sns.domain.Member;
import org.team.sns.domain.Mention;
import org.team.sns.persistence.AlarmRepository;
import org.team.sns.persistence.MemberRepository;

/**
 * @author Gil Joonsung
 * @since 2018.09.10
 * @version 2018.09.10
 *
 */

@Service
public class AlarmServiceImpl implements AlarmService {

	@Autowired
	AlarmRepository ar;
	@Autowired
	MemberRepository mr;

	@Override
	public void savementionAlarms(Board board, Principal principal) {
		List<Mention> list = board.getMentions();
		for (int i = 0; i < list.size(); i++) {
			Alarm arm = new Alarm();
			Optional<Member> actor = mr.findById(principal.getName());
			arm.setActor_id(actor.get());
			arm.setReceiver_id(list.get(i).getMentioned());
			arm.setMentioned(true);
			ar.save(arm);
		}

	}

	@Override
	public boolean saveFriendRequest(String target, Principal principal) {
		Alarm alarm = new Alarm();
		Member actor = mr.findById(principal.getName()).get();
		alarm.setActor_id(actor);
		alarm.setReceiver_id(mr.findById(target).get());
		alarm.setReqFriendship(true);
		ar.save(alarm);
		System.out.println("알람 만들어진거봅시다.");
		return true;
		
	}
}
