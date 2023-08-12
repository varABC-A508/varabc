package com.varabc.battle.repository;

import com.varabc.battle.domain.entity.ReviewTag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewTagRepository extends JpaRepository<ReviewTag, Long> {

    ReviewTag findByReviewNo(Long reviewNo);
}
