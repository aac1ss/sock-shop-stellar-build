
package com.socksbox.service;

import com.socksbox.dto.UserDto;
import com.socksbox.entity.Cart;
import com.socksbox.entity.User;
import com.socksbox.exception.ResourceNotFoundException;
import com.socksbox.repository.CartRepository;
import com.socksbox.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<UserDto> getAllCustomers() {
        return userRepository.findByRole(User.Role.CUSTOMER).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public UserDto getCustomerById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + id));
        
        if (user.getRole() != User.Role.CUSTOMER) {
            throw new ResourceNotFoundException("Customer not found with id " + id);
        }
        
        return convertToDto(user);
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email " + email));
    }

    public UserDto getUserDtoByEmail(String email) {
        User user = getUserByEmail(email);
        return convertToDto(user);
    }

    @Transactional
    public UserDto createUser(UserDto userDto, User.Role role) {
        if (userRepository.existsByEmail(userDto.getEmail())) {
            throw new RuntimeException("Email is already in use");
        }

        User user = new User();
        user.setName(userDto.getName());
        user.setEmail(userDto.getEmail());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setRole(role);
        user.setImage(userDto.getImage());
        user.setPhone(userDto.getPhone());
        user.setAddress(userDto.getAddress());
        user.setCity(userDto.getCity());
        user.setState(userDto.getState());
        user.setZipCode(userDto.getZipCode());

        User savedUser = userRepository.save(user);
        
        // Create empty cart for user
        Cart cart = new Cart();
        cart.setUser(savedUser);
        cartRepository.save(cart);
        
        return convertToDto(savedUser);
    }

    public UserDto updateUser(Long id, UserDto userDto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + id));
        
        user.setName(userDto.getName());
        
        if (userDto.getPassword() != null && !userDto.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        }
        
        if (userDto.getImage() != null) {
            user.setImage(userDto.getImage());
        }
        
        User updatedUser = userRepository.save(user);
        return convertToDto(updatedUser);
    }

    private UserDto convertToDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setName(user.getName());
        userDto.setEmail(user.getEmail());
        userDto.setRole(user.getRole().name());
        userDto.setImage(user.getImage());
        userDto.setPhone(user.getPhone());
        userDto.setAddress(user.getAddress());
        userDto.setCity(user.getCity());
        userDto.setState(user.getState());
        userDto.setZipCode(user.getZipCode());
        return userDto;
    }
}
