node {
    stage('Clone repository') {
        checkout scm
    }

    stage('Build image') {
        app = docker.build("950846564115.dkr.ecr.ap-southeast-2.amazonaws.com/devops_ecr")
    }

    stage('Push image') {
        sh 'rm ~/.dockercfg || true'
        sh 'rm ~/.docker/config.json || true'

        docker.withRegistry('https://950846564115.dkr.ecr.ap-southeast-2.amazonaws.com', 'ecr:ap-southeast-2:devops_ecr_plugin') {
            app.push("${env.BUILD_NUMBER}")
            app.push("latest")
        }
    }
}
