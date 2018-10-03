package org.team.sns.domain;

import java.io.Serializable;

import lombok.Data;
import lombok.EqualsAndHashCode;
/**
 * 
 * @author ParkHyeokJoon
 * @since 2018.09.13
 * @version 2018.09.13
 *
 */
@Data
@EqualsAndHashCode(of = {"member","room"})
public class RoomMemberPK implements Serializable{
	private String member;
	private int room;
}
