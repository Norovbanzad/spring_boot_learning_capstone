package mn.icode.service;

import java.util.List;

import org.springframework.stereotype.Service;

import mn.icode.dto.EnrollmentRequest;
import mn.icode.dto.EnrollmentResponse;
import mn.icode.model.Course;
import mn.icode.model.Enrollment;
import mn.icode.model.User;
import mn.icode.repository.CourseRepository;
import mn.icode.repository.EnrollmentRepository;
import mn.icode.repository.UserRepository;

@Service
public class EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;

    public EnrollmentService(EnrollmentRepository enrollmentRepository, UserRepository userRepository,
            CourseRepository courseRepository) {
        this.enrollmentRepository = enrollmentRepository;
        this.userRepository = userRepository;
        this.courseRepository = courseRepository;
    }

    public List<EnrollmentResponse> findAllEnrollments() {
        return enrollmentRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public EnrollmentResponse findEnrollmentById(Long id) {
        Enrollment enrollment = enrollmentRepository.findById(id).orElseThrow();
        return toResponse(enrollment);
    }

    public EnrollmentResponse createEnrollment(EnrollmentRequest request) {
        User user = userRepository.findById(request.userId()).orElseThrow();
        Course course = courseRepository.findById(request.courseId()).orElseThrow();

        Enrollment newEnrollment = new Enrollment();

        newEnrollment.setUser(user);
        newEnrollment.setCourse(course);
        newEnrollment.setStatus(request.status());

        Enrollment savedEnrollment = enrollmentRepository.save(newEnrollment);

        return toResponse(savedEnrollment);
    }

    private EnrollmentResponse toResponse(Enrollment enrollment) {
        return new EnrollmentResponse(enrollment.getId(),
                enrollment.getUser().getId(),
                enrollment.getUser().getEmail(),
                enrollment.getCourse().getId(),
                enrollment.getCourse().getTitle(),
                enrollment.getStatus(),
                enrollment.getEnrolledAt());
    }

}
