package mn.icode.dto;

public record CourseCreateRequest (
    String title, String description,
    boolean published, Long category_id
) {
    
}
