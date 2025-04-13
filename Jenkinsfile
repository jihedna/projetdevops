pipeline {
    agent any

    tools {
        jdk 'JDK_17'
        maven 'Maven 3.9.9'
        nodejs 'NodeJS'
    }

    environment {
        DOCKERHUB_USER = 'jihed601' // 🛠️ Replace with your Docker Hub username
        FRONTEND_IMAGE = 'frontend_img'
        BACKEND_IMAGE = 'backend_img'
        VERSION = '5.5'
        PATH = "C:\\Program Files\\Git\\bin;${env.PATH};C:\\Program Files\\Docker\\Docker\\resources\\bin"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/jihedna/projetdevops.git'
            }
        }

        stage('Build Frontend') {
            steps {
                script {
                    def frontendDir = "${WORKSPACE}/gestionEmployeeFront"
                    if (isUnix()) {
                        sh "cd ${frontendDir} && npm install && npm run build --prod"
                    } else {
                        bat "cd ${frontendDir} && npm install && npm run build --prod"
                    }
                }
            }
        }

        stage('Build Backend (skip tests)') {
            steps {
                dir('gestionEmployees/gestion-employes') {
                    script {
                        if (isUnix()) {
                            sh 'mvn clean install -DskipTests'
                        } else {
                            bat 'mvn clean install -DskipTests'
                        }
                    }
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    if (isUnix()) {
                        sh """
                            docker build -t ${DOCKERHUB_USER}/${BACKEND_IMAGE}:${VERSION} ./gestionEmployees/gestion-employes
                            docker build -t ${DOCKERHUB_USER}/${FRONTEND_IMAGE}:${VERSION} ./gestionEmployeeFront
                        """
                    } else {
                        bat """
                            docker build -t %DOCKERHUB_USER%/%BACKEND_IMAGE%:%VERSION% ./gestionEmployees/gestion-employes
                            docker build -t %DOCKERHUB_USER%/%FRONTEND_IMAGE%:%VERSION% ./gestionEmployeeFront
                        """
                    }
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds-id', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    script {
                        if (isUnix()) {
                            sh """
                                echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                                docker push ${DOCKERHUB_USER}/${BACKEND_IMAGE}:${VERSION}
                                docker push ${DOCKERHUB_USER}/${FRONTEND_IMAGE}:${VERSION}
                            """
                        } else {
                            bat """
                                echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin
                                docker push %DOCKERHUB_USER%/%BACKEND_IMAGE%:%VERSION%
                                docker push %DOCKERHUB_USER%/%FRONTEND_IMAGE%:%VERSION%
                            """
                        }
                    }
                }
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'docker-compose -f docker-compose.yml down --remove-orphans'
                        sh 'docker-compose -f docker-compose.yml up -d'
                    } else {
                        bat 'docker-compose -f docker-compose.yml down --remove-orphans'
                        bat 'docker-compose -f docker-compose.yml up -d'
                    }
                }
            }
        }
    }

    post {
        success {
            echo "✅ Pipeline completed successfully!"
        }
        failure {
            echo "❌ Pipeline failed. Check the logs for errors."
        }
    }
}
