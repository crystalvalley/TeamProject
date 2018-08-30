package org.team.sns.domain;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIgnoreType;

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
@EqualsAndHashCode(of = "hashTag")
@JsonIgnoreProperties({"taggedBoards"})
public class Tag {
	@Id
	@Column(name = "tag_name")
	private String hashTag;

	@ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
	@JoinTable(name = "tagged_board", joinColumns = @JoinColumn(name = "tag_id", referencedColumnName = "tag_name"), inverseJoinColumns = @JoinColumn(name = "board_id", referencedColumnName = "board_id"))
	private List<Board> taggedBoards;
	
	public void addBoard(Board board) {
		taggedBoards.add(board);
		board.getTags().add(this);
	}
	
	public void removeBoard(Board board) {
		taggedBoards.remove(board);
		board.getTags().remove(this);
	}
}
