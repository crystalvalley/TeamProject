package org.team.sns.persistence;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.team.sns.domain.QRoom;
import org.team.sns.domain.QRoomMember;
import org.team.sns.domain.Room;
import org.team.sns.domain.RoomMember;

import com.querydsl.jpa.JPQLQuery;
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

	@Override
	public Room getRoomByRoomMember(String[] users) {
		// TODO Auto-generated method stub
		QRoom room = QRoom.room;
		QRoomMember rMember = QRoomMember.roomMember;
		JPQLQuery<Room> query = from(room,rMember).select(room);
		JPQLQuery<RoomMember> subQuery = from(rMember);
		for(String user : users) {
			subQuery.where(rMember.member.id.eq(user));
			subQuery.where(rMember.room.eq(room));
			query.where(room.roomMembers.contains(subQuery));
		}
		return query.fetchOne();
	}


}
