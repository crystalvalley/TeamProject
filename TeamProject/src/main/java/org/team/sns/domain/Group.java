package org.team.sns.domain;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 
 * @author MinJeongKim
 * @since 18.08.10
 * @version 18.08.14
 *
 */

//[ 그룹 테이블 ]

@Data
@Entity
@Table(name = "Groups")
@EqualsAndHashCode(of = "groupName")
public class Group {
	@Id
	@Column
	private String groupName; // 그룹이름

	@ManyToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="master", referencedColumnName="user_id")
	private Member groupMaster; // 그룹장

	@NotNull
	private String category; // 카테고리
	
	@OneToMany(mappedBy = "Groupmember")
	private List<GroupMember> groupmembers;
	
	
}