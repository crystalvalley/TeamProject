package org.team.sns.domain;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
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
@IdClass(RoomMemberPK.class)
@EqualsAndHashCode(of = {"member","room"})
@JsonIgnoreProperties({"room"})
@ToString(exclude= {"room"})
public class RoomMember {	
	@Id
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="user_id",referencedColumnName="user_id",updatable=false,nullable=false)
	private Member member;
	@Id
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="onRoom", referencedColumnName="Room_id",updatable=false,nullable=false)
	private Room room;
	
}
