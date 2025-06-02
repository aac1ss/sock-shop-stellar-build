
package com.socksbox.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Email;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompanyRegistrationDto {
    @NotBlank(message = "Company name is required")
    private String companyName;
    
    @NotBlank(message = "Company description is required")
    private String companyDescription;
    
    private String website;
    
    @NotBlank(message = "Business registration number is required")
    private String businessRegistrationNumber;
    
    @NotBlank(message = "Tax ID is required")
    private String taxId;
    
    @NotBlank(message = "Business address is required")
    private String businessAddress;
    
    @NotBlank(message = "Contact phone is required")
    private String contactPhone;
    
    @Email(message = "Valid email is required")
    private String contactEmail;
}
