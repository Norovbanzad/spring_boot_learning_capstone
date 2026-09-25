package mn.icode.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mn.icode.dto.LessonRequest;
import mn.icode.dto.LessonResponse;
import mn.icode.model.Lesson;
import mn.icode.service.LessonService;

@RestController
@RequestMapping("/api/lessons")
public class LessonController {
    
    private final LessonService lessonService;

    public LessonController(LessonService lessonService) {
        this.lessonService = lessonService;
    }

    @GetMapping
    public List<LessonResponse> findAll() {
        return lessonService.findAllLessons();
    }

    @GetMapping("/course/{courseId}")
    public List<LessonResponse> findByCourse(@PathVariable Long courseId) {
        return lessonService.findLessonsByCourse(courseId);
    }

    @PutMapping("/{id}/publish")
    public LessonResponse togglePublished(@PathVariable Long id) {
        return lessonService.togglePublished(id);
    }

    @PostMapping()
    public LessonResponse create(@RequestBody LessonRequest request) {
        return lessonService.createLesson(request);
    }

    @PutMapping("/{id}")
    public LessonResponse update(@PathVariable Long id, @RequestBody LessonRequest request) {
        return lessonService.updateLesson(id, request);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        lessonService.deleteLesson(id);
    }

    
}
