
package com.socksbox.repository;

import com.socksbox.entity.Brand;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BrandRepository extends JpaRepository<Brand, Long> {
    List<Brand> findByFeatured(Boolean featured);
    Brand findByName(String name);
    boolean existsByName(String name);
}
