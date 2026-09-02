package mn.icode.service;

import java.util.List;

import org.springframework.stereotype.Service;

import mn.icode.model.Category;
import mn.icode.model.Course;
import mn.icode.repository.CourseRepository;

@Service
public class CourseService {
    
    private final CourseRepository courseRepository;
    private final Category category;

    public CourseService(CourseRepository courseRepository, Category category) {
        this.courseRepository = courseRepository;
        this.category = category;
    }

    public List<Course> findAllCourses() {
        return courseRepository.findAll();
    }

    public Course findCourseById(Long id) {
        return courseRepository.findById(id).orElseThrow();
    }

    public Course createCourse(Course course, Category category) {
        return null;
    }

    
}
