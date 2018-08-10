package org.team.sns.domain;

import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

import lombok.Data;

@Data
@Entity
@Table(name = "Card")
public class Card {
//minju
	@Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seq")
	@SequenceGenerator(name="seq",sequenceName="Card_seq", initialValue=1, allocationSize=1)
	private String Card_seq; //참조 시퀀스
	
	@CreationTimestamp
	private Timestamp writeday; // 보낸날짜 
	private String userid; // 보낸사람 아이디
	private String content; // 내용
	private String sound; // 사운드 url
	private String image; // 이미지 url
	
	private String recipient; // 수신인
}
