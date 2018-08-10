package org.team.sns.domain;

import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "Networking")
public class Networking {
	//minju
	private String userid;
	private String friends_id;
	private String type;
	
}
