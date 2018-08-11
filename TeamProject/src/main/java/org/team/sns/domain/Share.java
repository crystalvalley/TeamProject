package org.team.sns.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.Data;
/**
 * 
 * @author MinJeongKim
 * @since 18.08.10
 * @version 18.08.11
 *
 */

//[ 공유 테이블 ]

@Data
@Entity
@Table(name = "Shares")
public class Share {
	
	@Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seq")
	@SequenceGenerator(name="seq",sequenceName="Shares_seq", initialValue=1, allocationSize=1)
	
	@JoinColumn(name = "shared_id", referencedColumnName = "user_id")
	private String sharedcontent; // 공유대상

}
