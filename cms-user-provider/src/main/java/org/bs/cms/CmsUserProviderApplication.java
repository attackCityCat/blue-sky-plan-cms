package org.bs.cms;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
@MapperScan("org.bs.cms.mapper")
public class CmsUserProviderApplication {

    public static void main(String[] args) {
        SpringApplication.run(CmsUserProviderApplication.class, args);
    }

}
