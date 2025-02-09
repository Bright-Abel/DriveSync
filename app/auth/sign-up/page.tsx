import AuthForm from "@/components/AuthForm";

import AppLayout from "../_components/AppLayout";

const SignUp = () => {
  return (
    <AppLayout type="sign-up">
      <AuthForm type="sign-up" />
    </AppLayout>
  );
};

export default SignUp;
