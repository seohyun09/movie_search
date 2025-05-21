pipeline {
    agent any

    environment {
        // GitHub
        GIT_REPO_URL = 'https://github.com/seohyun09/movie_search.git'
        GIT_BRANCH = 'main'

        // AWS ECR
        REGION = 'ap-southeast-2'
        ECR_REGISTRY = '950846564115.dkr.ecr.ap-southeast-2.amazonaws.com'
        REPOSITORY_NAME = 'devops_ecr'
        IMAGE_NAME = "${ECR_REGISTRY}/${REPOSITORY_NAME}"
        AWS_CREDENTIAL_ID = 'devops_ecr_plugin' // Jenkins에 등록된 AWS credentials ID
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: "${GIT_BRANCH}", url: "${GIT_REPO_URL}"
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build React App') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Login to AWS ECR') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: "${AWS_CREDENTIAL_ID}"
                ]]) {
                    sh '''
                        echo "🔐 Logging in to AWS ECR..."
                        aws ecr get-login-password --region ${REGION} | \
                        docker login --username AWS --password-stdin ${ECR_REGISTRY}
                    '''
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                    echo "🐳 Building Docker image..."
                    docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} .
                    docker tag ${IMAGE_NAME}:${BUILD_NUMBER} ${IMAGE_NAME}:latest
                '''
            }
        }

        stage('Push to ECR') {
            steps {
                sh '''
                    echo "📤 Pushing Docker image to ECR..."
                    docker push ${IMAGE_NAME}:${BUILD_NUMBER}
                    docker push ${IMAGE_NAME}:latest
                '''
            }
        }

        stage('Clean up Docker Images') {
            steps {
                sh '''
                    echo "🧹 Cleaning up local Docker images..."
                    docker image prune -f --all --filter "until=1h"
                '''
            }
        }
    }

    post {
        success {
            echo "✅ SUCCESS: Docker image pushed to private ECR!"
        }
        failure {
            echo "❌ FAILED: See Jenkins console logs for details."
        }
    }
}
