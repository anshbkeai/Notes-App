 # -------------------------------
# Stage 1: Build with Maven
# -------------------------------
FROM eclipse-temurin:21 AS build

WORKDIR /app

# Copy only pom.xml first for layer caching
COPY pom.xml .

# Install Maven (slim base doesn’t include it)
RUN apt-get update && apt-get install -y maven

# Pre-download dependencies
RUN mvn dependency:go-offline -B

# Copy full source code
COPY src ./src

# Package (skip tests in Docker build)
RUN mvn clean package -DskipTests

# -------------------------------
# Stage 2: Run JAR
# -------------------------------
FROM eclipse-temurin:21

WORKDIR /app

# Copy built JAR from build stage
COPY --from=build /app/target/*.jar app.jar

# Optional JVM SSL workaround flags for MongoDB (Render + TLSv1.2)
ENV JAVA_OPTS="-Djdk.tls.client.protocols=TLSv1.2 -Dhttps.protocols=TLSv1.2"

# Non-root user
RUN groupadd -r mygroup && useradd -rm -g mygroup myuser
USER myuser

EXPOSE 8080

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
