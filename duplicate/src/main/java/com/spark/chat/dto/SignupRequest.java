import com.spark.chat.entity.LanguagePreference;
public class SignupRequest {
    private String name;
    private String mobile;
    private int age;
    private String gender;
    private String password;

    // Manually add these for now to fix the build immediately:
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getMobile() { return mobile; }
    public void setMobile(String mobile) { this.mobile = mobile; }
    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }
    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
