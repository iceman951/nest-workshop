pipeline {
    environment {
        registry = "iceman951/nestjs-app-for-jenkins"
        DOCKERHUB_CREDENTIALS=credentials('iceman951')
        dockerImage = ''
    }
    
    agent any

    tools {nodejs "NodeJS 17.4.0"}
 
    stages {
 
        stage('Building image') {
            steps{
                script {
                    sh 'docker build -t iceman951/nestjs-app-for-jenkins .'
                }
            }
        }

		stage('Login& Push Docker') {
			steps {
				sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                sh 'docker push iceman951/nestjs-app-for-jenkins'

			}
		}

        stage('Run Docker') {
			steps {
				sh 'docker run -d -p 80:80 iceman951/'
			}
		}
    }
}
