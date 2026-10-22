import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { AuthLayout } from "../components/AuthLayout";
import { PasswordField } from "../components/PasswordField";

const loginSchema = z.object({
  email: z.email("Informe um e-mail válido"),
  senha: z.string().min(1, "Informe sua senha"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginFormData) {
    console.log("Dados do login:", data);
  }

  return (
    <AuthLayout>
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-xs text-achaqui-muted hover:text-achaqui-green"
      >
        <ArrowLeft size={14} />
        Voltar ao início
      </Link>

      <p className="mt-8 text-[11px] font-bold uppercase tracking-[0.16em] text-achaqui-green">
        Sua conta
      </p>

      <h2 className="mt-2 text-2xl font-semibold text-achaqui-text sm:text-3xl">
        Bem-vindo de volta!
      </h2>

      <p className="mt-2 text-sm leading-6 text-achaqui-muted">
        Entre para encontrar ou oferecer serviços em Quixadá.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="mt-8 space-y-5"
      >
        <div className="space-y-2">
          <label htmlFor="email" className="block text-xs font-semibold">
            E-mail
          </label>

          <input
            id="email"
            type="email"
            placeholder="voce@exemplo.com"
            autoComplete="email"
            {...register("email")}
            className="h-12 w-full rounded-xl border border-achaqui-border px-4 text-sm outline-none focus:border-achaqui-green focus:ring-2 focus:ring-achaqui-green/15"
          />

          {errors.email && (
            <p className="text-xs text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>

        <PasswordField
          id="senha"
          label="Senha"
          placeholder="Digite sua senha"
          autoComplete="current-password"
          error={errors.senha?.message}
          {...register("senha")}
        />

        <div className="text-right">
          <span className="text-xs text-achaqui-green">
            Esqueci minha senha
          </span>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-achaqui-green font-semibold text-white transition hover:bg-achaqui-dark disabled:opacity-60"
        >
          Entrar <ArrowRight size={18} />
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-achaqui-muted">
        Ainda não tem uma conta?{" "}
        <Link
          to="/register"
          className="font-semibold text-achaqui-green hover:underline"
        >
          Cadastre-se
        </Link>
      </p>
    </AuthLayout>
  );
}