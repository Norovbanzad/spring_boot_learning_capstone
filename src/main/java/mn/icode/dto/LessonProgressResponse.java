package mn.icode.dto;

import java.time.LocalDateTime;

public record LessonProgressResponse(
                    Long id,
                    Long enrollmentId,
                    Long lessonId,
                    boolean completed,
                    LocalDateTime completedAt
) {
    
}
