package mn.icode.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mn.icode.dto.LessonProgressRequest;
import mn.icode.dto.LessonProgressResponse;
import mn.icode.service.LessonProgressService;

@RestController
@RequestMapping("/api/lessonprogresses")
public class LessonProgressController {
    
    private final LessonProgressService lessonProgressService;

    public LessonProgressController(LessonProgressService lessonProgressService) {
        this.lessonProgressService = lessonProgressService;
    }

    @GetMapping
    public List<LessonProgressResponse> findAll() {
        return lessonProgressService.findAllLessonProgress();
    }

    @GetMapping("/{id}")
    public LessonProgressResponse findById(Long id) {
        return lessonProgressService.findLessonProgressById(id);
    }

    @PostMapping
    public LessonProgressResponse create(@RequestBody LessonProgressRequest request) {
        return lessonProgressService.createLessonProgress(request);
    }

}
