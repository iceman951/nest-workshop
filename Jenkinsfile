// def isSkip = true 

pipeline {
    environment {
        registry = "iceman951/nestjs-app-for-jenkins" 
        registryCredential = 'iceman951' 
        dockerImage = ''
        APPVERSION = "${params.APPVERSION}"
    }
    
    agent any

    // parameters {
    //     string(name: "isSkip", defaultValue: "true", trim: false, description: "DESCRIPTION")
    //     string(name: "APPVERSION", defaultValue: "lastest", trim: false, description: "DESCRIPTION")
    // }

    tools {nodejs "NodeJS 17.4.0"}

    stages {

        stage('deploy postgres') {
            steps {
                withKubeConfig([credentialsId: 'mykubeconfig', serverUrl: 'https://kubernetes.docker.internal:6443']) {
                    sh 'kubectl apply -f postgres-yaml/postgres-pv.yaml'
                    sh 'kubectl apply -f postgres-yaml/postgres-pvc.yaml'
                    // sh 'kubectl delete secret postgres-secret -n nestjs'
                    sh 'kubectl create secret generic postgres-secret --from-env-file=postgres-yaml/postgres-secret.txt -n nestjs'
                    sh 'kubectl apply -f postgres-yaml/postgres-deployment.yaml'
                    sh 'kubectl apply -f postgres-yaml/postgres-cluster-ip-service.yaml'
                    sh 'kubectl apply -f postgres-yaml/postgres-nodeport.yaml'
                }
            }
        }

                stage('deploy nestjs') {
            steps {
                withKubeConfig([credentialsId: 'mykubeconfig', serverUrl: 'https://kubernetes.docker.internal:6443']) {
                    sh 'kubectl apply -f nestjs-yaml/nestjs-pv.yaml'
                    sh 'kubectl apply -f nestjs-yaml/nestjs-pvc.yaml'
                    // sh 'kubectl delete configmap db-port -n nestjs'
                    sh 'kubectl create configmap db-port --from-literal=POSTGRES_PORT=5432 -n nestjs'
                    sh 'kubectl apply -f nestjs-yaml/nestjs-deployment.yaml'
                    sh 'kubectl apply -f nestjs-yaml/nestjs-cluster-ip-service.yaml'
                    sh 'kubectl apply -f nestjs-yaml/nestjs-nodeport.yaml'
                }
            }
        }

        // stage('create pvc') {
        //     steps {
        //         script {
        //             kubernetesDeploy(configs: "./postgres-yaml/postgres-pvc.yaml")
        //         }
        //     }
        // }

        // stage('Run Tests') {
        //     steps {
        //         sh 'npm install'
        //         sh '********** run test **********'
        //         sh 'npm run test'
        //         sh '********** run test:e2e **********'
        //         sh 'npm run test:e2e'
        //     }
        // }

        // stage('Run Tests') {
        //     when {
        //         expression { return "${params.isSkip}" == 'true'}
        //     }
        //     steps {
        //         build job: 'Run_Test_Pipeline'
        //     }
        // }
        
        // stage('Building image') {
        //     when {
        //         expression { return "${params.isSkip}" == 'true'}
        //     }
        //     steps{
        //         script {
        //             dockerImage = docker.build registry + ":${params.APPVERSION}"
        //         }
        //     }
        // }

		// stage('Push to DockerHub') {
        //     when {
        //         expression { return "${params.isSkip}" == 'true'}
        //     }

		// 	steps {
        //         script {
        //             docker.withRegistry( '', registryCredential ) { 
        //                 dockerImage.push()
        //             }
        //         }
		// 	}
		// }

        // stage('Compose up') {
		// 	steps {
        //         // sh "export APPVERSION=${params.APPVERSION}"
        //         sh "docker-compose up -d"
        //         sh "echo ${params.isSkip}"
		// 	}
		// }
    
    // post {
    //     always {
    //         mail bcc: '',
    //         body: "<b>Example</b><br>Project: ${env.JOB_NAME} <br>Build Number: ${env.BUILD_NUMBER} <br> URL de build: ${env.BUILD_URL}", cc: '', charset: 'UTF-8', from: '', mimeType: 'text/html', replyTo: '', subject: "ALWAYS CI: Project name -> ${env.JOB_NAME}", to: "k.vorrapong.dev@gmail.com";
    //     }
    //     success {
    //         sh 'echo "This will run only if successful"'
    //     }
    //     failure {
    //             sh 'echo "This will run only if failed"'
    //     }
    //     unstable {
    //         sh 'echo "This will run only if the run was marked as unstable"'
    //     }
    //     changed {
    //         sh 'echo "This will run only if the state of the Pipeline has changed"'
    //         sh 'echo "For example, the Pipeline was previously failing but is now successful"'
    //         sh 'echo "... or the other way around :)"'
    //     }
    }
}
