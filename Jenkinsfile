// def isSkip = true 

pipeline {
    environment {
        // registry = "iceman951/nestjs-app-for-jenkins"
        DOCKERHUB_CREDENTIALS=credentials('iceman951')
        // dockerImage = ''
    }
    
    agent any

    parameters { string(name: "isSkip", defaultValue: "true", trim: false, description: "DESCRIPTION") }
    parameters { string(name: "APPVERSION", defaultValue: "lastest", trim: false, description: "DESCRIPTION") }

    tools {nodejs "NodeJS 17.4.0"}
 
    stages {

        // stage('Run Tests') {
        //     steps {
        //         sh 'npm install'
        //         sh '********** run test **********'
        //         sh 'npm run test'
        //         sh '********** run test:e2e **********'
        //         sh 'npm run test:e2e'
        //     }
        // }

        stage('Run Tests') {
            when {
                expression { return "${params.isSkip}" == 'true'}
            }
            steps {
                build job: 'Run_Test_Pipeline'
            }
        }
        
        stage('Building image') {
            when {
                expression { return "${params.isSkip}" == 'true'}
            }
            steps{
                script {
                    sh 'docker build . -t iceman951/nestjs-app-for-jenkins'
                }
            }
        }

		stage('Login& Push Docker') {
            when {
                expression { return "${params.isSkip}" == 'true'}
            }

			steps {
				sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                sh 'docker push iceman951/nestjs-app-for-jenkins:"${params.APPVERSION}'
			}
		}

        stage('Compose up') {
			steps {
                sh "export APPVERSION=${APPVERSION}"
                sh "docker-compose up -d"
                sh "echo ${params.isSkip}"
			}
		}
    }
    post {
        always {
            mail bcc: '',
            body: "<b>Example</b><br>Project: ${env.JOB_NAME} <br>Build Number: ${env.BUILD_NUMBER} <br> URL de build: ${env.BUILD_URL}", cc: '', charset: 'UTF-8', from: '', mimeType: 'text/html', replyTo: '', subject: "ALWAYS CI: Project name -> ${env.JOB_NAME}", to: "k.vorrapong.dev@gmail.com";
        }
        success {
            sh 'echo "This will run only if successful"'
        }
        failure {
                sh 'echo "This will run only if failed"'
        }
        unstable {
            sh 'echo "This will run only if the run was marked as unstable"'
        }
        changed {
            sh 'echo "This will run only if the state of the Pipeline has changed"'
            sh 'echo "For example, the Pipeline was previously failing but is now successful"'
            sh 'echo "... or the other way around :)"'
        }
    }
}
