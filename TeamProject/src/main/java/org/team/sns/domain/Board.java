package org.team.sns.domain;

import java.sql.Date;
import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.Data;

@Data
@Entity
@Table(name = "board")
public class Board {
	//minju
	@Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seq")
	@SequenceGenerator(name="seq",sequenceName="Board_seq", initialValue=1, allocationSize=1)
	private int sequence; // 글의 시퀀스

	private String content; // 글의 내용
	private String sound; // 글의 사운드 url
	private String image; // 글의 이미지 url
	private String userid; // 작성자

	// 생성시 시간으로 자동 설정
	@CreationTimestamp
	private Timestamp writeday; // 작성날짜
	// 업데이트 시 시간으로 자동 설정
	@UpdateTimestamp
	private Timestamp updateday; // 업로드 날짜 

	private Date upload; // 업로드

	private String like; // 좋아요수
	private String authority; // 권한설정

	private int hitcount; // 조회수
}
