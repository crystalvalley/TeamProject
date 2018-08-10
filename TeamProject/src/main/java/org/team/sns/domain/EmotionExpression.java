package org.team.sns.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.Data;

/*만든사람 : 김민정
 * 수정날짜 : 2018.08.10
 * */

@Entity
@Data
@Table(name="EmotionExpression")
public class EmotionExpression {
	
	@Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seq")
	@SequenceGenerator(name="seq",sequenceName="EmotionExpression_seq", initialValue=1, allocationSize=1)

	private int EmotionExpression_seq;
	private String userid;
	private String emotiontype;
	
}
