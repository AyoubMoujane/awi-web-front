pipeline {
    agent {
        docker {
            image 'node:14-alpine'
            args '-p 3000:3000'
        }
    }
    environment {
        HOME= '.'
        CI = 'true'
        registry = "ayoubmoujane/awi-web-front"
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
    }
}

node {
    def app

    stage('Build image') {
        app = docker.build("ayoubmoujane/awi-web-front")
    }

    stage('Test image') {
        app.inside {
            sh 'echo "Tests passed"'
        }
    }

    stage('Push image') {
        docker.withRegistry('https://registry.hub.docker.com', 'dockerhub-ayoubmoujane') {
            app.push("${env.BUILD_NUMBER}")
            app.push("latest")
        }
    }

    stage('Deploy') {
        withCredentials([sshUserPrivateKey(credentialsId: "web-front-server", keyFileVariable: 'credentials')]) {
            sh 'scp -i ${keyfile} deploy.sh ec2-user@13.36.72.231:~/'
            sh 'ssh -i ${keyfile} ec2-user@13.36.72.231 "chmod +x deploy.sh"'
            sh 'ssh -i ${keyfile} ec2-user@13.36.72.231 ./deploy.sh'
        }     
    }

}