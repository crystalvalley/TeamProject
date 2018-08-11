package org.team.sns.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity 
@Table(name = "Share")
public class Share {
	//minju
	@Id
	@Column(name="test2_id")
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seq")
	@SequenceGenerator(name="seq",sequenceName="Share_seq", initialValue=1, allocationSize=1)
	private int sequence; //참조 시퀀스
	private String shareid; // 공유한 아이디
	private String sharedcontent; // 공유대상

}
