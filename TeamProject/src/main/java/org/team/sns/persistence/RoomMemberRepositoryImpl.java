package org.team.sns.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.team.sns.domain.QRoomMember;
import org.team.sns.domain.Room;
import org.team.sns.domain.RoomMember;

import com.querydsl.jpa.JPQLQuery;
/**
 * 
 * @author ParkHyeokJoon
 * @since 2018.09.13
 * @version 2018.09.13
 *
 */
public class RoomMemberRepositoryImpl extends QuerydslRepositorySupport implements RoomMemberRespositoryCustom{

	public RoomMemberRepositoryImpl() {
		super(RoomMember.class);
		// TODO Auto-generated constructor stub
	}

	@Override
	public List<Room> getRoomsByloginedUser(String username) {
		// TODO Auto-generated method stub
		QRoomMember rmember = QRoomMember.roomMember;
		JPQLQuery<Room> query = from(rmember).select(rmember.room);
		query.where(rmember.member.id.eq(username));
		return query.fetch();
	}

}
