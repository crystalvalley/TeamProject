package org.team.sns.domain;

import java.sql.Timestamp;

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
import lombok.ToString;

/**
 * 
 * @author GilJoonsung
 * @since 18.09.10
 * @version 18.09.10
 *
 */

@Data
@Entity
@Table (name="Alarms")
@EqualsAndHashCode(of="alarmId")
@ToString(exclude = {})
public class Alarm {
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator = "seq")
	@SequenceGenerator(name="seq", sequenceName="Alarms_seq", initialValue=1, allocationSize=1)
	private int alarmId;
	
	@NotNull
	private Timestamp usdate;
	@NotNull
	private boolean mentioned;
	@NotNull
	private boolean reqFriendship;
	
	@NotNull
	private boolean checked;
	
	@ManyToOne
	@JoinColumn(name="actor_id", referencedColumnName="user_id", updatable = false, nullable=false)
	@NotNull
	private Member actor_id;
	
	
	@NotNull
	private String receiver_id;
	
	
}
