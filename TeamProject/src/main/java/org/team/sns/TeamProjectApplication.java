package org.team.sns;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.socket.config.annotation.EnableWebSocket;


@SpringBootApplication
@EnableWebSocket
@EnableAutoConfiguration
public class TeamProjectApplication {	
	public static void main(String[] args) {
		SpringApplication.run(TeamProjectApplication.class, args);
	}
}
