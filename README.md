# 📘 Reforço Comunitário

## 📖 Sobre o Projeto
O **Reforço Comunitário** é uma plataforma web gratuita que conecta **instrutores voluntários** e **alunos** que precisam de apoio educacional.  
O objetivo é democratizar o acesso ao reforço escolar, fortalecendo comunidades e promovendo **educação inclusiva, solidária e contínua**.

---

## 🎯 Objetivo
Reduzir desigualdades no acesso à educação, criando um ambiente seguro e acessível onde qualquer pessoa possa **ensinar ou aprender** de forma colaborativa.

---

## 🌍 Alinhamento Social
O projeto contribui diretamente para o **ODS 4 da ONU – Educação de Qualidade**, garantindo:

- **Acesso Equitativo:** reforço gratuito para todos.
- **Aprendizagem ao Longo da Vida:** incentivo ao estudo contínuo.
- **Solidariedade e Empatia:** fortalecimento comunitário por meio do voluntariado.

---

## ⚙️ Funcionalidades

### 👩‍🎓 Aluno
- Cadastro e login, por escolaridade.  
- Busca de instrutores por disciplina ou tópico.  
- Solicitação de videoaulas ou aulas ao-vivo.  
- Avaliação de instrutores.  

### 👨‍🏫 Instrutor
- Cadastro e login, sendo necessária comprovação de certificação/diploma.  
- Inserção de especialidades ou tópicos que leciona.  
- Envio de videoaulas sob demanda, ou aulas ao-vivo.  
- Aceitação, recusa ou remarcação de aulas.  

### ⚖️ Ambos
- Todas as funcionalidades citadas acima.
- Denúncia de conduta inadequada.
- Ensinar e aprender!

---

## 🧱 Arquitetura do Sistema

### Camadas
1. **Apresentação (Frontend):** Interface web em **React + TypeScript**.  
2. **Negócio (Backend):** Lógica e regras em **Java + Spring Boot**.  
3. **Persistência:** Comunicação entre backend e banco.  
4. **Dados:** Armazenamento em **MariaDB**.  

### Pipeline CI/CD
Fluxo automatizado com **GitHub Actions** e **Jenkins**:  
`Commit → Build → Test → Release → Deploy`

---

## 🛠️ Tecnologias Utilizadas

| Camada | Tecnologia | Função |
|--------|-------------|--------|
| Frontend | React + TypeScript | Interface responsiva e interativa |
| Backend | Java + Spring Boot | Regras de negócio e APIs |
| Banco de Dados | MariaDB + SQL | Armazenamento de dados |
| Infraestrutura | Docker | Containerização |
| CI/CD | GitHub Actions | Integração e deploy contínuos |

---

## ✅ Requisitos Principais

### Requisitos Funcionais

| Código | Descrição |
|:-------:|------------|
| **[RF01] Cadastro de Aluno:** | O usuário se cadastra como um aluno. |
| **[RF02] Cadastro de Instrutor:** | O usuário se cadastra como um instrutor. |
| **[RF03] Cadastro Aluno-Instrutor:** | O usuário se cadastra como aluno e instrutor simultaneamente. |
| **[RF04] Login de Usuário:** | O usuário entra no sistema utilizando seu e-mail e senha. |
| **[RF05] Inserir Especialidades do Instrutor:** | O usuário (instrutor) insere suas especialidades (tópicos) em seu perfil. |
| **[RF06] Buscar Instrutor por Tópico:** | O usuário (aluno) busca um instrutor com base em suas necessidades. |
| **[RF07] Videochamada de Aula:** | O usuário (aluno) realiza uma videochamada com um instrutor. |
| **[RF08] Solicitar Agendamento de Aula:** | O usuário (aluno) solicita agendamento de aula por chamada com um instrutor. |
| **[RF09] Responder Solicitação de Agendamento:** | O usuário (instrutor) aceita, recusa ou sugere outro agendamento. |
| **[RF10] Solicitar Envio de Videoaula:** | O usuário (aluno) solicita uma videoaula ao instrutor. |
| **[RF11] Responder Solicitação de Videoaula:** | O usuário (instrutor) envia o vídeo solicitado pelo aluno. |
| **[RF12] Avaliar Instrutor:** | O usuário avalia o seu instrutor em uma escala de 1 a 5. |
| **[RF13] Denunciar Contra Violação de Normas:** | Um usuário denuncia outro durante uma videochamada. |
| **[RF14] Cancelar Agendamento Marcado:** | O usuário (instrutor) cancela o agendamento de uma aula. |


### Requisitos Não Funcionais

| Código | Descrição |
|:-------:|------------|
| **[RNF01]** | **Desempenho:** o sistema deve suportar pelo menos 500 usuários simultâneos sem degradação perceptível. |
| **[RNF02]** | **Disponibilidade:** operação contínua (24x7) com uptime mínimo de 99%. |
| **[RNF03]** | **Segurança de Dados:** criptografia de informações sensíveis e uso obrigatório de HTTPS. |
| **[RNF04]** | **Usabilidade:** interface intuitiva, responsiva e acessível em desktop e dispositivos móveis. |
| **[RNF05]** | **Portabilidade:** compatível com Chrome, Firefox, Edge e Safari. |
| **[RNF06]** | **Escalabilidade:** deve ajustar recursos automaticamente conforme o aumento de usuários. |
| **[RNF07]** | **Confiabilidade:** backup diário e restauração em até 24 horas após falha. |
| **[RNF08]** | **Monitoramento:** videochamadas devem ser monitoradas para segurança dos usuários. |
| **[RNF09]** | **Conformidade Legal:** aderência total à LGPD (Lei Geral de Proteção de Dados). |
| **[RNF10]** | **Tempo de Resposta:** carregamento máximo de 3 segundos em condições normais. |
| **[RNF11]** | **Manutenibilidade:** código modular, documentado e de fácil atualização. |

---

## 📈 Critérios de Qualidade
- **Acessibilidade e Usabilidade:** interface limpa e intuitiva.  
- **Segurança e Confiabilidade:** proteção de dados e sistema de denúncias.  
- **Escalabilidade:** suporte ao crescimento da base de usuários.  

---

## 👥 Equipe

- **Julia Santos Oliveira**
- **Larissa Yuri Sato**
- **Giovana Simões Franco**
- **Beatriz Lima de Moura**
