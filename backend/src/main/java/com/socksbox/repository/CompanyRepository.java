
package com.socksbox.repository;

import com.socksbox.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {
    Optional<Company> findBySellerId(Long sellerId);
    Optional<Company> findByBusinessRegistrationNumber(String businessRegistrationNumber);
}
