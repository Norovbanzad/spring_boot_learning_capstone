package mn.icode.dto;

import java.time.LocalDateTime;

public record CourseResponse (
    Long id, String title, String description,
    boolean published, Long category_id,
    String categoryName, LocalDateTime createdAt
) {
    
}
