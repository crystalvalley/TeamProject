package org.team.sns.domain;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.Data;
import lombok.EqualsAndHashCode;
/**
 * 
 * @author ChaMinju
 * @since 18.08.11
 * @version 18.08.14
 * 
 */
@Entity
@Data
@Table(name="Sound")
@EqualsAndHashCode(of = "id")
public class Sound {
	@Id
	@Column(name="Sound_id")
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seq")
	@SequenceGenerator(name="seq",sequenceName="SoundPhoto_seq", initialValue=1, allocationSize=1)
	private int id;
	private String url;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "BoardSound", referencedColumnName = "board_id")
	private Board soundBoard;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "replySound", referencedColumnName = "Reply_id")
	private Reply soundReply;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "CardSound", referencedColumnName = "sender_id")
	private Card soundCard;
}
