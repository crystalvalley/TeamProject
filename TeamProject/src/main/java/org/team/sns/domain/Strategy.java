package org.team.sns.domain;

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

@Data
@Entity
@Table(name = "Strategies")
@EqualsAndHashCode(of="id")
public class Strategy {
	@Id
	@Column(name="str_id")
	@GeneratedValue(strategy=GenerationType.SEQUENCE,generator="seq")
	@SequenceGenerator(name="seq",sequenceName="strategy_seq",initialValue=1,allocationSize=1)
	private int id;
	
	@ManyToOne
	@JoinColumn(name="owned",referencedColumnName="pstr_id")
	private ProductStrategy owned;
	
	@NotNull
	private String type;
	
	private String targets;
}
