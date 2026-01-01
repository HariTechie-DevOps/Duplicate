@Entity
@Table(name = "user_preferences")
public class LanguagePreference {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // This is the "Line" that connects to the Users table
    @Column(name = "mobile", nullable = false, unique = true)
    private String mobile; 

    private String language;

    // Standard Getters/Setters...
}
