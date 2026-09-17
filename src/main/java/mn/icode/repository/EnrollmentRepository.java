package mn.icode.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import mn.icode.model.Enrollment;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    
}
