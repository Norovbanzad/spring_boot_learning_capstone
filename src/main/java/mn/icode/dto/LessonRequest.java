package mn.icode.dto;

public record LessonRequest(
    String title, String content, boolean published,
    Long position, Long courseId
) {
    
}
