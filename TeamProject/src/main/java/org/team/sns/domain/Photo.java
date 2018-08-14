package org.team.sns.domain;

import javax.persistence.CascadeType;
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

import lombok.Data;

/**
 * 
 * @author ChaMinju
 * @since 18.08.10
 * @version 18.08.14
 * 
 */

@Entity
@Data
@Table(name = "Photos")
public class Photo {

	@Id
	@Column(name = "SoundPhoto_id")
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq")
	@SequenceGenerator(name = "seq", sequenceName = "Photo_seq", initialValue = 1, allocationSize = 1)
	private int id;
	
	@NotNull
	private String url;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "owner", referencedColumnName = "board_id")
	private Board owner;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "owners", referencedColumnName = "Card_id")
	private Card owners;
	
}
