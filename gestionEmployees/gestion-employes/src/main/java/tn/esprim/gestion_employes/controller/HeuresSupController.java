package tn.esprim.gestion_employes.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprim.gestion_employes.model.HeuresSup;
import tn.esprim.gestion_employes.repository.HeuresSupRepository;

import java.util.List;

@RestController
@RequestMapping("/heures-sup")
@CrossOrigin(origins = "*")
public class HeuresSupController {
    @Autowired
    private HeuresSupRepository heuresSupRepository;

    @GetMapping
    public List<HeuresSup> getAllHeuresSup() {
        return heuresSupRepository.findAll();
    }

    @PostMapping
    public HeuresSup createHeuresSup(@RequestBody HeuresSup heuresSup) {
        return heuresSupRepository.save(heuresSup);
    }

    @GetMapping("/{id}")
    public HeuresSup getHeuresSupById(@PathVariable int id) {
        return heuresSupRepository.findById(id).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void deleteHeuresSup(@PathVariable int id) {
        heuresSupRepository.deleteById(id);
    }
}
