package mn.icode.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import mn.icode.model.LessonProgress;

public interface LessonProgressRepository extends JpaRepository<LessonProgress, Long> {
    
}
