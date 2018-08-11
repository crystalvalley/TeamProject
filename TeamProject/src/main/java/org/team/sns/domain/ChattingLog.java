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
@Table(name="ChattingLog")
public class ChattingLog {
@Table(name="Test_board")
public class Test {
	//minju
	@Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seq")
	@SequenceGenerator(name="seq",sequenceName="ChattingLog_seq", initialValue=1, allocationSize=1)	
	private int ChattingLog_seq;
	private String userid;
	private String url;
	private String otherId;
	
	
}
}
