pipeline {
    agent {
        docker {
            image 'node:carbon-jessie' 
        }
    }
    stages {
        stage('Build') { 
            steps {
                sh 'npm install' 
            }
        }
    }
}