
export function criarLinkWhatsapp(whatsapp: string): string | null {
  const numero = whatsapp.replace(/\D/g, "");

  const numeroCompleto =
    numero.length === 10 || numero.length === 11
      ? `55${numero}`
      : numero;

  if (!/^55\d{10,11}$/.test(numeroCompleto)) {
    return null;
  }

  const mensagem =
    "Olá! Encontrei seu perfil no AchaQui e gostaria de saber mais sobre seus serviços.";

  return `https://wa.me/${numeroCompleto}?text=${encodeURIComponent(mensagem)}`;
}