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
                    sh 'docker build . -t iceman951/nestjs-app-for-jenkins'
                }
            }
        }

		stage('Login& Push Docker') {
			steps {
				sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                sh 'docker push iceman951/nestjs-app-for-jenkins'

			}
		}

        stage('Run Containers') {
			steps {
                sh 'docker run --name postgres-container -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres'
				sh 'docker run -d -p 3000:3000 iceman951/nestjs-app-for-jenkins'
			}
		}
    }
    post {
        always {
            emailext body: 'A Test EMail', recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'RequesterRecipientProvider']], subject: 'Test'
        }
    }
}
