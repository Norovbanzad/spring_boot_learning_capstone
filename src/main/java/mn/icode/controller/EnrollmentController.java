package mn.icode.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mn.icode.service.EnrollmentService;
import mn.icode.dto.EnrollmentResponse;
import mn.icode.dto.EnrollmentRequest;

@RestController
@RequestMapping("/api/enrollments")
public class EnrollmentController {
    
    private final EnrollmentService enrollmentService;
  
    public EnrollmentController(EnrollmentService enrollmentService) {
        this.enrollmentService = enrollmentService;
        
    }

    @GetMapping
    public List<EnrollmentResponse> findAll() {
        return enrollmentService.findAllEnrollments();
    }

    @GetMapping("/{id}")
    public EnrollmentResponse findById(@PathVariable Long id) {
        return enrollmentService.findEnrollmentById(id);
    }

    @PostMapping
    public EnrollmentResponse create(@RequestBody EnrollmentRequest request) {
        return enrollmentService.createEnrollment(request);
    }
    
 
}
