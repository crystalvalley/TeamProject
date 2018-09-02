package org.team.sns.domain;

import java.io.Serializable;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(of= {"listName","owner"})
public class CustomListPK implements Serializable{
	private String listName;
	private String owner;
}
