package org.team.sns;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.team.sns.configuration.WebSocketConfig;

@SpringBootApplication
@Import(WebSocketConfig.class)
@EnableWebSocket
@EnableAutoConfiguration
public class TeamProjectApplication {	
	public static void main(String[] args) {
		SpringApplication.run(TeamProjectApplication.class, args);
	}
}
