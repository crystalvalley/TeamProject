package org.team.sns.domain;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 
 * @author MinJeongKim
 * @since 18.08.10
 * @version 18.08.14
 *
 */

//[ 감정표현 테이블 ]

@Entity
@Data
@Table(name="EmotionExpressions")
@EqualsAndHashCode(of = "id")
public class EmotionExpression {
	@Id
	@Column(name="EmotionExpression_id")
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seq")
	@SequenceGenerator(name="seq",sequenceName="EmotionExpressions_seq", initialValue=1, allocationSize=1)
	private int id;	
	
	@ManyToOne(fetch=FetchType.LAZY,cascade = CascadeType.ALL)
	@JoinColumn(name="expresser",referencedColumnName="board_id")
	private Member writer;
	
	private String emotiontype;
	
	@OneToOne
	@JoinColumn(name="target_board", referencedColumnName="board_id")
	private Board target_board;
	
	@OneToOne
	@JoinColumn(name="target_reply", referencedColumnName="reply_id")
	private Reply target_reply;
	
	
}
