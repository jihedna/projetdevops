# ----------- Build Stage -------------
FROM maven:3.8.1-openjdk-17 AS build
WORKDIR /app

# Copy the project files into the container
COPY gestion-employes /app

# (Optional) Check what's in there for debugging
RUN ls -la /app

# Build the application, skipping tests
RUN mvn clean install -DskipTests

# ----------- Runtime Stage -------------
FROM openjdk:17-jdk-slim
WORKDIR /app

# Copy the built JAR from the build stage
COPY --from=build /app/target/gestion-employes-0.0.1-SNAPSHOT.jar gestion-employes.jar

# Add wait-for-it script for DB readiness
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

# Expose the backend port (adjust if your app uses another port)
EXPOSE 8086

# Wait for MySQL to be ready, then run the app
CMD ["/wait-for-it.sh", "mysql:3306", "--", "java", "-jar", "gestion-employes.jar"]
