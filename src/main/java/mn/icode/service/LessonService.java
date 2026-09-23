package mn.icode.service;

import java.util.List;

import org.springframework.stereotype.Service;

import mn.icode.dto.LessonRequest;
import mn.icode.dto.LessonResponse;
import mn.icode.model.Course;
import mn.icode.model.Lesson;
import mn.icode.repository.CourseRepository;
import mn.icode.repository.LessonRepository;

@Service
public class LessonService {

    private final LessonRepository lessonRepository;
    private final CourseRepository courseRepository;

    public LessonService(CourseRepository courseRepository, LessonRepository lessonRepository) {
        this.courseRepository = courseRepository;
        this.lessonRepository = lessonRepository;
    }
  
    public List<Lesson> findAllLessons() {
        return lessonRepository.findAll();
    }

    public Lesson findLessonById(Long id) {
        return lessonRepository.findById(id).orElseThrow();
    }

    public List<LessonResponse> findLessonsByCourse(Long courseId) {
        courseRepository.findById(courseId).orElseThrow();
        return lessonRepository.findByCourseIdOrderByPositionAsc(courseId).stream().map(this::toResponse).toList();
    }

    public LessonResponse togglePublished(Long id) {
        Lesson foundLesson = lessonRepository.findById(id).orElseThrow();
        foundLesson.setPublished(!foundLesson.isPublished());
        return toResponse(lessonRepository.save(foundLesson));
    }

    public LessonResponse createLesson(LessonRequest request) {
        Course foundCourse = courseRepository.findById(request.courseId()).orElseThrow();

        Lesson newLesson = new Lesson();
        newLesson.setTitle(request.title());
        newLesson.setContent(request.content());
        newLesson.setPosition(request.position());
        newLesson.setPublished(request.published());
        newLesson.setCourse(foundCourse);

        Lesson savedLesson = lessonRepository.save(newLesson);

        return toResponse(savedLesson);  
    }

    public LessonResponse updateLesson(Long id, LessonRequest request) {
        Course existingCourse = courseRepository.findById(request.courseId()).orElseThrow();
        Lesson foundLesson = lessonRepository.findById(id).orElseThrow();

        foundLesson.setTitle(request.title());
        foundLesson.setContent(request.content());
        foundLesson.setPosition(request.position());
        foundLesson.setPublished(request.published());
        foundLesson.setCourse(existingCourse);

        Lesson updatedLesson = lessonRepository.save(foundLesson);

        return toResponse(updatedLesson);  
    }

    public void deleteLesson(Long id) {
       Lesson foundLesson = lessonRepository.findById(id).orElseThrow();
       lessonRepository.delete(foundLesson);
    }

    private LessonResponse toResponse(Lesson lesson) {
        return new LessonResponse(lesson.getId(), 
                                lesson.getTitle(), 
                                lesson.getContent(), 
                                lesson.isPublished(), 
                                lesson.getPosition(), 
                                lesson.getCourse().getId());
    }
    
}
