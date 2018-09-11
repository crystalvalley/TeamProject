package org.team.sns.configuration;

import java.io.IOException;
import java.util.logging.SocketHandler;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
public class WebSocketConfig implements WebSocketConfigurer{
    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry webSocketHandlerRegistry) {
        try {
			webSocketHandlerRegistry
			        // handle on "/signal" endpoint
			        .addHandler(signalingSocketHandler(), "/signal")
			        // Allow cross origins
			        .setAllowedOrigins("*");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    }

    @Bean
    public WebSocketHandler signalingSocketHandler() throws IOException {
        return (WebSocketHandler) new SocketHandler();
    }
}
