package com.varabc.problem.exception;

public class ProblemException extends RuntimeException {

    public ProblemException(String s) {
//        System.out.println("문제 삐용삐용 등록 못해요 삐용삐용");
        super(" 삐용삐용 문제발생 삐용삐용 : " + s);
    }

}
