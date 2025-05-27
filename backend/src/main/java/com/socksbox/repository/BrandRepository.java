
package com.socksbox.repository;

import com.socksbox.entity.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BrandRepository extends JpaRepository<Brand, Long> {
    List<Brand> findByFeatured(Boolean featured);
    boolean existsByName(String name);
}
