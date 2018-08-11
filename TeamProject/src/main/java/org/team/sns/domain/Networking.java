package org.team.sns.domain;

import javax.persistence.Entity;
<<<<<<< Updated upstream
import javax.persistence.Id;
=======
>>>>>>> Stashed changes
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "Networking")
public class Networking {
	//minju
<<<<<<< Updated upstream
	@Id
=======
>>>>>>> Stashed changes
	private String userid;
	private String friends_id;
	private String type;
	
}
