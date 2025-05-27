
package com.socksbox.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Address {
    
    private String street;
    
    private String city;
    
    private String state;
    
    @Column(name = "zip_code")
    private String zipCode;
    
    private String country;
}
