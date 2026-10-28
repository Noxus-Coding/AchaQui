export interface Categoria {
  id: string;
  nome: string;
}

export interface Profissional {
  id: string;
  nomeProfissional: string;
  descricao: string;
  whatsapp: string;
  bairro: string;
  fotoUrl: string | null;
  experiencia: string | null;
  categorias: Categoria[];
}

export interface FiltrosProfissionais {
  busca?: string;
  categoriaId?: string;
  pagina?: number;
  limite?: number;
}

export interface Paginacao {
  pagina: number;
  limite: number;
  total: number;
  totalPaginas: number;
}

export interface ListagemProfissionaisResponse {
  profissionais: Profissional[];
  paginacao: Paginacao;
}

export interface DetalhesProfissionalResponse {
  profissional: Profissional;
}