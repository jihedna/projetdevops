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

        // ⬇️ ADD THESE STAGES HERE ⬇️

        stage('Build Backend') {
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

        stage('Tests Unitaires') {
            steps {
                dir('gestionEmployees/gestion-employes') {
                    script {
                        if (isUnix()) {
                            sh 'mvn test'
                        } else {
                            bat 'mvn test'
                        }
                    }
                }
            }
            post {
                always {
                    archiveArtifacts artifacts: 'target/surefire-reports/*.xml', allowEmptyArchive: true
                }
            }
        }

        // ⬆️ Then continue with your Docker build, deploy, etc.
    }
}
