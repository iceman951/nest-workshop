pipeline {
    environment {
    registry = "iceman951/nestjs-app-for-jenkins"
    registryCredential = 'iceman951'
    dockerImage = ''
    }
    
    agent any  
 
    stages {
 
        stage('Init'){
            steps {
                echo 'Init'
                echo '******************************'
            }
        }

        stage('Building Image'){
            steps {
                echo 'Build Image'
                echo '******************************'
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
 
        stage('Deploy') {
            steps{
                echo 'Deploy'
                echo '******************************'
            }
        }
    }
}
