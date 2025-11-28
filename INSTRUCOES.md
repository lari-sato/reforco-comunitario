# 📝 Instruções de Uso

## 📲 Front-end (Interface)
As interfaces montadas mostram as telas que o usuário final verá ao iniciar a aplicação.
Para visualizá-las, siga os passos abaixo:

1. Baixe o arquivo do projeto ou clone o repositório em seu computador.
2. Entre na pasta "ref-comunitario".
3. Rode o seguinte comando no terminal: ```npm install```
4. Após terminar de rodar, digite: ```npm run dev```
5. O comando acima irá mostrar um link, iniciado por "http://localhost". Entre neste link no seu navegador e navegue pelas telas!

---

## ⚙️ Back-end
Para rodar o back-end, composto por contêineres, banco de dados e lógica de negócios, siga os passos abaixo:

1. Baixe o aplicativo Docker Desktop do site oficial do Docker (https://www.docker.com).
2. Baixe o arquivo do projeto ou clone o repositório em seu computador.
3. Entre na pasta "ref-back".
4. Rode o seguinte comando no terminal: ```mvn clean install```
   1. Caso o comando não seja reconhecido, baixe o Maven em seu computador.
5. Rode o seguinte comando no terminal: ```docker-compose up --build -d```
6. Certifique-se de que os contêineres foram criados e estão rodando em seu computador.
   1. Abra o aplicativo Docker Desktop.
   2. Clique na aba "Containers".
   3. Verifique se foram criados os contêineres "reforco-comitente-app" e "reforco-comunitario-db"
   4. Se não estiverem rodando (ou seja, a bola ao lado esquerdo do nome está vazia), selecione os dois contêineres.
7. Retorne ao terminal da sua IDE e rode no terminal o seguinte comando: ```docker compose up```
8. Entre no site http://localhost:8080/swagger-ui/index.html e veja a API funcionando!