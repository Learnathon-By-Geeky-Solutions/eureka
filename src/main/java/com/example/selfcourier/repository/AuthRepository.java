package com.example.selfcourier.repository;


import com.example.selfcourier.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AuthRepository extends JpaRepository<Users,Long> {
    Optional<Users> findByEmail(String email);

//    @Query(value = "SELECT * from selfcourier.user u where u.student_id = ?1",nativeQuery = true)
//    Optional<User> findByStudentId(String student_id);

   ;
//    @Query(value="SELECT * FROM train.user u WHERE u.user_id = ?1",nativeQuery = true )
//    Optional<User> findUserById(Long Id);
}
