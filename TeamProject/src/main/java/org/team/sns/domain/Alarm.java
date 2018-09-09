package org.team.sns.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 
 * @author Gil Joonsung
 * @since 18.09.07
 * @version 18.09.07
 *
 */
// [알람 테이블]

@Data
@Entity
@Table(name = "Alarms")
@EqualsAndHashCode(of = "id")
public class Alarm {
	@Id
	@Column(name="alarm_id")
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq")
	@SequenceGenerator(name = "seq", sequenceName = "Alarm_seq", initialValue = 1, allocationSize = 1)
	private int id;
	// 어디서부터 온 알람인지
	@NotNull
	@OneToOne
	@JoinColumn(name="actor_id", referencedColumnName = "user_id")
	private Member actor;
	//누구한테 온 알람인지
	
	@NotNull
	@OneToOne
	@JoinColumn(name="receiver_id", referencedColumnName = "user_id")
	private Member receiver;
	//멘션되면 
	private String mentioned;
	// 친구 요청 받았을 때 누구로 부터 받았는지
	private String requestingFriendship;
	// 쪽지 받았을 때 누구한테 받았는지
	private int gotmessage;
	@NotNull
	private java.sql.Timestamp creationDate;
	//이 알람을 읽었는지
	@NotNull
	private int state;
	
}
