package org.team.sns.domain;

<<<<<<< Updated upstream
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
=======
>>>>>>> Stashed changes
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
<<<<<<< Updated upstream
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.Check;

import lombok.Data;


=======
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.Data;

>>>>>>> Stashed changes
@Data
@Entity
@Table(name = "Room")
public class Room {
	//minju
	@Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seq")
	@SequenceGenerator(name="seq",sequenceName="Room_seq", initialValue=1, allocationSize=1)
<<<<<<< Updated upstream
	private int sequence; // 참조 시퀀스
=======
	private int Room_seq; // 참조 시퀀스
>>>>>>> Stashed changes
	private String content; // 채팅 내용 
	
}
