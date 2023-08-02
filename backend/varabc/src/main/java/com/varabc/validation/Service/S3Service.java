package com.varabc.validation.Service;

import java.io.IOException;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.ResponseBytes;
import software.amazon.awssdk.core.sync.ResponseTransformer;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.stream.Collectors;

@Service
public class S3Service {

    private final S3Client s3Client;

    public S3Service() {
        this.s3Client = S3Client.builder()
                .region(Region.US_EAST_1) // Your region here
                .build();
    }

    public String getFileContent(String bucketName, String key) throws IOException {
        GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .build();

        ResponseBytes<GetObjectResponse> objectBytes =
                s3Client.getObject(getObjectRequest, ResponseTransformer.toBytes());

        try (Reader reader = new InputStreamReader(objectBytes.asInputStream());
                BufferedReader bufferedReader = new BufferedReader(reader)) {

            return bufferedReader.lines().collect(Collectors.joining("\n"));

        } catch (IOException e) {
            throw new IOException(e);
        }
    }
}

