package org.team.sns.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name="Test2_board")
public class Test2 {
	
	@Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seq")
	@SequenceGenerator(name="seq",sequenceName="test2_seq", initialValue=1, allocationSize=1)
	private int _id;
	
	private String title;
	private String content;

}
