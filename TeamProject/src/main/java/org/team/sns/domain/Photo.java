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

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

/**
 * 
 * @author ChaMinju
 * @since 18.08.10
 * @version 18.08.20
 * 
 */

@Entity
@Data
@Table(name = "Photos")
@JsonIgnoreProperties({"ownerBoard","ownerCard"})
public class Photo {

	@Id
	@Column(name = "SoundPhoto_id")
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq")
	@SequenceGenerator(name = "seq", sequenceName = "Photo_seq", initialValue = 1, allocationSize = 1)
	private int id;
	
	@NotNull
	private String url;

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "ownerBoard", referencedColumnName = "board_id")
	private Board ownerBoard;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "ownerCard", referencedColumnName = "Card_id")
	private Card ownerCard;
	
}
