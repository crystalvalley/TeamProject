package org.team.sns.domain;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
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
@Table(name = "Networking")
@EqualsAndHashCode(of = "id")
public class Networking {
	
	@Id
	@Column(name = "Networking_id")
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq")
	@SequenceGenerator(name = "seq", sequenceName = "Networking_seq", initialValue = 1, allocationSize = 1)
	private int id;	

	@NotNull
	private String type;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "Owners", referencedColumnName = "user_id")
	private Member member;
	
	@ManyToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="target", referencedColumnName="user_id")
	private Member target;
	
}
