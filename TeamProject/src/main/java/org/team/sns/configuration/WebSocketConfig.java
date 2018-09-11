package org.team.sns.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.team.sns.sockets.SignalingSocketHandler;

public class WebSocketConfig implements WebSocketConfigurer{

	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		// TODO Auto-generated method stub
		registry
        // handle on "/signal" endpoint
        .addHandler(signalingSocketHandler(), "/signal")
        // Allow cross origins
        .setAllowedOrigins("*");
	}
    @Bean
    public WebSocketHandler signalingSocketHandler() {
        return new SignalingSocketHandler();
    }
	

}
