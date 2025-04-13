    package tn.esprim.gestion_employes.model;

    import jakarta.persistence.*;
    import lombok.AllArgsConstructor;
    import lombok.Data;
    import lombok.NoArgsConstructor;

    import java.io.Serializable;
    import java.util.Date;

    @Entity
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public class HeuresSup implements Serializable {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @ManyToOne
        @JoinColumn(name = "employe_id")
        private Employe employe;

        private Date date;

        private float nbHeures;
    }
