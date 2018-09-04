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

import lombok.Data;

/**
 * 
 * @author ParkHyeokJoon
 * @since 2018.08.31
 * @version 2018.08.31
 *
 */
@Data
@Entity
@Table(name = "StrTargets")
public class StrTarget {
	@Id
	@Column(name="target_id")
	@GeneratedValue(strategy=GenerationType.SEQUENCE,generator="seq")
	@SequenceGenerator(name="seq",sequenceName="strtargets_seq",initialValue=1,allocationSize=1)
	private int id;
	
	private String target;
	
	@ManyToOne(cascade=CascadeType.REMOVE)
	@JoinColumn(name="owned",referencedColumnName="str_id")
	private Strategy owned;

}
