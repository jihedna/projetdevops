FROM maven:3.8.1-openjdk-17 AS build
WORKDIR /app
COPY gestion-employes /app
RUN ls -la /app
RUN mvn clean install -DskipTests

FROM openjdk:17-jdk-slim
WORKDIR /app

COPY --from=build /app/target/gestion-employes-0.0.1-SNAPSHOT.jar gestion-employes.jar
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

EXPOSE 8086

# Attendre que MySQL (nom du conteneur dans docker-compose) soit prêt
CMD ["/wait-for-it.sh", "mysql:3306", "--", "java", "-jar", "gestion-employes.jar"]

