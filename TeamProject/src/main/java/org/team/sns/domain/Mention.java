package org.team.sns.domain;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 
 * @author ParkHyeokJoon
 * @since 2018.08.30
 * @version 2018.08.30
 *
 */
@Entity
@Data
@Table(name = "Mentions")
@IdClass(MentionPK.class)
//_id 부분이 동일하다면 같은 객체로 취급하겠다는 의미
@EqualsAndHashCode(of= {"mentioned","mentionBoard","mentionReply"})
public class Mention {	
	@Id
	@ManyToOne
	@JoinColumn(name="user_id",referencedColumnName="user_id",updatable=false,nullable=false)
	private Member mentioned;
	
	@Id
	@ManyToOne
	@JoinColumn(name="board_id",referencedColumnName="board_id",updatable=false,nullable=true)
	private Board mentionBoard;
	
	@Id
	@ManyToOne
	@JoinColumn(name="reply_id",referencedColumnName="reply_id",updatable=false,nullable=true)
	private Board mentionReply;

}
