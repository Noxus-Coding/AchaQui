
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import { criarPerfilProfissional } from "../api/profissionais.api";
import {
  cadastroProfissionalSchema,
  type CadastroProfissionalFormData,
} from "../schemas/cadastro-profissional.schema";

export function useCadastroProfissional() {
  const navigate = useNavigate();
  const [erroCadastro, setErroCadastro] = useState<string | null>(null);

  const form = useForm<CadastroProfissionalFormData>({
    resolver: zodResolver(cadastroProfissionalSchema),
    defaultValues: {
      nomeProfissional: "",
      descricao: "",
      whatsapp: "",
      bairro: "",
      fotoUrl: "",
      experiencia: "",
      categoriaIds: [],
    },
  });

  async function onSubmit(dados: CadastroProfissionalFormData) {
    setErroCadastro(null);

    try {
      await criarPerfilProfissional(dados);

      navigate("/dashboard", { replace: true });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          setErroCadastro("Você já possui um perfil profissional cadastrado.");
          return;
        }

        if (error.response?.status === 400) {
          setErroCadastro(
            "Alguns dados não foram aceitos. Confira as informações e tente novamente."
          );
          return;
        }
      }

      setErroCadastro(
        "Não foi possível criar seu perfil profissional. Tente novamente."
      );
    }
  }

  return {
    form,
    onSubmit,
    erroCadastro,
  };
}
