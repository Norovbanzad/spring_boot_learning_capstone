package mn.icode.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import mn.icode.service.CategoryService;
import mn.icode.service.CourseService;
import mn.icode.service.LessonService;

@Controller
public class CoursePageController {

	private final CategoryService categoryService;
	private final CourseService courseService;
	private final LessonService lessonService;
	
	public CoursePageController(CategoryService categoryService, CourseService courseService, LessonService lessonService) {
		super();
		this.categoryService = categoryService;
		this.courseService = courseService;
		this.lessonService = lessonService;
	}
	
	@GetMapping("/courses")
	public String course(@RequestParam)
	
	
}
