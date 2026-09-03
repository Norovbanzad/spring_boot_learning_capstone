package mn.icode.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import mn.icode.model.Course;

public interface CourseRepository extends JpaRepository<Course, Long> {
}
