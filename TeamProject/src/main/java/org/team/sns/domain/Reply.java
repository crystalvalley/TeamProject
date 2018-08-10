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

@Data
@Entity
@Table(name = "Reply")
public class Reply {
	//minju
	@Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seq")
	@SequenceGenerator(name="seq",sequenceName="Reply_seq", initialValue=1, allocationSize=1)	private String sequence; //참조 시퀀스
	private int Reply_seq;
	@CreationTimestamp
	private Timestamp day; // 작성날짜
	
	private String userid; // 작성자
	
	private String sharedcontent; // 공유 내용
	
	private String sound; // 소리 url
	
	private String parent; // 부모여부?
	
	private String depth; // 깊이
	
	private String order; // 
}
