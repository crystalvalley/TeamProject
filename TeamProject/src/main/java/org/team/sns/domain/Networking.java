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

import org.hibernate.annotations.CollectionId;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 
 * @author ChaMinju
 * @since 18.08.10
 * @version 18.08.11
 * 
 */


@Data
@Entity
@Table(name = "Networking")
@EqualsAndHashCode(of = "_id")
public class Networking {
	
	@Id
	@Column(name = "Networking_id")
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq")
	@SequenceGenerator(name = "seq", sequenceName = "Networking_seq", initialValue = 1, allocationSize = 1)
	private int _id;	

	@NotNull
	private String type;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "user_id", referencedColumnName = "user_id")
	private Member member;
	
	@ManyToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="target", referencedColumnName="user_id")
	private Member target;
	
}
