package com.example.selfcourier.repository;

import com.example.selfcourier.entity.BillEstimate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BillEstimateRepository extends JpaRepository<BillEstimate, String> {

    Optional<BillEstimate> findByPost_PostID(String postId);
}
