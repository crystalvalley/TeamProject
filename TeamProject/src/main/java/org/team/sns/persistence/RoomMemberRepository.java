package org.team.sns.persistence;

import org.springframework.data.repository.CrudRepository;
import org.team.sns.domain.RoomMember;
import org.team.sns.domain.RoomMemberPK;

/**
 * 
 * @author ParkHyeokJoon
 * @since 2018.09.13
 * @version 2018.09.13
 *
 */
public interface RoomMemberRepository extends CrudRepository<RoomMember, RoomMemberPK>,RoomMemberRespositoryCustom {

}
