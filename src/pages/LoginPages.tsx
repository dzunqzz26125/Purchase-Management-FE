import AuthLayout from "../auth/AuthLayout";
import AuthIllustration from "../auth/login/AuthIllustration";
import LoginForm from "../auth/login/LoginForm";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-md">
      <AuthLayout>
        <AuthIllustration />
        <LoginForm />
      </AuthLayout>
    </div>
  );
};

export default LoginPage;
