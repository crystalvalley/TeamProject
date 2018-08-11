package org.team.sns.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
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

//[ 감정표현 테이블 ]

@Entity
@Data
@Table(name="EmotionExpressions")
@EqualsAndHashCode(of = "_id")
public class EmotionExpression {
	@Id
	@Column(name="EmotionExpression_id")
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seq")
	@SequenceGenerator(name="seq",sequenceName="EmotionExpressions_seq", initialValue=1, allocationSize=1)
	private int _id;
 
	private String emotiontype;
	
}
