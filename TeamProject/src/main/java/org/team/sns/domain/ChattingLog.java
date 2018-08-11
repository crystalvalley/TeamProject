package org.team.sns.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 
 * @author MinJeongKim
 * @since 18.08.10
 * @version 18.08.11
 * 
 */

//[ 채팅로그 테이블 ]

@Entity
@Data
@Table(name="ChattingLogs")
@EqualsAndHashCode(of = "_id")
public class ChattingLog {
@Table(name="Test_board")
public class Test {
	//minju
	@Id
	@Column(name="Chattinglogs_id")
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seq")
	@SequenceGenerator(name="seq",sequenceName="ChattingLogs_seq", initialValue=1, allocationSize=1)	
	
	private String user_id;
	private String url;
	private String otherId;
	
	
}
}
