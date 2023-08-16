package com.varabc.validation.Service;

import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.command.CreateContainerResponse;
import com.github.dockerjava.api.model.Container;
import com.github.dockerjava.api.model.ExposedPort;
import com.github.dockerjava.api.model.PortBinding;
import com.github.dockerjava.core.DockerClientBuilder;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.net.ServerSocket;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;



@Service
@RequiredArgsConstructor
public class DockerService {
    private DockerClient dockerClient= DockerClientBuilder.getInstance("tcp://172.17.0.1:2376").build();

    private int findAvailablePort(int startPort, int endPort) throws IOException {
        for (int port = startPort; port <= endPort; port++) {
            try (ServerSocket serverSocket = new ServerSocket(port)) {
                // If the server socket is successfully created, the port is available
                return port;
            } catch (IOException e) {
                // Port is in use, try next port
            }
        }
        throw new IOException("No available port found in range " + startPort + "-" + endPort);
    }
    public String startPythonEvaluationContainer() {
        System.out.println("start making python container");
        // 기존에 동일한 이름의 컨테이너가 존재하는지 확인
        List<Container> existingContainers = dockerClient.listContainersCmd()
                .withShowAll(true)
                .withNameFilter(Arrays.asList("isolatedPythonValidationRequestContainer"))
                .exec();

        for (Container container : existingContainers) {
            // 동일한 이름의 컨테이너가 존재하면 제거
            dockerClient.removeContainerCmd(container.getId())
                    .withForce(true)  // 강제로 컨테이너를 종료하고 제거
                    .exec();
        }
        CreateContainerResponse container = dockerClient.createContainerCmd("bincan98/pythonvalidation:0.1.0")
                .withName("isolatedPythonValidationRequestContainer")
                .withExposedPorts(new ExposedPort(5005))
                .withPortBindings(PortBinding.parse("5006:5000"))
                .withCmd("python","app.py")  // Python으로 HTTP 서버 시작
                .exec();
        // 도커 컨테이너 시작
        System.out.println("creation success");
        System.out.println(container.getId());
        dockerClient.startContainerCmd(container.getId()).exec();
        return container.getId();
    }
    public void stopPythonEvaluationContainer(String containerId) {
        // 도커 컨테이너 종료
        System.out.println("stopped");
        dockerClient.stopContainerCmd(containerId).exec();
        dockerClient.removeContainerCmd(containerId).exec();
    }
    public void restartContainer(String containerName) {
        List<Container> containers = dockerClient.listContainersCmd().withShowAll(true).exec();
        for (Container container : containers) {
            for (String name : container.getNames()) {
                if (name.contains(containerName)) {
                    dockerClient.restartContainerCmd(container.getId()).exec();
                    return;
                }
            }
        }
    }

    public String pingDocker() {
        try {
            dockerClient.pingCmd().exec();
            return "Successfully connected to Docker!";
        } catch (Exception e) {
            return "Failed to connect to Docker: " + e.getMessage();
        }
    }
}
