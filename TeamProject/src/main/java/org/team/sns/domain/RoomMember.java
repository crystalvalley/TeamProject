package org.team.sns.domain;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.Data;
import lombok.EqualsAndHashCode;
/**
 * 
 * @author MinJeongKim
 * @since 18.08.10
 * @version 18.08.11
 *
 */

//[ RoomMember 테이블 ]

@Data
@Entity
@Table(name = "RoomMembers")
@EqualsAndHashCode(of = "_id")
public class RoomMember {
	@Id 
	@Column(name="RoomMember_id")
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seq")
	@SequenceGenerator(name="seq",sequenceName="RoomMembers_seq", initialValue=1, allocationSize=1)
	private String _id;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="onRoom", referencedColumnName="Room_id")
	private Room room;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="user_id",referencedColumnName="user_id")
	private Member member;
}
