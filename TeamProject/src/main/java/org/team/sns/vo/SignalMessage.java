package org.team.sns.vo;

import java.util.List;

import org.team.sns.domain.Member;

import lombok.Data;

@Data
public class SignalMessage {
    private String type;
    private List<Member> destination;
    private Member sender;
    private int roomId;
    private Object data;
}
