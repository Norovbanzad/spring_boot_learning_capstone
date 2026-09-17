package mn.icode.service;

import java.util.List;
import java.util.Locale;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import mn.icode.dto.RegisterRequest;
import mn.icode.dto.UserCreateRequest;
import mn.icode.dto.UserResponse;
import mn.icode.model.Role;
import mn.icode.model.User;
import mn.icode.repository.UserRepository;

@Service
public class UserService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional 
    public void registerCustomer(RegisterRequest request) {
        String email = request.getEmail().trim().toLowerCase(Locale.ROOT);

        if(userRepository.existsByEmail(email)) {
            System.out.println("Email is already registered");
        }

        User user = new User();

        user.setFirstName(request.getFirstName().trim());
        user.setLastName(request.getLastName().trim());
		user.setEmail(request.getEmail().trim());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        user.setRole(Role.CUSTOMER);
        user.setEnabled(true);
        userRepository.save(user);
    }

    @Transactional 
    public UserResponse createUser(UserCreateRequest request) {

        String email = request.email().trim().toLowerCase(Locale.ROOT);

        if(userRepository.existsByEmail(email)) {
            System.out.println("Email already exists: " + email);
        }

        User user = new User();
        user.setFirstName(request.firstName().trim());
        user.setLastName(request.lastName().trim());
        user.setEmail(request.email().trim());

        String encryptedPassword = passwordEncoder.encode(request.password());
        user.setPassword(encryptedPassword);
        
        user.setRole(request.role());
        user.setEnabled(true);

        User savedUser = userRepository.save(user);

        return toResponse(savedUser);
    }

    public List<UserResponse> findAllUsers() {
        return userRepository.findAll().stream().map(this::toResponse).toList();
    }

    // User -> UserResponse
    private UserResponse toResponse(User user) {
        return new UserResponse(
                    user.getId(),
                    user.getFirstName(),
                    user.getLastName(),
                    user.getEmail(),
                    user.getRole(),
                    user.isEnabled()
        );
    }
    
}
