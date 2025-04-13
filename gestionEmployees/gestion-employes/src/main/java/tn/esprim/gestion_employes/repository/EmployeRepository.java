package tn.esprim.gestion_employes.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprim.gestion_employes.model.Employe;

public interface EmployeRepository extends JpaRepository<Employe, Long> {
}
