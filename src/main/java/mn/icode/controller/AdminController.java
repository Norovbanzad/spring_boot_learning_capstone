package mn.icode.controller;

import java.security.Principal;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller 
@RequestMapping("/")
public class AdminController {
    
    @GetMapping("admin/dashboard")
    public String adminDashboard(Principal principal, Model model) {
        model.addAttribute("email", principal.getName());
        return "admin/dashboard";
    }
    
    @GetMapping("admin/courses")
	public String coursesPageForAdmin(Principal principal, Model model) {
		model.addAttribute("email", principal.getName());
		return "admin/add-courses";
	}
    
    @GetMapping("admin/categories")
	public String categoriesPageForAdmin(Principal principal, Model model) {
		model.addAttribute("email", principal.getName());
		return "admin/add-categories";
	}
    
    @GetMapping("admin/courses/{id}/lessons")
	public String lessonPageForAdmin(@PathVariable Long id, Principal principal, Model model) {
		model.addAttribute("email", principal.getName());
		model.addAttribute("courseId", id);
		return "admin/lessons";
	}
    
}
