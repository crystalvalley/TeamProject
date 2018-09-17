package org.team.sns.domain;

import java.io.Serializable;

import lombok.EqualsAndHashCode;
/**
 * 
 * @author ParkHyeokJoon
 * @since 2018.09.13
 * @version 2018.09.13
 *
 */
@EqualsAndHashCode(of = {"member","room"})
public class RoomMemberPK implements Serializable{
	public String member;
	public int room;
}
