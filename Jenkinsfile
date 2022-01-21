pipeline {
    environment {
        registry = "YourDockerhubAccount/YourRepository"
        registryCredential = 'dockerhub_id'
        dockerImage = ''
    }
    
    agent any

    tools {nodejs "NodeJS 17.4.0"}
 
    stages {
 
        stage('Init'){
            steps {
                echo 'Init'
                echo '******************************'
            }
        }
 
        stage('Yarn Install') {
            steps {
                echo 'Yarn Install'
                echo '******************************'
            }
        }
 
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
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
