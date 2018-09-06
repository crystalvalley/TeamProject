package org.team.sns.domain;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.Data;
import lombok.EqualsAndHashCode;
/**
 * 
 * @author ParkHyeokJoon
 * @since 2018.08.31
 * @version 2018.08.31
 *
 */
@Data
@Entity
@EqualsAndHashCode(of="id")
@Table(name = "ProductStrategies")
public class ProductStrategy {
	@Id
	@Column(name="pstr_id")
	@GeneratedValue(strategy=GenerationType.SEQUENCE,generator="seq")
	@SequenceGenerator(name="seq",sequenceName="pstr_seq",initialValue=1,allocationSize=1)
	private int id;
	
	@OneToMany(mappedBy="owned",cascade=CascadeType.ALL)
	private List<Strategy> strategies;
	

	
	@ManyToOne
	@JoinColumns({
		@JoinColumn(name="owned_clname",referencedColumnName="listname"),
		@JoinColumn(name="owned_clowner",referencedColumnName="owner_id")
	})
	private CustomList ownedCl;	

}
