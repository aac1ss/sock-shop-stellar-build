
package com.socksbox.controller;

import com.socksbox.dto.PaymentRequestDto;
import com.socksbox.dto.PaymentResponseDto;
import com.socksbox.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080"})
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/initiate")
    public ResponseEntity<PaymentResponseDto> initiatePayment(@Valid @RequestBody PaymentRequestDto paymentRequest) {
        PaymentResponseDto response = paymentService.initiatePrimaryPayment(paymentRequest);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/verify")
    public ResponseEntity<PaymentResponseDto> verifyPayment(
            @RequestParam String oid,
            @RequestParam String refId,
            @RequestParam String amt) {
        PaymentResponseDto response = paymentService.verifyEsewaPayment(oid, refId, amt);
        return ResponseEntity.ok(response);
    }
}
