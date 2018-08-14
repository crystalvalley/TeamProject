package org.team.sns.domain;

import java.sql.Timestamp;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 
 * @author ChaMinju
 * @since 18.08.14
 * @version 18.08.14
 * 
 */

@Entity
@Data
@Table(name = "GroupMember")

@EqualsAndHashCode(of = "id")
public class GroupMember {

	@Id
	@Column(name="GroupMember_id")
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seq")
	@SequenceGenerator(name="seq",sequenceName="GroupMember_seq", initialValue=1, allocationSize=1)
	private int id;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "GroupMember", referencedColumnName = "user_id")
	private Member member;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "GroupMembers", referencedColumnName = "groupName")
	private Group Groupmember;
}
