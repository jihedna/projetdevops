package tn.esprim.gestion_employes.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprim.gestion_employes.model.HeuresSup;

public interface HeuresSupRepository extends JpaRepository<HeuresSup, Integer> {
}
