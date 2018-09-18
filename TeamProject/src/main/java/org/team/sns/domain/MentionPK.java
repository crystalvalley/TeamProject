package org.team.sns.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(of= {"mentioned","mentionBoard","mentionReply"})
public class MentionPK {
	private String mentioned;
	private int mentionBoard;
	private int mentionReply;
}
