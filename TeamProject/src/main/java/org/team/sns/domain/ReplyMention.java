package org.team.sns.domain;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Data
@Table(name = "ReplyMentions")
@IdClass(ReplyMentionPK.class)
@EqualsAndHashCode(of= {"mentioned","mentionReply"})
public class ReplyMention {	
	@Id
	@ManyToOne
	@JoinColumn(name="user_id",referencedColumnName="user_id",updatable=false,nullable=false)
	private Member mentioned;
	
	@Id
	@ManyToOne
	@JoinColumn(name="reply_id",referencedColumnName="reply_id",updatable=false,nullable=false)
	private Reply mentionReply;

}