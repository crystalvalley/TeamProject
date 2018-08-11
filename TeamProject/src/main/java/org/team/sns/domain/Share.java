package org.team.sns.domain;

<<<<<<< Updated upstream
import javax.persistence.Column;
=======
>>>>>>> Stashed changes
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.Data;

@Data
<<<<<<< Updated upstream
@Entity 
=======
@Entity
>>>>>>> Stashed changes
@Table(name = "Share")
public class Share {
	//minju
	@Id
<<<<<<< Updated upstream
	@Column(name="test2_id")
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seq")
	@SequenceGenerator(name="seq",sequenceName="Share_seq", initialValue=1, allocationSize=1)
	private int sequence; //참조 시퀀스
=======
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seq")
	@SequenceGenerator(name="seq",sequenceName="Share_seq", initialValue=1, allocationSize=1)
	private int Share_seq; //참조 시퀀스
>>>>>>> Stashed changes
	private String shareid; // 공유한 아이디
	private String sharedcontent; // 공유대상

}
