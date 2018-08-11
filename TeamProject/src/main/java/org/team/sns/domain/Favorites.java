package org.team.sns.domain;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.UpdateTimestamp;

import lombok.Data;

/**
 * 
 * @author MinJeongKim
 * @since 18.08.11
 * @version 18.08.11
 *
 */

//[ 즐겨찾기 테이블 ]

@Entity
@Data
@Table(name="Favorites")
//즐겨찾기테이블
public class Favorites {
	@Id
	@Column(name="Favorites_id")
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seq")
	@SequenceGenerator(name="seq",sequenceName="Favorites_seq", initialValue=1, allocationSize=1)

	@JoinColumn(name = "used_id", referencedColumnName = "user_id")
	private String user_id;
	
	@UpdateTimestamp
	private Timestamp uploaddate;
	
	
}
