package com.varabc.config;
import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.core.DefaultDockerClientConfig;
import com.github.dockerjava.core.DockerClientBuilder;
import com.github.dockerjava.jaxrs.JerseyDockerCmdExecFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DockerConfig {

    @Bean
    public DockerClient dockerClient() {
//        DefaultDockerClientConfig config = DefaultDockerClientConfig.createDefaultConfigBuilder()
//                .withDockerHost("tcp://127.0.0.1:2375") // default docker host
//                .build();

//        JerseyDockerCmdExecFactory execFactory = new JerseyDockerCmdExecFactory();
        System.out.println("builder in");
        return DockerClientBuilder.getInstance("tcp://127.0.0.1:2375")
                .build();
    }
}