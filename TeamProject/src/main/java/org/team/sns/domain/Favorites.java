package org.team.sns.domain;

import java.sql.Timestamp;

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

import org.hibernate.annotations.UpdateTimestamp;

import lombok.Data;

/**
 * 
 * @author ChaMinju
 * @since 18.08.11
 * @version 
 * 
 */

//[ 즐겨찾기 테이블 ]

@Entity
@Data
@Table(name="Favorites")
public class Favorites {
	@Id
	@Column(name = "Favorites_id")
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seq")
	@SequenceGenerator(name="seq",sequenceName="Favorites_seq", initialValue=1, allocationSize=1)
	private int _id;
	private String userid;
	private int boardsequence;
	
	@UpdateTimestamp
	private Timestamp uploaddate;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "Favorites_id", referencedColumnName = "userid")
	private Member writer;
	
}
