pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
                git branch: 'main', url: 'https://github.com/dineshkumar4275/CI-CD-Project.git'
            }
        }

        stage('Build Backend') {
            steps {
                dir('Backend') {
                    sh 'docker build -t backend-app .'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('Frontend') {
                    sh 'docker build -t frontend-app .'
                }
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker rm -f backend || true'
                sh 'docker rm -f frontend || true'

                sh 'docker run -d -p 5000:5000 --name backend backend-app'
                sh 'docker run -d -p 80:80 --name frontend frontend-app'
            }
        }
    }
}