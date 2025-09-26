pipeline {
    agent any

    environment {
        // AWS ECR configuration
        AWS_ACCOUNT_ID = credentials('aws-account-id')
        AWS_REGION = 'ap-southeast-1'
        ECR_REPOSITORY = 'uplift-web-frontend'
        IMAGE_TAG = "${BUILD_NUMBER}"

        // GitOps repository configuration
        GITOPS_REPO = 'https://github.com/9Aediter/uplift-k3s-gitops.git'
        GITOPS_BRANCH = 'main'
        GITOPS_CREDENTIALS = 'github-credentials'

        // Application configuration
        APP_NAME = 'uplift-web-frontend'
        NAMESPACE = 'uplift'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Setup Node.js') {
            steps {
                sh '''
                    # Install Node.js if not available
                    if ! command -v node &> /dev/null; then
                        curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
                        sudo apt-get install -y nodejs
                    fi
                    node --version
                    npm --version
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci --production=false'
            }
        }

        stage('Lint') {
            steps {
                sh 'npm run lint'
            }
        }

        stage('Type Check') {
            steps {
                sh 'npx tsc --noEmit'
            }
        }

        stage('Build Next.js Application') {
            steps {
                sh '''
                    # Build the Next.js application
                    npm run build

                    # Show build output size
                    du -sh .next
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${ECR_REPOSITORY}:${IMAGE_TAG}")
                }
            }
        }

        stage('Push to ECR') {
            steps {
                script {
                    sh """
                        # Login to ECR
                        aws ecr get-login-password --region ${AWS_REGION} | \
                        docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com

                        # Tag the image
                        docker tag ${ECR_REPOSITORY}:${IMAGE_TAG} \
                        ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPOSITORY}:${IMAGE_TAG}

                        docker tag ${ECR_REPOSITORY}:${IMAGE_TAG} \
                        ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPOSITORY}:latest

                        # Push the image
                        docker push ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPOSITORY}:${IMAGE_TAG}
                        docker push ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPOSITORY}:latest
                    """
                }
            }
        }

        stage('Update GitOps Repository') {
            steps {
                script {
                    withCredentials([usernamePassword(
                        credentialsId: "${GITOPS_CREDENTIALS}",
                        passwordVariable: 'GIT_PASSWORD',
                        usernameVariable: 'GIT_USERNAME'
                    )]) {
                        sh """
                            # Clone GitOps repository
                            rm -rf gitops-tmp
                            git clone https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/9Aediter/uplift-k3s-gitops.git gitops-tmp
                            cd gitops-tmp

                            # Update image tag in deployment manifest
                            sed -i "s|image: .*${ECR_REPOSITORY}.*|image: ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPOSITORY}:${IMAGE_TAG}|g" \
                                manifests/${NAMESPACE}/${APP_NAME}/deployment.yaml

                            # Commit and push changes
                            git config user.email "jenkins@uplift.com"
                            git config user.name "Jenkins CI"
                            git add -A
                            git commit -m "Update ${APP_NAME} image to ${IMAGE_TAG}" || true
                            git push origin ${GITOPS_BRANCH}
                        """
                    }
                }
            }
        }

        stage('Cleanup') {
            steps {
                sh '''
                    # Clean up workspace
                    docker image prune -f
                    rm -rf gitops-tmp
                '''
            }
        }
    }

    post {
        success {
            echo "Pipeline completed successfully! Image ${IMAGE_TAG} pushed to ECR."
            echo "ArgoCD will auto-sync the changes to K3s cluster."
        }
        failure {
            echo "Pipeline failed. Please check the logs."
        }
        always {
            cleanWs()
        }
    }
}