
package com.socksbox.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private Long id;
    private String name;
    private String email;
    private String password;
    private String role;
    private String image;
    private String phone;
    private String address;
    private String city;
    private String state;
    private String zipCode;
}
