import { AuthForm } from "@/components/auth/auth-form";
import { loginAction } from "@/app/auth/actions";

type LoginPageProps = {
  searchParams?: Promise<{
    next?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const nextPath = resolvedSearchParams?.next;

  return <AuthForm mode="login" action={loginAction} nextPath={nextPath} />;
}
