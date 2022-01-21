pipeline {
    environment {
        registry = "iceman951/nestjs-app-for-jenkins"
        registryCredential = 'iceman951'
        dockerImage = ''
    }
    
    agent any

    tools {nodejs "NodeJS 17.4.0"}
 
    stages {
 
        stage('Building image') {
            steps{
                script {
                    dockerImage = docker.build registry + ":$BUILD_NUMBER"
                }
            }
        }

        stage('Deploy image') {
            steps{
                script {
                    docker.withRegistry( '', registryCredential ) {
                        dockerImage.push()
                    }
                }
            }
        }

        // stage('Cleaning up') {
        //     steps{
        //         script{
        //             sh "docker rmi $registry:$BUILD_NUMBER"
        //         }
        //     }
        // }

    }
}
