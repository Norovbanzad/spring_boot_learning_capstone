package mn.icode.dto;

import java.time.Instant;

public record CourseResponse (
    Long id, String title, String description,
    boolean published, Long categoryId,
    String category_name, Instant createdAt
) {
    
}
