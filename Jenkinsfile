pipeline {
    agent any

    tools {
        jdk 'JDK_17'
        maven 'Maven 3.9.9'
        nodejs 'NodeJS'
    }

    environment {
        PATH = "C:\\Program Files\\Git\\bin;${env.PATH};C:\\Program Files\\Docker\\Docker\\resources\\bin"
        FRONTEND_IMAGE = 'frontend_img'
        BACKEND_IMAGE = 'backend_img'
        VERSION = '5.5'
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

        stage('Build Backend') {
            steps {
                script {
                    def backendDir = "${WORKSPACE}/gestionEmployees"
                    if (isUnix()) {
                        sh "cd ${backendDir} && mvn clean install package"
                    } else {
                        bat "cd ${backendDir} && mvn clean install package"
                    }
                }
            }
        }

        stage('Unit Tests') {
            steps {
                script {
                    def backendDir = "${WORKSPACE}/gestionEmployees"
                    if (isUnix()) {
                        sh "cd ${backendDir} && mvn test"
                    } else {
                        bat "cd ${backendDir} && mvn test"
                    }
                }
            }
            post {
                always {
                    archiveArtifacts artifacts: 'gestionEmployees/target/surefire-reports/*.xml', allowEmptyArchive: true
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    if (isUnix()) {
                        sh """
                            docker build -t ${env.BACKEND_IMAGE}:${env.VERSION} ./gestionEmployees
                            docker build -t ${env.FRONTEND_IMAGE}:${env.VERSION} ./gestionEmployeeFront
                        """
                    } else {
                        bat """
                            docker build -t %BACKEND_IMAGE%:%VERSION% ./gestionEmployees
                            docker build -t %FRONTEND_IMAGE%:%VERSION% ./gestionEmployeeFront
                        """
                    }
                }
            }
        }

        // Optional stage for pushing to DockerHub or private registry
        /*
        stage('Push Docker Images') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    script {
                        sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"
                        sh "docker push ${env.BACKEND_IMAGE}:${env.VERSION}"
                        sh "docker push ${env.FRONTEND_IMAGE}:${env.VERSION}"
                    }
                }
            }
        }
        */

        stage('Deploy') {
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
        failure {
            echo "❌ Build failed! Check logs for more info."
        }
        success {
            echo "✅ Build and deployment completed successfully!"
        }
    }
}
