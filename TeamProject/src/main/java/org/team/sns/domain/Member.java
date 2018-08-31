package org.team.sns.domain;

import java.sql.Timestamp;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

/**
 * 
 * @author ParkHyeokjoon
 * @since 18.08.10
 * @version 18.08.30
 * 
 */
// [ 회원 테이블 ]

@Entity
@Data
@Table(name = "Members")
//_id 부분이 동일하다면 같은 객체로 취급하겠다는 의미
@EqualsAndHashCode(of = "id")
@ToString(exclude = { "boards", "received", "sended", "favorited", "myNetwork", "networked", "shared", "onRoom",
		"groups", "customList" })
@JsonIgnoreProperties({ "boards", "received", "sended", "favorited", "myNetwork", "networked", "shared", "onRoom",
		"groups", "customList" })
public class Member {
	@Id
	@Column(name = "user_id")
	private String id;
	@NotNull
	private String email;
	@NotNull
	private String password;
	@NotNull
	private String username;

	@CreationTimestamp
	private Timestamp signupDate;

	private String profileImg;

	@ColumnDefault("0")
	private int point;

	// 일대다 양방향 연관관계
	// OneToMany는 기본적으로 fetchType이 lazy이므로 따로 설정하지 않음
	@OneToMany(mappedBy = "writer", cascade = CascadeType.ALL)
	private List<Board> boards;

	@OneToMany(mappedBy = "recipient")
	private List<Card> received;

	@OneToMany(mappedBy = "sender")
	private List<Card> sended;

	@OneToMany(mappedBy = "adder")
	private List<Favorites> favorited;

	@OneToMany(mappedBy = "member")
	private List<Networking> myNetwork;

	@OneToMany(mappedBy = "target")
	private List<Networking> networked;

	@OneToMany(mappedBy = "sharer")
	private List<Share> shared;

	@OneToMany(mappedBy = "member")
	private List<RoomMember> onRoom;

	@OneToMany(mappedBy = "groupMaster")
	private List<Group> groups;

	@OneToMany(mappedBy = "targetMember")
	private List<Share> share;

	@OneToMany(mappedBy = "owner")
	private List<CustomList> customList;
	
	@OneToMany(mappedBy = "mentioned")
	private List<Mention> mentionList; 

}
