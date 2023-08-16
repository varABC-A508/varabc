package com.varabc.battle.repository;

import com.varabc.battle.domain.entity.Review;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review,Long> {

    List<Review> findByReviewReceiveMemberNo(Long memberNo);

    Review findByReviewReceiveMemberNoAndCompetitionResultNo(Long memberNo, Long competitionResultNo);

    Review findByReviewNo(long reviewNo);
}
