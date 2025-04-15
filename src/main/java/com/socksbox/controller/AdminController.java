
package com.socksbox.controller;

import com.socksbox.dto.AnalyticsDataDto;
import com.socksbox.dto.ProductSalesDto;
import com.socksbox.dto.UserDto;
import com.socksbox.service.AnalyticsService;
import com.socksbox.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasAuthority('ADMIN')")
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private AnalyticsService analyticsService;

    // Customer management endpoints
    @GetMapping("/customers")
    public ResponseEntity<List<UserDto>> getAllCustomers() {
        return ResponseEntity.ok(userService.getAllCustomers());
    }

    @GetMapping("/customers/{id}")
    public ResponseEntity<UserDto> getCustomerById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getCustomerById(id));
    }

    @PutMapping("/customers/{id}")
    public ResponseEntity<UserDto> updateCustomer(@PathVariable Long id, @Valid @RequestBody UserDto userDto) {
        return ResponseEntity.ok(userService.updateUser(id, userDto));
    }

    // Analytics endpoints
    @GetMapping("/analytics/sales")
    public ResponseEntity<AnalyticsDataDto> getSalesData() {
        return ResponseEntity.ok(analyticsService.getSalesData());
    }

    @GetMapping("/analytics/products")
    public ResponseEntity<List<ProductSalesDto>> getProductPerformanceData() {
        return ResponseEntity.ok(analyticsService.getProductPerformanceData());
    }

    @GetMapping("/analytics/customers")
    public ResponseEntity<Map<String, Long>> getCustomerAcquisitionData() {
        return ResponseEntity.ok(analyticsService.getCustomerAcquisitionData());
    }
}
