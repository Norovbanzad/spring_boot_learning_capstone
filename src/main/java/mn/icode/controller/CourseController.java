package mn.icode.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import mn.icode.dto.CourseCreateRequest;
import mn.icode.dto.CourseResponse;
import mn.icode.model.Course;
import mn.icode.service.CourseService;

@RestController
@RequestMapping("/api/courses")
public class CourseController {
    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping
    public List<CourseResponse> findAll() {
        return courseService.findAllCourses();
    }

    @GetMapping("/{id}")
    public Course findById(@PathVariable Long id) {
        return courseService.findCourseById(id);
    }

    @PostMapping()
    public CourseResponse create(@RequestBody CourseCreateRequest request) {
        return courseService.createCourse(request);
    }
    
    @PutMapping("/{id}")
    public CourseResponse update(@PathVariable Long id, @RequestBody CourseCreateRequest request) {
        return courseService.updateCourse(id, request);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        courseService.deleteCourse(id);
    }
}
