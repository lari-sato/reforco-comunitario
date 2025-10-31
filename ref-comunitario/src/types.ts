export interface Usuario {
  id: number;
  nome: string;
  email: string;
  roles: ("aluno" | "instrutor")[];
  escolaridade?: string;
  ano?: string | null;
}

export type Busca =
  | { id: number; nome: string; materia: string }

export type InstrutorResult = {
  id: number;
  nome: string;
  materias: string[]; 
};

 