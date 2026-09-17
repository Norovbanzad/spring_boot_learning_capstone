package mn.icode.dto;

import java.time.LocalDateTime;

import mn.icode.model.EnrollmentStatus;

public record EnrollmentResponse(
    Long id, Long userId, String email, 
    Long courseId, String title, EnrollmentStatus status, 
    LocalDateTime enrolledAt 
) {
    
}
