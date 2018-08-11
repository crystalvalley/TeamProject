package org.team.sns.domain;

import java.sql.Timestamp;

<<<<<<< Updated upstream
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
=======
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
>>>>>>> Stashed changes

import org.hibernate.annotations.CreationTimestamp;

import lombok.Data;
<<<<<<< Updated upstream
import lombok.EqualsAndHashCode;

/**
 * 
 * @author ParkHyeokjoon
 * @since 18.08.10
 * @version 18.08.10
 * 
 */

@Data
@Entity
@Table(name = "Cards")
//_id 부분이 동일하다면 같은 객체로 취급하겠다는 의미
@EqualsAndHashCode(of = "_id")
public class Card {
	@Id
	@Column(name="Card_id")
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seq")
	@SequenceGenerator(name="seq",sequenceName="Card_seq", initialValue=1, allocationSize=1)
	private String _id;
	
	@CreationTimestamp
	private Timestamp writeday; // 보낸날짜 
	@NotNull
	private String content; // 내용
	
	private String sound; // 사운드 url
	private String image; // 이미지 url

	// 다대일 양방향 연관관계
	@ManyToOne(fetch=FetchType.LAZY,cascade = CascadeType.ALL)
	// recipient_id 라는 칼럼으로 참조하는 것은 Member의 user_id (외래키)
	@JoinColumn(name = "sender_id", referencedColumnName = "user_id")
	private Member sender; // 보낸사람
	
	// 다대일 양방향 연관관계
	@ManyToOne(fetch=FetchType.LAZY,cascade = CascadeType.ALL)
	// recipient_id 라는 칼럼으로 참조하는 것은 Member의 user_id (외래키)
	@JoinColumn(name = "recipient_id", referencedColumnName = "user_id")
	private Member recipient; // 수신인
=======

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
>>>>>>> Stashed changes
}
