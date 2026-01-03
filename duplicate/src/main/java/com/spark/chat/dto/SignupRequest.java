public class SignupRequest {
    private String name;
    private String mobile;
    private int age;
    private String gender;
    private String password;

    // Manually add these for now to fix the build immediately:
    public String getName() { return name; }
    public String getMobile() { return mobile; }
    public int getAge() { return age; }
    public String getGender() { return gender; }
    public String getPassword() { return password; }
}
