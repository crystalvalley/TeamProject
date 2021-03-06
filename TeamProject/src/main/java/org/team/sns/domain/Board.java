package org.team.sns.domain;

import java.sql.Timestamp;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

/**
 * 
 * @author ParkHyeokjoon
 * @since 18.08.10
 * @version 18.09.17
 *
 */

//[ 게시판 테이블 ]

@Data
@Entity
@Table(name = "Boards")
// _id 부분이 동일하다면 같은 객체로 취급하겠다는 의미
@EqualsAndHashCode(of = "id")
@ToString(exclude = {"replys", "share", "writer", "sounds","mentions","tags","favorite","emotions" })
@JsonIgnoreProperties({ "replys", "share", "sounds","mentions","tags","favorite","emotions" })
public class Board {
	// primary key
	@Id
	// DB에 저장되는 칼럼 이름을 따로 지정함
	@Column(name = "board_id")
	// hibernate가 자동으로 값을 생성함, sequence를 통해서 생성하게 만들고 생성자는 seq로 함
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq")
	// sequence생성
	@SequenceGenerator(name = "seq", sequenceName = "Boards_seq", initialValue = 1, allocationSize = 1)
	private int id;

	@NotNull
	private String title; // 글의 제목
	@NotNull
	@Column(columnDefinition="text")
	private String content; // 글의 내용

	// 생성시 시간으로 자동 설정
	@CreationTimestamp
	private Timestamp writeDay; // 작성날짜

	// 업데이트 시 시간으로 자동 설정
	@UpdateTimestamp
	private Timestamp updateDay; // 업로드 날짜

	@Column(columnDefinition="text")
	private String plainText; // content는 draftjs 포맷이기 때문에 검색용으로 순수한 내용 text만 저장
	
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
	@ManyToOne
	// writer_id라는 칼럼으로 참조하는 것은 Member의 user_id (외래키)
	@JoinColumn(name = "writer_id", referencedColumnName = "user_id", updatable = false, nullable = false)
	private Member writer; // 작성자

	@OneToMany(mappedBy = "ownerBoard",cascade=CascadeType.ALL)
	private List<Photo> photos;

	@OneToOne(mappedBy = "soundBoard",cascade=CascadeType.ALL)
	private Sound sounds;

	@OneToMany(mappedBy = "board",cascade=CascadeType.ALL)
	private List<Reply> replys;

	@OneToMany(mappedBy = "shared",cascade=CascadeType.ALL)
	private List<Share> share;

	@ManyToMany(mappedBy="taggedBoards",cascade=CascadeType.ALL)
	private List<Tag> tags;

	@OneToMany(mappedBy="mentionBoard",cascade=CascadeType.ALL)
	private List<Mention> mentions;
	
	@OneToMany(mappedBy="board",cascade=CascadeType.ALL)
	private List<Favorites> favorite;
	
	@OneToMany(mappedBy="targetBoard",cascade=CascadeType.ALL)
	private List<EmotionExpression> emotions;

}
