import AuthForm from "@/components/AuthForm";

import AppLayout from "../_components/AppLayout";

const SignIn = () => {
  return (
    <AppLayout type="sign-in">
      <AuthForm type="sign-in" />
    </AppLayout>
  );
};

export default SignIn;
