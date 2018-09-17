package org.team.sns.persistence;

import java.util.List;

import org.team.sns.domain.Room;

/**
 * 
 * @author ParkHyeokJoon
 * @since 2018.09.13
 * @version 2018.09.13
 *
 */
public interface RoomMemberRespositoryCustom {
	public List<Room> getRoomsByloginedUser(String username);
}
