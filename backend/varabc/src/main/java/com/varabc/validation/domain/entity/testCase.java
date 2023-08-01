package com.varabc.validation.domain.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="testcase")
public class testCase {
    @Id
    @Column(name = "testcase_no", nullable = true, insertable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int testcaseNo;

}
