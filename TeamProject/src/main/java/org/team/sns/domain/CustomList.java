package org.team.sns.domain;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
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
@IdClass(CustomListPK.class)
@EqualsAndHashCode(of= {"listName","owner"})
@ToString(exclude = {"owner","conditions"})
public class CustomList {
	@Id
	@NotNull
	@Column(name="listname")
	private String listName;
	
	@Id
	@ManyToOne
	@JoinColumn(name="owner_id",referencedColumnName="user_id",updatable=false,nullable=false,insertable=false)
	private Member owner;
		
	@OneToMany(mappedBy="ownedCl",cascade=CascadeType.ALL)
	private List<ProductStrategy> conditions;
	
	private int customOrder;
}
