package org.team.sns.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "Group")
public class Group {
//minju
	@Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seq")
	@SequenceGenerator(name="seq",sequenceName="Group_seq", initialValue=1, allocationSize=1)
	private String Group_seq; //참조 시퀀스 
	private String groupname; // 그룹이름 
	private String groupmasterid; //그룹장
	private String category; // 카테고리 
}
