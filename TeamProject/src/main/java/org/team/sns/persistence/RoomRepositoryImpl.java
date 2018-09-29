package org.team.sns.persistence;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.team.sns.domain.Room;
/**
 * 
 * @author ParkHyeokJoon
 * @since 2018.09.13
 * @version 2018.09.29
 *
 */
public class RoomRepositoryImpl extends QuerydslRepositorySupport implements RoomRepositoryCustom{
	
	@Autowired
	MemberRepository mr;
	
	public RoomRepositoryImpl() {
		super(Room.class);
		// TODO Auto-generated constructor stub
	}
}
