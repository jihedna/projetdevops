pipeline {
  agent any

  environment {
    DOCKERHUB_CREDENTIALS = credentials('dockerjenkins')
  }

  stages {
    stage('🧬 Cloner les sources') {
      steps {
        git branch: 'main', url: 'https://github.com/jihedna/projetdevops.git'
      }
    }

    stage('🔨 Build Backend avec Maven') {
      steps {
        dir('gestionEmployees/gestion-employes') {
          sh 'chmod +x mvnw'
          sh './mvnw clean package -DskipTests'
        }
      }
    }

    stage('⚙ Build Frontend avec Angular') {
      steps {
        dir('gestionEmployeeFront') {
          sh 'npm install --legacy-peer-deps'
          sh 'npm run build -- --configuration production'
        }
      }
    }

    stage('🔐 Authentification DockerHub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerjenkins', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh 'echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin'
        }
      }
    }

    stage('🐳 Créer les images Docker') {
      steps {
        sh 'docker build -t abirboukhris/gestion_employes_springboot ./gestionEmployees'
        sh 'docker build -t abirboukhris/gestion_employees_angular ./gestionEmployeeFront'
      }
    }

    stage('📤 Pousser vers DockerHub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerjenkins', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh """
            echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
            docker push $DOCKER_USER/gestion_employes_springboot
            docker push $DOCKER_USER/gestion_employees_angular
          """
        }
      }
    }

    stage('🚀 Déploiement local via Docker Compose') {
      steps {
        sh '''
          cd /var/lib/jenkins/workspace/abirboukhris
          docker-compose pull
          docker-compose up -d --remove-orphans
        '''
      }
    }
  }

  post {
    success {
      echo '✅ Déploiement réussi !'
    }

    failure {
      echo '❌ Échec du pipeline !'
    }
  }
}
