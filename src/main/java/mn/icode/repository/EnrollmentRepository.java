package mn.icode.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import mn.icode.model.Enrollment;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {

    List<Enrollment> findAllByUserId(Long userId);
}
