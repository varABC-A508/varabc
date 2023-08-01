package com.varabc.validation.domain.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name="submit")
@Getter
@ToString
@NoArgsConstructor
public class Submit {
    @Id
    @Column(name = "submit_no", nullable = false, insertable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long submitNo;


    @Builder
    public Submit(long submitNo) {
        this.submitNo = submitNo;
    }
}
