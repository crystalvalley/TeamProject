package org.team.sns.domain;

import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.Data;

@Data
@Entity
@Table(name="test_board")
public class test3 {
	@Id
	//생성 방법 자동으로 설정
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long _id;
	
	private String category;
	private String subCategory;
	
	private String title;
	private String summary;
	private String content;
	private String tag;
	
	//0이면 ckeditor, 1이면 수제작에디터
	private int editorType;
	
	//생성시 시간으로 자동 설정
	@CreationTimestamp
	private Timestamp regDate;
	//업데이트 시 시간으로 자동 설정
	@UpdateTimestamp
	private Timestamp updateDate;
	

}
