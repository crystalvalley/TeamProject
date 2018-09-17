package org.team.sns.persistence;

import org.springframework.data.repository.CrudRepository;
import org.team.sns.domain.Room;

public interface RoomRepository extends CrudRepository<Room, Integer>, RoomRepositoryCustom{

}
