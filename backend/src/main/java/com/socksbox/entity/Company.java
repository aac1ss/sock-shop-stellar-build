
package com.socksbox.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "companies")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Company {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToOne
    @JoinColumn(name = "seller_id", nullable = false)
    private User seller;
    
    @Column(nullable = false)
    private String companyName;
    
    @Column(columnDefinition = "TEXT")
    private String companyDescription;
    
    private String website;
    
    @Column(nullable = false, unique = true)
    private String businessRegistrationNumber;
    
    @Column(nullable = false)
    private String taxId;
    
    @Column(columnDefinition = "TEXT")
    private String businessAddress;
    
    @Column(nullable = false)
    private String contactPhone;
    
    @Column(nullable = false)
    private String contactEmail;
    
    @Enumerated(EnumType.STRING)
    private CompanyStatus status = CompanyStatus.PENDING;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
    
    @Column(name = "approved_at")
    private LocalDateTime approvedAt;
    
    public enum CompanyStatus {
        PENDING, APPROVED, REJECTED, SUSPENDED
    }
}
