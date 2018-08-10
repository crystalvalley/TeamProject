package org.team.sns.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "RoomMember")
public class RoomMember {
	//minju
	@Id //pk
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seq")
	@SequenceGenerator(name="seq",sequenceName="RoomMember_seq", initialValue=1, allocationSize=1)
	private int RoomMember_seq;
	private String userid;
}
