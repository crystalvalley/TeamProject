package org.team.sns.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.Data;
/**
 * 
 * @author MinJeongKim
 * @since 18.08.11
 * @version 18.08.11
 *
 */

//[ RoomMember 테이블 ]

@Data
@Entity
@Table(name = "RoomMembers")
public class RoomMember {
	@Id 
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seq")
	@SequenceGenerator(name="seq",sequenceName="RoomMembers_seq", initialValue=1, allocationSize=1)

	private String userid;
}
