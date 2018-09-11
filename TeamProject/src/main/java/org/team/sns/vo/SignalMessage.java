package org.team.sns.vo;

import lombok.Data;

@Data
public class SignalMessage {
    private String type;
    private String dest;
    private Object data;
}
