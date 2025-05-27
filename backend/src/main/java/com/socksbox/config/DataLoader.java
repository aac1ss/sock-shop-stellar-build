
package com.socksbox.config;

import com.socksbox.entity.*;
import com.socksbox.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
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
        if (userRepository.count() == 0) {
            loadData();
        }
    }

    private void loadData() {
        // Create Admin User
        User admin = new User();
        admin.setName("Admin User");
        admin.setEmail("admin@socksbox.com");
        admin.setPassword(passwordEncoder.encode("admin123"));
        admin.setRole(User.Role.ADMIN);
        admin = userRepository.save(admin);

        // Create Customer User
        User customer = new User();
        customer.setName("John Doe");
        customer.setEmail("customer@socksbox.com");
        customer.setPassword(passwordEncoder.encode("customer123"));
        customer.setRole(User.Role.CUSTOMER);
        customer = userRepository.save(customer);

        // Create Cart for Customer
        Cart cart = new Cart();
        cart.setUser(customer);
        cartRepository.save(cart);

        // Create Categories
        Category athletic = new Category();
        athletic.setName("Athletic");
        athletic.setDescription("Sports and athletic socks");
        athletic.setImageUrl("https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b");
        athletic = categoryRepository.save(athletic);

        Category casual = new Category();
        casual.setName("Casual");
        casual.setDescription("Everyday comfort socks");
        casual.setImageUrl("https://images.unsplash.com/photo-1586350977838-0c22d4e85122");
        casual = categoryRepository.save(casual);

        Category dress = new Category();
        dress.setName("Dress");
        dress.setDescription("Formal and business socks");
        dress.setImageUrl("https://images.unsplash.com/photo-1594633312681-425c7b97ccd1");
        dress = categoryRepository.save(dress);

        // Create Brands
        Brand nike = new Brand();
        nike.setName("Nike");
        nike.setDescription("Premium athletic socks");
        nike.setLogo("https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b");
        nike.setFeatured(true);
        nike = brandRepository.save(nike);

        Brand adidas = new Brand();
        adidas.setName("Adidas");
        adidas.setDescription("Performance socks for athletes");
        adidas.setLogo("https://images.unsplash.com/photo-1586350977838-0c22d4e85122");
        adidas.setFeatured(true);
        adidas = brandRepository.save(adidas);

        Brand bombas = new Brand();
        bombas.setName("Bombas");
        bombas.setDescription("Comfortable everyday socks");
        bombas.setLogo("https://images.unsplash.com/photo-1594633312681-425c7b97ccd1");
        bombas.setFeatured(false);
        bombas = brandRepository.save(bombas);

        // Create Products
        Product product1 = new Product();
        product1.setName("Athletic Performance Socks");
        product1.setDescription("High-performance athletic socks with moisture-wicking technology");
        product1.setPrice(new BigDecimal("19.99"));
        product1.setInventory(100);
        product1.setFeatured(true);
        product1.setCategory(athletic);
        product1.setBrand(nike);
        product1.setImages(Arrays.asList(
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
            "https://images.unsplash.com/photo-1586350977838-0c22d4e85122"
        ));
        product1.setColors(Arrays.asList("Black", "White", "Gray"));
        product1.setSizes(Arrays.asList("S", "M", "L", "XL"));
        productRepository.save(product1);

        Product product2 = new Product();
        product2.setName("Casual Cotton Crew Socks");
        product2.setDescription("Comfortable cotton crew socks for everyday wear");
        product2.setPrice(new BigDecimal("12.99"));
        product2.setInventory(150);
        product2.setFeatured(true);
        product2.setCategory(casual);
        product2.setBrand(bombas);
        product2.setImages(Arrays.asList(
            "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1",
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b"
        ));
        product2.setColors(Arrays.asList("Navy", "Khaki", "Brown"));
        product2.setSizes(Arrays.asList("S", "M", "L"));
        productRepository.save(product2);

        Product product3 = new Product();
        product3.setName("Dress Formal Socks");
        product3.setDescription("Elegant dress socks for formal occasions");
        product3.setPrice(new BigDecimal("24.99"));
        product3.setInventory(75);
        product3.setFeatured(false);
        product3.setCategory(dress);
        product3.setBrand(adidas);
        product3.setImages(Arrays.asList(
            "https://images.unsplash.com/photo-1586350977838-0c22d4e85122"
        ));
        product3.setColors(Arrays.asList("Black", "Navy", "Charcoal"));
        product3.setSizes(Arrays.asList("M", "L", "XL"));
        productRepository.save(product3);

        System.out.println("Sample data loaded successfully!");
        System.out.println("Admin login: admin@socksbox.com / admin123");
        System.out.println("Customer login: customer@socksbox.com / customer123");
    }
}
