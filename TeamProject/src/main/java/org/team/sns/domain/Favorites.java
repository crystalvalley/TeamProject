package org.team.sns.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.UpdateTimestamp;

import com.sun.jmx.snmp.Timestamp;

import lombok.Data;

/*만든사람 : 김민정
 * 수정날짜 : 2018.08.10
 * */

@Entity
@Data
@Table(name="Favorites")

public class Favorites {
	@Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seq")
	@SequenceGenerator(name="seq",sequenceName="Favorites_seq", initialValue=1, allocationSize=1)

	private int Favorites_seq;
	private String userid;
	private int boardsequence;
	@UpdateTimestamp
	private Timestamp uploaddate;
	
	
}
