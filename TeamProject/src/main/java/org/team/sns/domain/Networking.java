package org.team.sns.domain;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 
 * @author ChaMinju
 * @since 18.08.10
 * @version 18.08.14
 * 
 */

@Data
@Entity
@IdClass(NetworkingPK.class)
@Table(name = "Networking")
@EqualsAndHashCode(of = {"member","target"})
public class Networking {
	@NotNull
	private String type;
	
	@Id
	@ManyToOne
	@JoinColumn(name = "Owners", referencedColumnName = "user_id")
	private Member member;
	
	@Id
	@ManyToOne
	@JoinColumn(name="target", referencedColumnName="user_id")
	private Member target;
	
}
