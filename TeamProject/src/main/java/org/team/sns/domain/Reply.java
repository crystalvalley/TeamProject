package org.team.sns.domain;

import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

import lombok.Data;
/**
 * 
 * @author MinJeongKim
 * @since 18.08.10
 * @version 18.08.11
 *
 */

//[ 댓글 테이블 ]
// 댓글 테이블 컬럼부분 수정 부탁드립니다.

@Data
@Entity
@Table(name = "Replys")
public class Reply {
	@Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seq")
	@SequenceGenerator(name="seq",sequenceName="Replys_seq", initialValue=1, allocationSize=1)	private String sequence; //참조 시퀀스
	
	@CreationTimestamp
	private Timestamp day; 
	
	private String userid; 
	
	private String sharedcontent; 
	
	private String sound; 
	
	private String parent; 
	
	private String depth; 
	
	private String order;
}
