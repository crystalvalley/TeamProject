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
@Table(name="SoundPhoto")
public class SoundPhoto {

	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seq")
	@SequenceGenerator(name="seq",sequenceName="SoundPhoto_seq", initialValue=1, allocationSize=1)


	private String url;
	private String type;
	private int sequence;



}
