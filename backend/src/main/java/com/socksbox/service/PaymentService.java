
package com.socksbox.service;

import com.socksbox.dto.PaymentRequestDto;
import com.socksbox.dto.PaymentResponseDto;
import com.socksbox.entity.Order;
import com.socksbox.entity.Payment;
import com.socksbox.exception.ResourceNotFoundException;
import com.socksbox.repository.OrderRepository;
import com.socksbox.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.UUID;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Value("${esewa.merchant.code:EPAYTEST}")
    private String esewaServiceCode;

    @Value("${esewa.success.url:http://localhost:3000/payment/success}")
    private String successUrl;

    @Value("${esewa.failure.url:http://localhost:3000/payment/failure}")
    private String failureUrl;

    @Transactional
    public PaymentResponseDto initiatePrimaryPayment(PaymentRequestDto paymentRequest) {
        Order order = orderRepository.findById(paymentRequest.getOrderId())
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id " + paymentRequest.getOrderId()));

        // Create payment record
        Payment payment = new Payment();
        payment.setOrder(order);
        payment.setAmount(paymentRequest.getAmount());
        payment.setPaymentMethod(Payment.PaymentMethod.valueOf(paymentRequest.getPaymentMethod().toUpperCase()));
        payment.setTransactionId(UUID.randomUUID().toString());
        payment.setStatus(Payment.PaymentStatus.PENDING);

        Payment savedPayment = paymentRepository.save(payment);

        if (payment.getPaymentMethod() == Payment.PaymentMethod.ESEWA) {
            return initiateEsewaPayment(savedPayment, paymentRequest);
        } else if (payment.getPaymentMethod() == Payment.PaymentMethod.CASH_ON_DELIVERY) {
            return initiateCODPayment(savedPayment);
        }

        throw new RuntimeException("Unsupported payment method: " + paymentRequest.getPaymentMethod());
    }

    private PaymentResponseDto initiateEsewaPayment(Payment payment, PaymentRequestDto paymentRequest) {
        try {
            String amount = payment.getAmount().toString();
            String productCode = payment.getOrder().getId().toString();
            String transactionId = payment.getTransactionId();

            // Build eSewa payment URL
            StringBuilder paymentUrl = new StringBuilder("https://uat.esewa.com.np/epay/main");
            paymentUrl.append("?tAmt=").append(URLEncoder.encode(amount, StandardCharsets.UTF_8));
            paymentUrl.append("&amt=").append(URLEncoder.encode(amount, StandardCharsets.UTF_8));
            paymentUrl.append("&txAmt=0&psc=0&pdc=0");
            paymentUrl.append("&scd=").append(URLEncoder.encode(esewaServiceCode, StandardCharsets.UTF_8));
            paymentUrl.append("&pid=").append(URLEncoder.encode(productCode, StandardCharsets.UTF_8));
            paymentUrl.append("&su=").append(URLEncoder.encode(successUrl + "?oid=" + payment.getOrder().getId(), StandardCharsets.UTF_8));
            paymentUrl.append("&fu=").append(URLEncoder.encode(failureUrl + "?oid=" + payment.getOrder().getId(), StandardCharsets.UTF_8));

            PaymentResponseDto response = new PaymentResponseDto();
            response.setPaymentUrl(paymentUrl.toString());
            response.setTransactionId(transactionId);
            response.setStatus("REDIRECT");
            response.setMessage("Redirect to eSewa for payment");

            return response;
        } catch (Exception e) {
            throw new RuntimeException("Failed to initiate eSewa payment: " + e.getMessage());
        }
    }

    private PaymentResponseDto initiateCODPayment(Payment payment) {
        payment.setStatus(Payment.PaymentStatus.PENDING);
        paymentRepository.save(payment);

        PaymentResponseDto response = new PaymentResponseDto();
        response.setTransactionId(payment.getTransactionId());
        response.setStatus("SUCCESS");
        response.setMessage("Cash on Delivery order placed successfully");

        return response;
    }

    @Transactional
    public PaymentResponseDto verifyEsewaPayment(String oid, String refId, String amt) {
        try {
            Long orderId = Long.parseLong(oid);
            Payment payment = paymentRepository.findByOrderId(orderId)
                    .orElseThrow(() -> new ResourceNotFoundException("Payment not found for order " + orderId));

            // Verify payment with eSewa
            String verificationUrl = "https://uat.esewa.com.np/epay/transrec";
            RestTemplate restTemplate = new RestTemplate();
            
            StringBuilder verifyUrl = new StringBuilder(verificationUrl);
            verifyUrl.append("?amt=").append(amt);
            verifyUrl.append("&scd=").append(esewaServiceCode);
            verifyUrl.append("&rid=").append(refId);
            verifyUrl.append("&pid=").append(orderId);

            String response = restTemplate.getForObject(verifyUrl.toString(), String.class);

            if ("Success".equalsIgnoreCase(response)) {
                payment.setStatus(Payment.PaymentStatus.COMPLETED);
                payment.setEsewaRefId(refId);
                paymentRepository.save(payment);

                // Update order status
                Order order = payment.getOrder();
                order.setStatus(Order.Status.CONFIRMED);
                orderRepository.save(order);

                PaymentResponseDto paymentResponse = new PaymentResponseDto();
                paymentResponse.setTransactionId(payment.getTransactionId());
                paymentResponse.setStatus("SUCCESS");
                paymentResponse.setMessage("Payment verified successfully");
                return paymentResponse;
            } else {
                payment.setStatus(Payment.PaymentStatus.FAILED);
                payment.setFailureReason("eSewa verification failed");
                paymentRepository.save(payment);

                PaymentResponseDto paymentResponse = new PaymentResponseDto();
                paymentResponse.setTransactionId(payment.getTransactionId());
                paymentResponse.setStatus("FAILED");
                paymentResponse.setMessage("Payment verification failed");
                return paymentResponse;
            }
        } catch (Exception e) {
            throw new RuntimeException("Payment verification failed: " + e.getMessage());
        }
    }
}
