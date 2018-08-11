package org.team.sns.domain;

<<<<<<< Updated upstream
import java.sql.Timestamp;

import javax.persistence.CascadeType;
import javax.persistence.Column;
=======
import java.sql.Date;
import java.sql.Timestamp;

>>>>>>> Stashed changes
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
<<<<<<< Updated upstream
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.ColumnDefault;
=======
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

>>>>>>> Stashed changes
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

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
@Table(name = "boards")
// _id 부분이 동일하다면 같은 객체로 취급하겠다는 의미
@EqualsAndHashCode(of = "_id")
public class Board {
	// primary key
	@Id
	// DB에 저장되는 칼럼 이름을 따로 지정함
	@Column(name = "board_id")
	// hibernate가 자동으로 값을 생성함, sequence를 통해서 생성하게 만들고 생성자는 seq로 함
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq")
	// sequence생성
	@SequenceGenerator(name = "seq", sequenceName = "Board_seq", initialValue = 1, allocationSize = 1)
	private int _id;

	@NotNull
	private String content; // 글의 내용

	private String sound; // 글의 사운드 url
	private String image; // 글의 이미지 url
	// 생성시 시간으로 자동 설정
	@CreationTimestamp
	private Timestamp writeDay; // 작성날짜
	// 업데이트 시 시간으로 자동 설정
	@UpdateTimestamp
	private Timestamp updateDay; // 업로드 날짜
	
	// default는 전체공개
	@ColumnDefault("'all'")
	private String setAuthority; // 권한설정
	
	// default는 false
	@ColumnDefault("false")
	private boolean upload; // 업로드
	
	// default 0
	@ColumnDefault("0")
	private int hitCount; // 조회수
	
	// 다대일 양방향 연관관계
	@ManyToOne(cascade = CascadeType.ALL)
	// wrtier_id라는 칼럼으로 참조하는 것은 Member의 user_id (외래키)
	@JoinColumn(name = "writer_id", referencedColumnName = "user_id")
	private Member writer; // 작성자
=======

@Data
@Entity
@Table(name = "board")
public class Board {
	//minju
	@Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seq")
	@SequenceGenerator(name="seq",sequenceName="Board_seq", initialValue=1, allocationSize=1)
	private int sequence; // 글의 시퀀스

	private String content; // 글의 내용
	private String sound; // 글의 사운드 url
	private String image; // 글의 이미지 url
	private String userid; // 작성자

	// 생성시 시간으로 자동 설정
	@CreationTimestamp
	private Timestamp writeday; // 작성날짜
	// 업데이트 시 시간으로 자동 설정
	@UpdateTimestamp
	private Timestamp updateday; // 업로드 날짜 

	private Date upload; // 업로드

	private String like; // 좋아요수
	private String authority; // 권한설정

	private int hitcount; // 조회수
>>>>>>> Stashed changes
}
