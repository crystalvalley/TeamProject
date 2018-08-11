package org.team.sns.domain;

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

/**
 * 
 * @author ChaMinju
 * @since 18.08.11
 * @version 
 * 
 */

@Data
@Entity
@Table(name = "Share")
public class Share {
	
	@Id
	@Column(name="Share_id")
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seq")
	@SequenceGenerator(name="seq",sequenceName="Share_seq", initialValue=1, allocationSize=1)
	private int Share_seq; //참조 시퀀스
	private String shareid; // 공유한 아이디
	private String sharedcontent; // 공유대상

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "shareid", referencedColumnName = "shareid")
	private Member Sharer;
}
