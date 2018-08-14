package org.team.sns.domain;

import java.sql.Timestamp;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.CreationTimestamp;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 
 * @author ParkHyeokjoon
 * @since 18.08.10
 * @version 18.08.14
 * 
 */

//[ 카드 테이블 ]

@Entity
@Data
@Table(name = "Cards")
//_id 부분이 동일하다면 같은 객체로 취급하겠다는 의미
@EqualsAndHashCode(of = "id")
public class Card {
	@Id
	@Column(name="Card_id")
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seq")
	@SequenceGenerator(name="seq",sequenceName="Cards_seq", initialValue=1, allocationSize=1)
	private int id;
	
	@CreationTimestamp
	private Timestamp writeday; // 보낸날짜 
	
	@NotNull
	private String content; // 내용
	private String sound; // 사운드 url
	
	@OneToMany(mappedBy="owners")
	private Photo photo; // 이미지 url
	
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

	@OneToOne(mappedBy="SoundCard")
	private List<Sound> Sounds;

}
