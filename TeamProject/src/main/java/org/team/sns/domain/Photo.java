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

/**
 * 
 * @author ChaMinju
 * @since 18.08.10
 * @version 18.08.11
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
	private int _id;
	
	@NotNull
	private String url;

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "owner", referencedColumnName = "board_id")
	private Board owner;
}
