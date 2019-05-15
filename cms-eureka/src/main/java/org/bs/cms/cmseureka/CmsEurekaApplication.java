package org.bs.cms.cmseureka;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class CmsEurekaApplication {

    public static void main(String[] args) {
        SpringApplication.run(CmsEurekaApplication.class, args);
    }

}
