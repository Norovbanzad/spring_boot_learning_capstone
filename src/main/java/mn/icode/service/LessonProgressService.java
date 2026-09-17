package mn.icode.service;

import java.util.List;

import mn.icode.repository.EnrollmentRepository;
import mn.icode.repository.LessonProgressRepository;
import mn.icode.repository.LessonRepository;

import org.springframework.stereotype.Service;

import mn.icode.dto.LessonProgressRequest;
import mn.icode.dto.LessonProgressResponse;
import mn.icode.model.Enrollment;
import mn.icode.model.Lesson;
import mn.icode.model.LessonProgress;

@Service
public class LessonProgressService {
    
    private final LessonProgressRepository lessonProgressRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final LessonRepository lessonRepository;

    public LessonProgressService(LessonProgressRepository lessonProgressRepository, 
        EnrollmentRepository enrollmentRepository, LessonRepository lessonRepository) {
            this.lessonProgressRepository = lessonProgressRepository;
            this.enrollmentRepository = enrollmentRepository;
            this.lessonRepository = lessonRepository;
    } 

    public List<LessonProgressResponse> findAllLessonProgress() {
        return lessonProgressRepository.findAll().stream().map(this::toResponse).toList();
    }

    public LessonProgressResponse findLessonProgressById(Long id) {
        LessonProgress lessonProgress = lessonProgressRepository.findById(id).orElseThrow();
        return toResponse(lessonProgress);
    }

    public LessonProgressResponse createLessonProgress(LessonProgressRequest request) {
        
        Enrollment enrollment = enrollmentRepository.findById(request.enrollmentId()).orElseThrow();

        Lesson lesson = lessonRepository.findById(request.lessonId()).orElseThrow();

        LessonProgress lessonProgress = new LessonProgress();

        lessonProgress.setEnrollment(enrollment);
        lessonProgress.setLesson(lesson);
        lessonProgress.setCompleted(request.completed());
        
        LessonProgress savedLessonProgress = lessonProgressRepository.save(lessonProgress);
        return toResponse(savedLessonProgress);
    }

    private LessonProgressResponse toResponse(LessonProgress lessonProgress) {
        return new LessonProgressResponse(lessonProgress.getId(),
                                          lessonProgress.getEnrollment().getId(),
                                            lessonProgress.getLesson().getId(),
                                            lessonProgress.isCompleted(),
                                            lessonProgress.getCompletedAt());
    }
}
