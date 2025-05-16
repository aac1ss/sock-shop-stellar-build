
package com.socksbox.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BrandDto {
    private Long id;
    
    @NotBlank(message = "Brand name is required")
    private String name;
    
    private String description;
    
    private String logo;
    
    private Boolean featured = false;
}
