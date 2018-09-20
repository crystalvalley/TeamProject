package org.team.sns.domain;

import java.io.Serializable;

import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(of= {"mentioned","mentionBoard"})
public class MentionPK implements Serializable{
	private String mentioned;
	private int mentionBoard;
			
}
