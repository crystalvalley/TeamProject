package org.team.sns.domain;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.Data;
import lombok.EqualsAndHashCode;
/**
 * 
 * @author ParkHyeokJoon
 * @since 18.08.10
 * @version 18.09.28
 */

//[ 댓글 테이블 ]


@Data
@Entity
@Table(name = "Replys")
@EqualsAndHashCode(of = "id")
public class Reply {
	@Id
	@Column(name="reply_id")
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seq")
	@SequenceGenerator(name="seq",sequenceName="Replys_seq", initialValue=1, allocationSize=1)	
	private int id; //참조 시퀀스

	@CreationTimestamp
	private Timestamp writeDate;
	@UpdateTimestamp
	private Timestamp updateDate; 
	
	@ManyToOne
	// writer_id라는 칼럼으로 참조하는 것은 Member의 user_id (외래키)
	@JoinColumn(name = "writer_id", referencedColumnName = "user_id",updatable=false,nullable=true)
	private Member writer;
	
	@NotNull
	@Column(columnDefinition="text")
	private String content;
	
	@OneToOne
	@JoinColumn(name="parent_reply",referencedColumnName="Reply_id")
	private Reply parentReply; 
	
	@ColumnDefault("0")
	private int depth; 
	@NotNull
	private String orderPosition;
	
	@ManyToOne
	@JoinColumn(name="board",referencedColumnName="board_id")
	private Board board;
	
	@OneToOne
	@JoinColumn(name = "replySound", referencedColumnName = "Reply_id")
	private Reply sound;
}
