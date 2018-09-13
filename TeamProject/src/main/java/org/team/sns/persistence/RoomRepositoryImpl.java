package org.team.sns.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.team.sns.domain.QRoom;
import org.team.sns.domain.Room;

import com.querydsl.jpa.JPQLQuery;
/**
 * 
 * @author ParkHyeokJoon
 * @since 2018.09.13
 * @version 2018.09.13
 *
 */
public class RoomRepositoryImpl extends QuerydslRepositorySupport implements RoomRepositoryCustom{

	public RoomRepositoryImpl() {
		super(Room.class);
		// TODO Auto-generated constructor stub
	}

	@Override
	public List<Room> getRoomsByloginedId(String username) {
		// TODO Auto-generated method stub
		QRoom room = QRoom.room;
		JPQLQuery<Room> query = from(room);
		return null;
	}

}
