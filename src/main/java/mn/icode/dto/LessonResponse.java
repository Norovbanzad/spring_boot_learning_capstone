package mn.icode.dto;

public record LessonResponse(
    Long id, String title, String content, boolean published,
    Long position, Long courseId, String courseTitle
) {
    
}
