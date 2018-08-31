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
@Table(name = "CustomLists")
public class CustomList {
	@Id
	@Column(name="customlist_id")
	@GeneratedValue(strategy=GenerationType.SEQUENCE,generator="seq")
	@SequenceGenerator(name="seq",sequenceName="CustomList_seq",initialValue=1,allocationSize=1)
	private int id;
	
	@NotNull
	private String listName;
	
	@ManyToOne
	@JoinColumn(name="owner_id",referencedColumnName="user_id",updatable=false,nullable=false)
	private Member owner;
		
	@OneToMany(mappedBy="ownedCl")
	private List<ProductStrategy> conditions;
}
