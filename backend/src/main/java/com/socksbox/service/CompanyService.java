
package com.socksbox.service;

import com.socksbox.dto.CompanyRegistrationDto;
import com.socksbox.entity.Company;
import com.socksbox.entity.User;
import com.socksbox.exception.ResourceNotFoundException;
import com.socksbox.repository.CompanyRepository;
import com.socksbox.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CompanyService {

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public Company registerCompany(Long sellerId, CompanyRegistrationDto registrationDto) {
        User seller = userRepository.findById(sellerId)
                .orElseThrow(() -> new ResourceNotFoundException("Seller not found with id " + sellerId));

        // Check if company already exists for this seller
        Optional<Company> existingCompany = companyRepository.findBySellerId(sellerId);
        if (existingCompany.isPresent()) {
            throw new RuntimeException("Company already registered for this seller");
        }

        // Check if business registration number is unique
        Optional<Company> existingByRegNumber = companyRepository.findByBusinessRegistrationNumber(registrationDto.getBusinessRegistrationNumber());
        if (existingByRegNumber.isPresent()) {
            throw new RuntimeException("Business registration number already exists");
        }

        Company company = new Company();
        company.setSeller(seller);
        company.setCompanyName(registrationDto.getCompanyName());
        company.setCompanyDescription(registrationDto.getCompanyDescription());
        company.setWebsite(registrationDto.getWebsite());
        company.setBusinessRegistrationNumber(registrationDto.getBusinessRegistrationNumber());
        company.setTaxId(registrationDto.getTaxId());
        company.setBusinessAddress(registrationDto.getBusinessAddress());
        company.setContactPhone(registrationDto.getContactPhone());
        company.setContactEmail(registrationDto.getContactEmail());
        company.setStatus(Company.CompanyStatus.PENDING);

        return companyRepository.save(company);
    }

    public Optional<Company> getCompanyBySellerId(Long sellerId) {
        return companyRepository.findBySellerId(sellerId);
    }

    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    @Transactional
    public Company approveCompany(Long companyId) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new ResourceNotFoundException("Company not found with id " + companyId));

        company.setStatus(Company.CompanyStatus.APPROVED);
        company.setApprovedAt(LocalDateTime.now());
        return companyRepository.save(company);
    }

    @Transactional
    public Company rejectCompany(Long companyId) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new ResourceNotFoundException("Company not found with id " + companyId));

        company.setStatus(Company.CompanyStatus.REJECTED);
        return companyRepository.save(company);
    }
}
