package org.team.sns.domain;

import java.util.ArrayList;
import java.util.HashMap;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
@Entity
@Table(name = "CustomLists")
public class CustomList {
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE,generator="seq")
	@SequenceGenerator(name="seq",sequenceName="CustomList_seq",initialValue=1,allocationSize=1)
	private int id;
	
	@NotNull
	private String listName;
	
	@ManyToOne
	@JoinColumn(name="owner_id",referencedColumnName="user_id",updatable=false,nullable=false)
	private Member owner;
	
	// map안의 것들은 AND 리스트 아이템끼리는 OR 연산
	private ArrayList<HashMap<String,ArrayList<String>>> strategy;	
}
