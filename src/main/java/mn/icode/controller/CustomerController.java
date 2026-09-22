package mn.icode.controller;

import java.security.Principal;
import java.util.List;
import java.util.Locale;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import mn.icode.dto.EnrollmentResponse;
import mn.icode.model.User;
import mn.icode.repository.UserRepository;
import mn.icode.service.EnrollmentService;

@Controller 
public class CustomerController {
	
	private final EnrollmentService enrollmentService;
	private final UserRepository userRepository;

	public CustomerController(EnrollmentService enrollmentService, UserRepository userRepository) {
		this.enrollmentService = enrollmentService;
		this.userRepository = userRepository;
	}

    @GetMapping("/student/dashboard")
	public String customerDashboard(Principal principal, Model model) {
		
		model.addAttribute("email", principal.getName());
		
		return "customer/dashboard";
	}

	@GetMapping("/api/student/enrollments")
	@ResponseBody
	public List<EnrollmentResponse> myEnrollments(Principal principal) {
		String email = principal.getName().trim().toLowerCase(Locale.ROOT);
		User user = userRepository.findByEmail(email).orElseThrow();
		return enrollmentService.findEnrollmentsByUserId(user.getId());
	}
}