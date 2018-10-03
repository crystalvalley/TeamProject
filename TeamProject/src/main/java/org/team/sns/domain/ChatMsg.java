package org.team.sns.domain;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@Table(name = "ChatMsg")
@EqualsAndHashCode(of = "id")
@JsonIgnoreProperties({"room"})
public class ChatMsg {

	@Id
	@Column(name = "msg_id")
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq")
	@SequenceGenerator(name = "seq", sequenceName = "Msg_seq", initialValue = 1, allocationSize = 1)
	private int id;

	@NotNull
	private String msg;

	@CreationTimestamp
	private Timestamp writeDay;

	@ManyToOne(optional=true)
	@JoinColumn(name = "writer", referencedColumnName = "user_id",updatable = false, nullable = true)
	private Member writer;

	@ManyToOne
	@JoinColumn(name = "room", referencedColumnName = "Room_id", updatable = false, nullable = false)
	private Room room;

}
