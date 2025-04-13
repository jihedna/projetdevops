package tn.esprim.gestion_employes.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprim.gestion_employes.model.Employe;
import tn.esprim.gestion_employes.repository.EmployeRepository;

import java.util.List;

@RestController
@RequestMapping("/employes")
@CrossOrigin(origins = "*")
public class EmployeController {

    @Autowired
    private EmployeRepository employeRepository;

    @GetMapping
    public List<Employe> getAllEmployes() {
        return employeRepository.findAll();
    }

    @PostMapping
    public Employe createEmploye(@RequestBody Employe employe) {
        return employeRepository.save(employe);
    }

    @DeleteMapping("/{id}")
    public void deleteEmploye(@PathVariable Long id) {
        employeRepository.deleteById(id);  // expects Integer
    }
}
