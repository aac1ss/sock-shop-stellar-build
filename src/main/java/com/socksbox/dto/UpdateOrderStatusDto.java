
package com.socksbox.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateOrderStatusDto {
    @NotBlank(message = "Status is required")
    private String status;
}
