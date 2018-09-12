package org.team.sns.domain;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import lombok.Data;
import lombok.EqualsAndHashCode;
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
@EqualsAndHashCode(of = "_id")
public class Room {
	@Id
	@Column(name="Room_id")
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seq")
	@SequenceGenerator(name="seq",sequenceName="Rooms_seq", initialValue=1, allocationSize=1)
	private int _id;	
	
	@NotNull
	private String contentUrl;
	
	@OneToMany(mappedBy="room")
	private List<RoomMember> roomMembers;
	
	private int chatOrder;		
}
