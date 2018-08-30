package org.team.sns.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 
 * @author ParkHyeokjoon
 * @since 18.08.30
 * @version 18.08.30
 * 
 */
@Entity
@Data
@Table(name = "Tags")
@EqualsAndHashCode(of="tag")
public class Tag {
	@Id
	@Column(name="tag_name")
	private String tag;
}
