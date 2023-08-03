package com.varabc.validation.repository;

import com.varabc.validation.domain.entity.Submit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface SubmitRepository extends JpaRepository<Submit, Long> {

}
