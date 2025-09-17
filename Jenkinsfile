pipeline {
    agent { label 'builder' }

    environment {
        AWS_DEFAULT_REGION = 'ap-southeast-1'
        ECR_REGISTRY = credentials('ecr-registry')
        ECR_REPOSITORY = 'uplift-web-frontend'
        IMAGE_TAG = "${BUILD_NUMBER}"
        NEXT_PUBLIC_API_URL = credentials('http://localhost:3000')
        NEXT_PUBLIC_GA_MEASUREMENT_ID = credentials('ga-measurement-id')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo "Building Docker image..."
                    sh """
                        docker build \
                            --build-arg NEXT_PUBLIC_GA_MEASUREMENT_ID=${NEXT_PUBLIC_GA_MEASUREMENT_ID} \
                            --build-arg NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL} \
                            -t ${ECR_REPOSITORY}:${IMAGE_TAG} \
                            -t ${ECR_REPOSITORY}:latest .
                    """
                }
            }
        }

        stage('Login to ECR') {
            steps {
                script {
                    echo "Logging in to Amazon ECR..."
                    sh """
                        aws ecr get-login-password --region ${AWS_DEFAULT_REGION} | \
                        docker login --username AWS --password-stdin ${ECR_REGISTRY}
                    """
                }
            }
        }

        stage('Push to ECR') {
            steps {
                script {
                    echo "Tagging and pushing image to ECR..."
                    sh """
                        docker tag ${ECR_REPOSITORY}:${IMAGE_TAG} ${ECR_REGISTRY}/${ECR_REPOSITORY}:${IMAGE_TAG}
                        docker tag ${ECR_REPOSITORY}:latest ${ECR_REGISTRY}/${ECR_REPOSITORY}:latest

                        docker push ${ECR_REGISTRY}/${ECR_REPOSITORY}:${IMAGE_TAG}
                        docker push ${ECR_REGISTRY}/${ECR_REPOSITORY}:latest
                    """
                }
            }
        }

        stage('Deploy to k3s') {
            steps {
                script {
                    echo "Deploying to k3s cluster..."

                    // Create namespace if not exists
                    sh """
                        kubectl create namespace uplift-prod --dry-run=client -o yaml | kubectl apply -f -
                    """

                    // Apply k8s manifests
                    sh """
                        cat <<EOF | kubectl apply -f -
                        apiVersion: apps/v1
                        kind: Deployment
                        metadata:
                          name: uplift-frontend
                          namespace: uplift-prod
                          labels:
                            app: uplift-frontend
                        spec:
                          replicas: 2
                          selector:
                            matchLabels:
                              app: uplift-frontend
                          template:
                            metadata:
                              labels:
                                app: uplift-frontend
                            spec:
                              containers:
                              - name: frontend
                                image: ${ECR_REGISTRY}/${ECR_REPOSITORY}:${IMAGE_TAG}
                                ports:
                                - containerPort: 3000
                                env:
                                - name: NEXT_PUBLIC_API_URL
                                  value: "${NEXT_PUBLIC_API_URL}"
                                - name: NEXT_PUBLIC_GA_MEASUREMENT_ID
                                  value: "${NEXT_PUBLIC_GA_MEASUREMENT_ID}"
                                resources:
                                  requests:
                                    memory: "256Mi"
                                    cpu: "250m"
                                  limits:
                                    memory: "512Mi"
                                    cpu: "500m"
                                livenessProbe:
                                  httpGet:
                                    path: /
                                    port: 3000
                                  initialDelaySeconds: 30
                                  periodSeconds: 10
                                readinessProbe:
                                  httpGet:
                                    path: /
                                    port: 3000
                                  initialDelaySeconds: 5
                                  periodSeconds: 5
                        ---
                        apiVersion: v1
                        kind: Service
                        metadata:
                          name: uplift-frontend-service
                          namespace: uplift-prod
                        spec:
                          selector:
                            app: uplift-frontend
                          type: LoadBalancer
                          ports:
                          - port: 80
                            targetPort: 3000
                            protocol: TCP
                        ---
                        apiVersion: networking.k8s.io/v1
                        kind: Ingress
                        metadata:
                          name: uplift-frontend-ingress
                          namespace: uplift-prod
                          annotations:
                            nginx.ingress.kubernetes.io/rewrite-target: /
                            cert-manager.io/cluster-issuer: "letsencrypt-prod"
                        spec:
                          ingressClassName: nginx
                          tls:
                          - hosts:
                            - uplifttech.store
                            - www.uplifttech.store
                            secretName: uplift-frontend-tls
                          rules:
                          - host: uplifttech.store
                            http:
                              paths:
                              - path: /
                                pathType: Prefix
                                backend:
                                  service:
                                    name: uplift-frontend-service
                                    port:
                                      number: 80
                          - host: www.uplifttech.store
                            http:
                              paths:
                              - path: /
                                pathType: Prefix
                                backend:
                                  service:
                                    name: uplift-frontend-service
                                    port:
                                      number: 80
                        EOF
                    """

                    // Wait for rollout to complete
                    sh """
                        kubectl rollout status deployment/uplift-frontend -n uplift-prod --timeout=5m
                    """
                }
            }
        }

        stage('Verify Deployment') {
            steps {
                script {
                    echo "Verifying deployment..."
                    sh """
                        kubectl get pods -n uplift-prod -l app=uplift-frontend
                        kubectl get service -n uplift-prod uplift-frontend-service
                        kubectl get ingress -n uplift-prod uplift-frontend-ingress
                    """
                }
            }
        }
    }

    post {
        always {
            script {
                // Clean up Docker images on build agent
                sh """
                    docker rmi ${ECR_REPOSITORY}:${IMAGE_TAG} || true
                    docker rmi ${ECR_REPOSITORY}:latest || true
                    docker rmi ${ECR_REGISTRY}/${ECR_REPOSITORY}:${IMAGE_TAG} || true
                    docker rmi ${ECR_REGISTRY}/${ECR_REPOSITORY}:latest || true
                """
            }
        }

        success {
            echo "✅ Deployment successful! Frontend is running on k3s cluster."
            echo "Build: ${BUILD_NUMBER}"
            echo "Image: ${ECR_REGISTRY}/${ECR_REPOSITORY}:${IMAGE_TAG}"
        }

        failure {
            echo "❌ Deployment failed. Please check the logs."
        }
    }
}