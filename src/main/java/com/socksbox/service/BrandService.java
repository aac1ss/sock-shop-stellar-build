
package com.socksbox.service;

import com.socksbox.dto.BrandDto;
import com.socksbox.entity.Brand;
import com.socksbox.exception.ResourceNotFoundException;
import com.socksbox.repository.BrandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BrandService {

    @Autowired
    private BrandRepository brandRepository;

    public List<BrandDto> getAllBrands() {
        return brandRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<BrandDto> getFeaturedBrands() {
        return brandRepository.findByFeatured(true).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public BrandDto getBrandById(Long id) {
        Brand brand = brandRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Brand not found with id " + id));
        return convertToDto(brand);
    }

    public BrandDto createBrand(BrandDto brandDto) {
        if (brandRepository.existsByName(brandDto.getName())) {
            throw new RuntimeException("Brand with name " + brandDto.getName() + " already exists");
        }

        Brand brand = new Brand();
        brand.setName(brandDto.getName());
        brand.setDescription(brandDto.getDescription());
        brand.setLogo(brandDto.getLogo());
        brand.setFeatured(brandDto.getFeatured());
        
        Brand savedBrand = brandRepository.save(brand);
        return convertToDto(savedBrand);
    }

    public BrandDto updateBrand(Long id, BrandDto brandDto) {
        Brand brand = brandRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Brand not found with id " + id));
        
        // Check if name is being changed and if it already exists
        if (!brand.getName().equals(brandDto.getName()) && 
            brandRepository.existsByName(brandDto.getName())) {
            throw new RuntimeException("Brand with name " + brandDto.getName() + " already exists");
        }
        
        brand.setName(brandDto.getName());
        brand.setDescription(brandDto.getDescription());
        brand.setLogo(brandDto.getLogo());
        brand.setFeatured(brandDto.getFeatured());
        
        Brand updatedBrand = brandRepository.save(brand);
        return convertToDto(updatedBrand);
    }

    public void deleteBrand(Long id) {
        if (!brandRepository.existsById(id)) {
            throw new ResourceNotFoundException("Brand not found with id " + id);
        }
        brandRepository.deleteById(id);
    }

    private BrandDto convertToDto(Brand brand) {
        BrandDto brandDto = new BrandDto();
        brandDto.setId(brand.getId());
        brandDto.setName(brand.getName());
        brandDto.setDescription(brand.getDescription());
        brandDto.setLogo(brand.getLogo());
        brandDto.setFeatured(brand.getFeatured());
        return brandDto;
    }
}
