package org.team.sns.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import lombok.Data;
/**
 * 
 * @author MinJeongKim
 * @since 18.08.10
 * @version 18.08.11
 *
 */

//[ 그룹 테이블 ]

@Data
@Entity
@Table(name = "Groups")
public class Group {
	@Id
	@Column(name="Group_id")
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seq")
	@SequenceGenerator(name="seq",sequenceName="Groups_seq", initialValue=1, allocationSize=1)
    
	@NotNull
	private String groupname; // 그룹이름 
	
	@NotNull
	private String groupmasterid; //그룹장
	
	private String category; // 카테고리 
}
