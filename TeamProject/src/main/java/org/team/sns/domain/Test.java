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
@Table(name="Test_board")
public class Test {
	//minju
	@Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seq")
	@SequenceGenerator(name="seq",sequenceName="test_seq", initialValue=1, allocationSize=1)
	private int _id;
	
	private String title;
	private String content;

}
