package org.team.sns.domain;

import java.io.Serializable;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(of = {"member","target"})
public class NetworkingPK implements Serializable{
	public String member;
	public String target;
}
