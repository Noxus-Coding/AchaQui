
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AuthLayout } from "../components/AuthLayout";
import { PasswordField } from "../components/PasswordField";
import {
  registerSchema,
  type RegisterFormData,
} from "../schemas/register.schema";

const inputClass =
  "h-12 w-full rounded-xl border border-achaqui-border " +
  "bg-white px-4 text-sm outline-none transition " +
  "focus:border-achaqui-green focus:ring-2 " +
  "focus:ring-achaqui-green/15";

export function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: RegisterFormData) {
    // A integração com a API será feita depois.
    // Não exibir senhas no console.
    console.log("Cadastro validado:", {
      nome: data.nome,
      email: data.email,
    });
  }

  return (
    <AuthLayout>
      <Link
        to="/login"
        className="inline-flex items-center gap-2 text-xs text-achaqui-muted hover:text-achaqui-green"
      >
        <ArrowLeft size={14} />
        Voltar para login
      </Link>

      <p className="mt-7 text-[11px] font-bold uppercase tracking-[0.16em] text-achaqui-green">
        Faça parte do AchaQui
      </p>

      <h2 className="mt-2 text-2xl font-semibold text-achaqui-text sm:text-3xl">
        Crie sua conta
      </h2>

      <p className="mt-2 text-sm leading-6 text-achaqui-muted">
        Conecte-se a profissionais e oportunidades
        aqui em Quixadá.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="mt-7 space-y-4"
      >
        {/* Nome */}
        <div className="space-y-2">
          <label
            htmlFor="nome"
            className="block text-xs font-semibold"
          >
            Nome completo
          </label>

          <input
            id="nome"
            type="text"
            placeholder="Digite seu nome completo"
            autoComplete="name"
            aria-invalid={!!errors.nome}
            {...register("nome")}
            className={inputClass}
          />

          {errors.nome && (
            <p className="text-xs text-red-600" role="alert">
              {errors.nome.message}
            </p>
          )}
        </div>

        {/* E-mail */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-xs font-semibold"
          >
            E-mail
          </label>

          <input
            id="email"
            type="email"
            placeholder="voce@exemplo.com"
            autoComplete="email"
            aria-invalid={!!errors.email}
            {...register("email")}
            className={inputClass}
          />

          {errors.email && (
            <p className="text-xs text-red-600" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Senha */}
        <PasswordField
          id="senha"
          label="Senha"
          placeholder="Mínimo de 8 caracteres"
          autoComplete="new-password"
          error={errors.senha?.message}
          {...register("senha")}
        />

        {/* Confirmar senha */}
        <PasswordField
          id="confirmarSenha"
          label="Confirmar senha"
          placeholder="Repita sua senha"
          autoComplete="new-password"
          error={errors.confirmarSenha?.message}
          {...register("confirmarSenha")}
        />

        <p className="text-xs leading-5 text-achaqui-muted">
          Ao criar sua conta, você concorda com os
          Termos de Uso e a Política de Privacidade.
        </p>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-achaqui-green font-semibold text-white transition hover:bg-achaqui-dark disabled:opacity-60"
        >
          Criar minha conta
          <ArrowRight size={18} />
        </button>
      </form>

      <p className="mt-7 text-center text-sm text-achaqui-muted">
        Já tem uma conta?{" "}
        <Link
          to="/login"
          className="font-semibold text-achaqui-green hover:underline"
        >
          Entrar
        </Link>
      </p>
    </AuthLayout>
  );
}
