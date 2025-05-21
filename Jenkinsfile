pipeline {
    agent any

    environment {
        // GitHub
        GIT_REPO_URL = 'https://github.com/seohyun09/movie_search.git'
        GIT_BRANCH = 'main'

        // AWS ECR
        REGION = 'ap-southeast-2'
        ECR_REGISTRY = '950846564115.dkr.ecr.ap-southeast-2.amazonaws.com'
        IMAGE_NAME = "${ECR_REGISTRY}/devops_ecr"
        AWS_CREDENTIAL_ID = 'devops_ecr_plugin' // Jenkins에 등록된 AWS 자격증명 ID
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
                        aws ecr get-login-password --region ${REGION} | \
                        docker login --username AWS --password-stdin ${ECR_REGISTRY}
                    '''
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh """
                    docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} .
                    docker tag ${IMAGE_NAME}:${BUILD_NUMBER} ${IMAGE_NAME}:latest
                """
            }
        }

        stage('Push to ECR') {
            steps {
                sh """
                    docker push ${IMAGE_NAME}:${BUILD_NUMBER}
                    docker push ${IMAGE_NAME}:latest
                """
            }
        }

        stage('Clean up Docker Images') {
            steps {
                sh "docker image prune -f --all --filter \"until=1h\""
            }
        }
    }

    post {
        success {
            echo "✅ SUCCESS: Pushed to ECR"
        }
        failure {
            echo "❌ FAILED: Check logs"
        }
    }
}
