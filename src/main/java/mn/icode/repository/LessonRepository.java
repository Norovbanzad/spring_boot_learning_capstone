package mn.icode.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import mn.icode.model.Lesson;

public interface LessonRepository extends JpaRepository<Lesson, Long>{
    
}
