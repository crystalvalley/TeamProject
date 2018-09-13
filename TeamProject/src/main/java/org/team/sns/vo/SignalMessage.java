package org.team.sns.vo;

import lombok.Data;

@Data
public class SignalMessage {
    private String type;
    private String dest;
    private String sender;
    private Object data;
}
