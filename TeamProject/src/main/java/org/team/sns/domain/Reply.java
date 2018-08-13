package org.team.sns.domain;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

import lombok.Data;
import lombok.EqualsAndHashCode;
/**
 * 
 * @author MinJeongKim
 * @since 18.08.10
 * @version 18.08.11
 * 
 * 수정하세요
 * by ParkHyeokJoon
 *
 */

//[ 댓글 테이블 ]


@Data
@Entity
@Table(name = "Replys")
@EqualsAndHashCode(of = "_id")
public class Reply {
	@Id
	@Column(name="Reply_id")
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seq")
	@SequenceGenerator(name="seq",sequenceName="Replys_seq", initialValue=1, allocationSize=1)	
	private String _id; //참조 시퀀스
	
	@CreationTimestamp
	private Timestamp day; 
	
	private String userid; 
	
	private String sharedContent; 
	
	private String sound; 
	
	private String parentReply; 
	
	private String depth; 
	
	private String orderPosition;
	
	private String board_id;
}
