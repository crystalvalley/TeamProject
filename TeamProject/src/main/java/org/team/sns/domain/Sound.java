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
import lombok.EqualsAndHashCode;
/**
 * 
 * @author ChaMinju
 * @since 18.08.11
 * @version 
 * 
 */
@Entity
@Data
@Table(name="SoundPhoto")
@EqualsAndHashCode(of = "_id")
public class Sound {
	@Id
	@Column(name="Sound_id")
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seq")
	@SequenceGenerator(name="seq",sequenceName="SoundPhoto_seq", initialValue=1, allocationSize=1)
	private int _id;
	private String board_id;
	private String url;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "board_id", referencedColumnName = "board_id")
	private Board Sounder;
	/*
	 * 리플 푸쉬 받고 양방향 넣을깨요
	 * */
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "board_id", referencedColumnName = "board_id")
	private Reply Soundr;
	
}
