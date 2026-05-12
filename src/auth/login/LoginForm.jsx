import InputField from "./InputField";
import PasswordField from "./PasswordField";
import SocialLogin from "./SocialLogin";

export default function LoginForm() {
  return (
    <section className="flex flex-col justify-center px-md py-xl md:px-xl">
      <div className="max-w-110 mx-auto w-full">
        <h2 className="text-h2 mb-xs">Chào mừng trở lại</h2>

        <form className="space-y-md">
          <InputField
            label="Email"
            icon="mail"
            type="email"
            placeholder="example@logiflow.vn"
          />

          <PasswordField />
        </form>

        <SocialLogin />
      </div>
    </section>
  );
}
