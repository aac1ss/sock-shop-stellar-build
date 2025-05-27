
package com.socksbox.config;

import com.socksbox.entity.*;
import com.socksbox.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private BrandRepository brandRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Create admin user
        if (!userRepository.existsByEmail("admin@socksbox.com")) {
            User admin = new User();
            admin.setName("Admin User");
            admin.setEmail("admin@socksbox.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole(User.Role.ADMIN);
            userRepository.save(admin);
        }

        // Create test customer
        if (!userRepository.existsByEmail("customer@socksbox.com")) {
            User customer = new User();
            customer.setName("Test Customer");
            customer.setEmail("customer@socksbox.com");
            customer.setPassword(passwordEncoder.encode("customer123"));
            customer.setRole(User.Role.CUSTOMER);
            User savedCustomer = userRepository.save(customer);

            // Create cart for customer
            Cart cart = new Cart();
            cart.setUser(savedCustomer);
            cartRepository.save(cart);
        }

        // Create categories
        if (categoryRepository.count() == 0) {
            List<Category> categories = Arrays.asList(
                new Category(null, "Athletic Socks", "High-performance socks for sports and exercise", "https://example.com/athletic.jpg"),
                new Category(null, "Dress Socks", "Elegant socks for formal occasions", "https://example.com/dress.jpg"),
                new Category(null, "Casual Socks", "Comfortable socks for everyday wear", "https://example.com/casual.jpg"),
                new Category(null, "Wool Socks", "Warm and cozy wool socks", "https://example.com/wool.jpg")
            );
            categoryRepository.saveAll(categories);
        }

        // Create brands
        if (brandRepository.count() == 0) {
            List<Brand> brands = Arrays.asList(
                new Brand(null, "Nike", "Just Do It", "https://example.com/nike-logo.png", true),
                new Brand(null, "Adidas", "Impossible is Nothing", "https://example.com/adidas-logo.png", true),
                new Brand(null, "Bombas", "One Purchased = One Donated", "https://example.com/bombas-logo.png", false),
                new Brand(null, "Stance", "The Uncommon Thread", "https://example.com/stance-logo.png", false)
            );
            brandRepository.saveAll(brands);
        }

        // Create products
        if (productRepository.count() == 0) {
            Category athletic = categoryRepository.findByName("Athletic Socks");
            Category dress = categoryRepository.findByName("Dress Socks");
            Category casual = categoryRepository.findByName("Casual Socks");
            Category wool = categoryRepository.findByName("Wool Socks");

            Brand nike = brandRepository.findAll().stream().filter(b -> b.getName().equals("Nike")).findFirst().orElse(null);
            Brand adidas = brandRepository.findAll().stream().filter(b -> b.getName().equals("Adidas")).findFirst().orElse(null);
            Brand bombas = brandRepository.findAll().stream().filter(b -> b.getName().equals("Bombas")).findFirst().orElse(null);
            Brand stance = brandRepository.findAll().stream().filter(b -> b.getName().equals("Stance")).findFirst().orElse(null);

            List<Product> products = Arrays.asList(
                createProduct("Nike Dri-FIT Running Socks", "Moisture-wicking running socks", new BigDecimal("19.99"), athletic, nike, true, 50),
                createProduct("Adidas Cushioned Crew Socks", "Comfortable cushioned socks for training", new BigDecimal("16.99"), athletic, adidas, false, 75),
                createProduct("Bombas Ankle Socks", "Premium comfort ankle socks", new BigDecimal("12.99"), casual, bombas, true, 100),
                createProduct("Stance Icon No Show", "Low-profile performance socks", new BigDecimal("14.99"), athletic, stance, false, 60),
                createProduct("Premium Dress Socks", "Elegant black dress socks", new BigDecimal("24.99"), dress, bombas, false, 40),
                createProduct("Merino Wool Hiking Socks", "Warm and durable wool socks", new BigDecimal("29.99"), wool, stance, true, 30)
            );
            productRepository.saveAll(products);
        }
    }

    private Product createProduct(String name, String description, BigDecimal price, Category category, Brand brand, boolean featured, int inventory) {
        Product product = new Product();
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.setCategory(category);
        product.setBrand(brand);
        product.setFeatured(featured);
        product.setInventory(inventory);
        product.setCreatedAt(LocalDateTime.now());
        
        // Add sample images
        product.setImages(Arrays.asList(
            "https://via.placeholder.com/400x400?text=" + name.replace(" ", "+"),
            "https://via.placeholder.com/400x400?text=" + name.replace(" ", "+") + "+2"
        ));
        
        // Add sample colors and sizes
        product.setColors(Arrays.asList("Black", "White", "Gray", "Navy"));
        product.setSizes(Arrays.asList("S", "M", "L", "XL"));
        
        return product;
    }
}
