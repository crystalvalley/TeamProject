package org.team.sns.domain;

import java.io.Serializable;

import lombok.Data;
import lombok.EqualsAndHashCode;
@Data
@EqualsAndHashCode(of= {"mentioned","mentionReply"})
public class ReplyMentionPK implements Serializable{
	private String mentioned;
	private int mentionReply;
}
