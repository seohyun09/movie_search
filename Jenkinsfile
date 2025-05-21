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
        AWS_CREDENTIAL_ID = 'devops_ecr_plugin'
    }

    options {
        skipStagesAfterUnstable()
    }

    stages {
        stage('Clone Repository') {
            steps {
                echo "📥 Cloning GitHub repo..."
                git branch: "${GIT_BRANCH}", url: "${GIT_REPO_URL}"
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "📦 Installing dependencies..."
                sh 'npm ci' // 더 빠르고 안전함
            }
        }

        stage('Build React App') {
            steps {
                echo "🛠️ Building React app..."
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
                        export AWS_PAGER=""
                        aws ecr get-login-password --region ${REGION} | \
                        docker login --username AWS --password-stdin ${ECR_REGISTRY}
                    '''
                }
            }
        }


        stage('Build Docker Image') {
            steps {
                echo "🐳 Building Docker image..."
                sh """
                    docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} .
                    docker tag ${IMAGE_NAME}:${BUILD_NUMBER} ${IMAGE_NAME}:latest
                """
            }
        }

        stage('Push Docker Image to ECR') {
            steps {
                echo "📤 Pushing Docker image to ECR..."
                sh """
                    docker push ${IMAGE_NAME}:${BUILD_NUMBER}
                    docker push ${IMAGE_NAME}:latest
                """
            }
        }

        stage('Cleanup Docker') {
            steps {
                echo "🧹 Cleaning up..."
                sh 'docker image prune -f'
            }
        }
    }

    post {
        success {
            echo "✅ SUCCESS: Docker image pushed to ECR"
        }
        failure {
            echo "❌ Build failed. Check Jenkins logs."
        }
    }
}
