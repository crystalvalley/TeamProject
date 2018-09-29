package org.team.sns.persistence;

import java.util.List;

import org.team.sns.domain.Room;

public interface RoomRepositoryCustom {
	public Room getRoomByRoomMember(String[] users);
}
