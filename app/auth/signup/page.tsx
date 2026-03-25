import { AuthForm } from "@/components/auth/auth-form";
import { signupAction } from "@/app/auth/actions";

export default function SignUpPage() {
  return <AuthForm mode="signup" action={signupAction} />;
}
