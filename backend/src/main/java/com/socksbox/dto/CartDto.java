
package com.socksbox.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartDto {
    private Long id;
    private Long userId;
    private List<CartItemDto> items = new ArrayList<>();
    private BigDecimal totalAmount = BigDecimal.ZERO;
}
