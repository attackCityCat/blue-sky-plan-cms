package org.bs.cms.config;

import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMqConfig {

    /**
     * 修改价格的队列
     * @return
     */
    @Bean
    public Queue getQueue(){
        //此处为队列的名称
        return new Queue("EditShop",true);
    }


    /**
     * 下架以后的队列
     * @return
     */
    @Bean
    public Queue getQueue1(){
        //此处为队列的名称
        return new Queue("delShopa",true);
    }


}
