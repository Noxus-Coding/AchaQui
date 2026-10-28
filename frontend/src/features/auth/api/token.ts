let accessToken: string | null = null;

let versaoAutenticacao = 0;

export function getAccessToken(): string | null {
  return accessToken;
}

export function setAccessToken(token: string | null): void {
  accessToken = token;
}

export function getVersaoAutenticacao(): number {
  return versaoAutenticacao;
}

export function invalidarAutenticacao(): void {
  versaoAutenticacao += 1;
  accessToken = null;
}