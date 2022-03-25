package com.soboksobok.soboksobok;

import com.soboksobok.soboksobok.config.properties.AppProperties;
import com.soboksobok.soboksobok.config.properties.CorsProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties({
		CorsProperties.class,
		AppProperties.class
})
public class SoboksobokApplication {

	public static void main(String[] args) {
		SpringApplication.run(SoboksobokApplication.class, args);
	}

}
