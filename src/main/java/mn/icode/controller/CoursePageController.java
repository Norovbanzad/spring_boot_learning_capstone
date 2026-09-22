package mn.icode.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


import mn.icode.model.Course;
import mn.icode.service.CourseService;

@Controller
@RequestMapping("/courses")
public class CoursePageController {
	
	@GetMapping
	public String coursesPage() {
		return "add-courses";
	}
	
	
}
