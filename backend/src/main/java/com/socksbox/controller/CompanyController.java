
package com.socksbox.controller;

import com.socksbox.dto.CompanyRegistrationDto;
import com.socksbox.entity.Company;
import com.socksbox.service.CompanyService;
import com.socksbox.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/companies")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080"})
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    @PreAuthorize("hasAuthority('SELLER')")
    public ResponseEntity<Company> registerCompany(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody CompanyRegistrationDto registrationDto) {
        String email = userDetails.getUsername();
        Long sellerId = userService.getUserByEmail(email).getId();
        Company company = companyService.registerCompany(sellerId, registrationDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(company);
    }

    @GetMapping("/my-company")
    @PreAuthorize("hasAuthority('SELLER')")
    public ResponseEntity<Company> getMyCompany(@AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();
        Long sellerId = userService.getUserByEmail(email).getId();
        Optional<Company> company = companyService.getCompanyBySellerId(sellerId);
        return company.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<Company>> getAllCompanies() {
        List<Company> companies = companyService.getAllCompanies();
        return ResponseEntity.ok(companies);
    }

    @PutMapping("/{id}/approve")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Company> approveCompany(@PathVariable Long id) {
        Company company = companyService.approveCompany(id);
        return ResponseEntity.ok(company);
    }

    @PutMapping("/{id}/reject")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Company> rejectCompany(@PathVariable Long id) {
        Company company = companyService.rejectCompany(id);
        return ResponseEntity.ok(company);
    }
}
