package mn.icode.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import mn.icode.dto.CourseCreateRequest;
import mn.icode.dto.CourseResponse;
import mn.icode.model.Category;
import mn.icode.model.Course;
import mn.icode.repository.CategoryRepository;
import mn.icode.repository.CourseRepository;

@Service
public class CourseService {
    
    private final CourseRepository courseRepository;
    private final CategoryRepository categoryRepository;

    public CourseService(CourseRepository courseRepository, CategoryRepository categoryRepository) {
        this.courseRepository = courseRepository;
        this.categoryRepository = categoryRepository;
    }

    public List<Course> findAllCourses() {
        return courseRepository.findAll();
    }

    public Course findCourseById(Long id) {
        return courseRepository.findById(id).orElseThrow();
    }

    @Transactional
    public CourseResponse createCourse(CourseCreateRequest request) {
        
        Category existingCategory = categoryRepository.findById(request.category_id()).orElseThrow();
        
        Course newCourse = new Course();
        newCourse.setTitle(request.title());
        newCourse.setDescription(request.description());
        newCourse.setPublished(request.published());
        newCourse.setCategory(existingCategory);

        Course saveCourse = courseRepository.save(newCourse);
        return toResponse(saveCourse);
    }

    public CourseResponse updateCourse(Long id, CourseCreateRequest request) {
        
        Category existingCategory = categoryRepository.findById(request.category_id()).orElseThrow(); 
        Course foundCourse = courseRepository.findById(id).orElseThrow();

        foundCourse.setTitle(request.title());
        foundCourse.setDescription(request.description());
        foundCourse.setPublished(request.published());
        foundCourse.setCategory(existingCategory);

        Course updatedCourse = courseRepository.save(foundCourse);
        return toResponse(updatedCourse);
    }

    public void deleteCourse(Long id) {
       Course foundCourse = courseRepository.findById(id).orElseThrow();
       courseRepository.delete(foundCourse);
    }

    private CourseResponse toResponse(Course course) {
        return new CourseResponse(course.getId(), course.getTitle(), 
        course.getDescription(), course.isPublished(), 
        course.getCategory().getId(), course.getCategory().getCategoryName(), 
        course.getCreatedAt());
    } 
}
