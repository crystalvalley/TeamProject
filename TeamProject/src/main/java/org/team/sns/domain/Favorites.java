package org.team.sns.domain;

import java.sql.Timestamp;

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
import lombok.EqualsAndHashCode;

/**
 * 
 * @author ChaMinju
 * @since 18.08.10
 * @version 18.08.14
 * 
 */

//[ 즐겨찾기 테이블 ]

@Entity
@Data
@Table(name="Favorites")
@EqualsAndHashCode(of = "id")
public class Favorites {
	@Id
	@Column(name = "Favorites_id")
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seq")
	@SequenceGenerator(name="seq",sequenceName="Favorites_seq", initialValue=1, allocationSize=1)
	private int id;
	
	@UpdateTimestamp
	private Timestamp uploaddate;

	@ManyToOne
	@JoinColumn(name = "adder_id", referencedColumnName = "user_id")
	private Member adder;
	
	@ManyToOne
	@JoinColumn(name="added_board", referencedColumnName="board_id")
	private Board board;
	
}
