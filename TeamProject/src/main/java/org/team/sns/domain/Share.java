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
 * @version 18.08.14
 * 
 */

@Data
@Entity
@Table(name = "Shares")
@EqualsAndHashCode(of = "id")
public class Share {
	
	@Id
	@Column(name="Share_id")
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seq")
	@SequenceGenerator(name="seq",sequenceName="Share_seq", initialValue=1, allocationSize=1)
	private int id; //참조 시퀀스
	
	@ColumnDefault("'all'")
	private String sharedMember; // 공유대상
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "shared", referencedColumnName = "board_id")
	private Board shared;
	
	//타켓, 타입 받고 타켓은 유저아이디 포링키 널가능
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "sharer", referencedColumnName = "user_id")
	private Member sharer;  // 공유한사람 
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "targetMember", referencedColumnName = "user_id")
	private Member targetMember; // 공유 받은사람
	
}
