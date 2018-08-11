package org.team.sns.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.Data;
/**
 * 
 * @author MinJeongKim
 * @since 18.08.10
 * @version 18.08.11
 *
 */

//[ Room 테이블 ]


@Data
@Entity
@Table(name = "Rooms")
public class Room {
	@Column(name="Room_id")
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seq")
	@SequenceGenerator(name="seq",sequenceName="Rooms_seq", initialValue=1, allocationSize=1)
	@JoinColumn(name="Room_id", referencedColumnName="RoomMembers_seq")
	private RoomMember RoomMembers_seq;
    
	
	
	private String content; 
	
}
