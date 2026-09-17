package mn.icode.service;

import java.util.Locale;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import mn.icode.model.User;
import mn.icode.repository.UserRepository;


@Service 
public class LearningUserDetailsService implements UserDetailsService {
    
    private final UserRepository userRepository;

    public LearningUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // name="username" to email Spring security
    @Override 
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        String normalizedEmail = email.trim().toLowerCase(Locale.ROOT);

        User user = userRepository.findByEmail(normalizedEmail).orElseThrow(() -> 
            new UsernameNotFoundException("User not found " + normalizedEmail));

        return org.springframework.security.core.userdetails.User.withUsername(user.getEmail())
            .password(user.getPassword())
            .roles(user.getRole().name())
            .disabled(!user.isEnabled())
            .build();
    }

}
