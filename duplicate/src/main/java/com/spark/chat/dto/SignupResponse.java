public class SignupResponse {
    private boolean success;
    private String field;
    private String message;

    public SignupResponse(boolean success, String field, String message) {
        this.success = success;
        this.field = field;
        this.message = message;
    }
}
