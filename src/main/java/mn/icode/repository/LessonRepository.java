package mn.icode.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import mn.icode.model.Lesson;

public interface LessonRepository extends JpaRepository<Lesson, Long>{
    List<Lesson> findByCourseIdOrderByPositionAsc(Long courseId);
}
