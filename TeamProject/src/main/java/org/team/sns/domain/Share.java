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

import org.hibernate.annotations.ColumnDefault;

import lombok.Data;
/**
 * 
 * @author MinJeongKim
 * @since 18.08.10
 * @version 18.08.11
 *
 */
import lombok.EqualsAndHashCode;

/**
 * 
 * @author ChaMinju
 * @since 18.08.10
 * @version 18.08.11
 * 
 */

@Data
@Entity
@Table(name = "Shares")
@EqualsAndHashCode(of = "_id")
public class Share {
	
	@Id
	@Column(name="Share_id")
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seq")
	@SequenceGenerator(name="seq",sequenceName="Share_seq", initialValue=1, allocationSize=1)
	private int _id; //참조 시퀀스
	
	@ColumnDefault("'all'")
	private String sharedcontent; // 공유대상

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "sharer", referencedColumnName = "user_id")
	private Member sharer; //공유한 사람
}
