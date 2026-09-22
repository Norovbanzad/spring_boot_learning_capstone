package mn.icode.controller;

import java.security.Principal;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class CoursePageController {
	
	@GetMapping("admin/courses")
	public String coursesPageForAdmin(Principal principal, Model model) {
		model.addAttribute("email", principal.getName());
		return "admin/add-courses";
	}
	
	@GetMapping("student/courses")
	public String coursesPageForStudent(Principal principal, Model model) {
		model.addAttribute("email", principal.getName());
		return "customer/student-courses";
	}

	@GetMapping("student/enrollments")
	public String enrollmentsPageForStudent(Principal principal, Model model) {
		model.addAttribute("email", principal.getName());
		return "customer/enrollments";
	}

	@GetMapping("courses")
	public String coursesPage() {
		return "courses";
	}
}
