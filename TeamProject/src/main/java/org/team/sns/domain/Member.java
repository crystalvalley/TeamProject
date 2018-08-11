package org.team.sns.domain;

import java.sql.Timestamp;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 
 * @author ParkHyeokjoon
 * @since 18.08.10
 * @version 18.08.10
 * 
 */
// [ 회원 테이블 ]

@Entity
@Data
@Table(name="Members")
//_id 부분이 동일하다면 같은 객체로 취급하겠다는 의미
@EqualsAndHashCode(of = "_id")
public class Member {
	@Id
	@Column(name="user_id")
	private String _id;
	
	@NotNull
	private String password;
	@NotNull
	private String userName;
	@NotNull
	private String nickname;
	private int phone;
	@CreationTimestamp
	private Timestamp signupDate;
	@ColumnDefault("0")
	private int point;
	
	//일대다 양방향 연관관계
	//OneToMany는 기본적으로 fetchType이 lazy이므로 따로 설정하지 않음
	@OneToMany(mappedBy="writer")
	private List<Board> boards;

	@OneToMany(mappedBy="recipient")
	private List<Card> received;
	
	
}
