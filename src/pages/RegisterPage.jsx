import AuthLeftPanel from "../auth/AuthLeftPanel";
import SignupForm from "../auth/SignupForm";

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 bg-surface-container-lowest rounded-2xl overflow-hidden shadow-xl">
        {/* Left panel */}
        <AuthLeftPanel />

        {/* Right form */}
        <div className="flex items-center justify-center p-10">
          <SignupForm />
        </div>
      </div>
    </div>
  );
};

export default Signup;
