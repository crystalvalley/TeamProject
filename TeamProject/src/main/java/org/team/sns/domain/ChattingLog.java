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
<<<<<<< Updated upstream:TeamProject/src/main/java/org/team/sns/domain/ChattingLog.java
@Table(name="ChattingLog")
public class ChattingLog {
=======
@Table(name="Test_board")
public class Test {
	//minju
>>>>>>> Stashed changes:TeamProject/src/main/java/org/team/sns/domain/Test.java
	@Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seq")
	@SequenceGenerator(name="seq",sequenceName="ChattingLog_seq", initialValue=1, allocationSize=1)	
	private int ChattingLog_seq;
	private String userid;
	private String url;
	private String otherId;
	
	
}
