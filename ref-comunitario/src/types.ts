export type Role = "aluno" | "instrutor";

export interface Usuario {
  id: number;
  nome: string;
  email?: string;
  materias?: string[]; 
  roles?: Role[];
}

export interface Instrutor extends Usuario {}

export interface Topico {
  id: number;
  nome: string; 
}
