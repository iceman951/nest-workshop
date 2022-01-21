pipeline {
    environment {
        registry = "iceman951/nestjs-app-for-jenkins"
        registryCredential = 'iceman951'
        dockerImage = ''
    }
    
    agent any

    tools {nodejs "NodeJS 17.4.0"}
 
    stages {
 
        stage('Building our image') {
            steps{
                script {
                    dockerImage = docker.build registry + ":$BUILD_NUMBER"
                }
            }
        }

        stage('Deploy our image') {
            steps{
                script {
                    docker.withRegistry( '', registryCredential ) {
                        dockerImage.push()
                    }
                }
            }
        }
 
        stage('Yarn Install') {
            steps {
                echo 'Yarn Install'
                echo '******************************'
            }
        }
 
        stage('Cleaning up') {
            steps{
                script{
                    sh "docker rmi $registry:$BUILD_NUMBER"
                }
            }
        }
 
        stage('Deploy') {
            steps{
                echo 'Deploy'
                echo '******************************'
            }
        }
    }
}
