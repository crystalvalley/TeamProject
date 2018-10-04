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
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

/**
 * 
 * @author MinJeongKim
 * @since 18.08.10
 * @version 18.09.03
 *
 */

//[ 감정표현 테이블 ]

@Entity
@Data
@Table(name="EmotionExpressions")
@JsonIgnoreProperties({"target_board","target_reply","expresser"})
public class EmotionExpression {
	@Id
	@Column(name="emotion_id")
    @GeneratedValue(strategy=GenerationType.AUTO)	
	private int id;
	
	@ManyToOne
	@JoinColumn(name="expresser",referencedColumnName="user_id")
	private Member expresser;
	
	// 1~5까지 1이 좋은거
	@NotNull
	private int emotiontype;

	@ManyToOne
	@JoinColumn(name="target_board", referencedColumnName="board_id")
	private Board targetBoard;
	
	@ManyToOne
	@JoinColumn(name="target_reply", referencedColumnName="reply_id")
	private Reply targetReply;
	
	
}
