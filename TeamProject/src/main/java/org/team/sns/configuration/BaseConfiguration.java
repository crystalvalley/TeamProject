package org.team.sns.configuration;

import java.nio.charset.Charset;

import javax.servlet.Filter;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.web.filter.CharacterEncodingFilter;

import com.dropbox.core.DbxRequestConfig;
import com.dropbox.core.v2.DbxClientV2;

/**
 * 
 * @author ParkHyeokjoon
 * @since 2018.09.02
 * @version 2018.09.02
 *
 */

@Configuration
public class BaseConfiguration {
    @Bean
    public HttpMessageConverter<String> responseBodyConverter() {
        return new StringHttpMessageConverter(Charset.forName("UTF-8"));
    }
 
    @Bean
    public Filter characterEncodingFilter() {
        CharacterEncodingFilter characterEncodingFilter = new CharacterEncodingFilter();
        characterEncodingFilter.setEncoding("UTF-8");
        characterEncodingFilter.setForceEncoding(true);
        return characterEncodingFilter;
    }
	@Bean
	public DbxClientV2 dbxClientV2() {
		final String ACCESS_TOKEN = "cx37rZ-UMDkAAAAAAAAAHcD4yB5DFmZD2-Yk_W6Aw4Swjokag2pVrOO4vpQRNFIX";
		DbxRequestConfig config = DbxRequestConfig.newBuilder("dropbox/java-tutorial").build();
		DbxClientV2 client = new DbxClientV2(config,ACCESS_TOKEN);
		return client;
	}

}
