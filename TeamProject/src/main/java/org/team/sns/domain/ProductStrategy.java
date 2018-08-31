package org.team.sns.domain;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

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
@Table(name = "ProductStrategies")
public class ProductStrategy {
	@Id
	@Column(name="pstr_id")
	@GeneratedValue(strategy=GenerationType.SEQUENCE,generator="seq")
	@SequenceGenerator(name="seq",sequenceName="pstr_seq",initialValue=1,allocationSize=1)
	private int id;
	
	@OneToMany(mappedBy="owned")
	private List<Strategy> strategies;
	

	
	@ManyToOne
	@JoinColumn(name="owned_cl",referencedColumnName="customlist_id")
	private CustomList ownedCl;	

}
