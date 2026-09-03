package mn.icode.dto;

public record LessonProgressRequest(
                Long enrollmentId,
                Long lessonId,
                boolean completed
) {
    
}
