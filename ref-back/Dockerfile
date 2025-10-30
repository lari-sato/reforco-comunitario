# Estágio 1: Build
# Usar uma imagem base com Java 21
FROM maven:3.9-sapmachine-21 AS build
WORKDIR /app

# Copiar as pastas de build
COPY .mvn/ .mvn
COPY mvnw pom.xml ./

# Copiar o código-fonte
COPY src/ ./src/

# Executar o 'mvn package' para construir o .jar
RUN mvn clean package -DskipTests

# Estágio 2: Run
# Usar uma imagem base leve, apenas com Java 21
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app

# Copiar apenas o .jar final do estágio de build
COPY --from=build /app/target/*.jar app.jar

# Expor a porta 8080 (padrão do Spring Boot)
EXPOSE 8080

# Comando para executar a aplicação
ENTRYPOINT ["java", "-jar", "app.jar"]