package tn.esprim.gestion_employes.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprim.gestion_employes.model.Tarif;

public interface TarifRepository extends JpaRepository<Tarif, Integer> {
}
