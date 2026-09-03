package mn.icode.dto;

import mn.icode.model.EnrollmentStatus;

public record EnrollmentRequest(
    Long userId, Long courseId, EnrollmentStatus status
) {
    
}
