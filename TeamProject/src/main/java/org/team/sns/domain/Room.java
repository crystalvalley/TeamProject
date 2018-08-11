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
@Table(name = "Room")
public class Room {
	//minju
	@Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seq")
	@SequenceGenerator(name="seq",sequenceName="Room_seq", initialValue=1, allocationSize=1)
	private int sequence; // 참조 시퀀스
	private int Room_seq; // 참조 시퀀스
	//private Stashed changes;
	private String content; // 채팅 내용 
	
}
