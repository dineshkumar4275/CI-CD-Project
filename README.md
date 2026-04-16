<!-- # 🚀 CI/CD Pipeline for Full Stack Application

## 📌 Project Overview

This project demonstrates a complete **DevOps CI/CD pipeline** for a full stack web application using:

* Frontend: React (Vite)
* Backend: Node.js (Express)
* Database: PostgreSQL
* Containerization: Docker
* CI/CD Tool: Jenkins
* Cloud: AWS EC2

---

## 🧠 Architecture

```
GitHub → Jenkins → Docker → EC2 → Live Application
```

---

## 🟢 Features

* Full Stack Application (Frontend + Backend)
* REST API with Authentication (JWT)
* PostgreSQL Database Integration
* Dockerized Services
* Jenkins CI/CD Pipeline
* Automated Build & Deployment

---

## 🐳 Docker Setup

### Build Backend

```
docker build -t backend-app ./Backend
```

### Run Backend

```
docker run -d -p 5000:5000 --name backend backend-app
```

---

### Build Frontend

```
docker build -t frontend-app ./frontend
```

### Run Frontend

```
docker run -d -p 3000:80 --name frontend frontend-app
```

---

## 🗄️ PostgreSQL Setup

```
docker run -d --name postgres-db \
-e POSTGRES_USER=postgres \
-e POSTGRES_PASSWORD=postgres \
-e POSTGRES_DB=mydb \
-p 5432:5432 postgres
```

---

## ⚙️ Jenkins Pipeline

* Clone code from GitHub
* Build Docker images
* Run containers
* Deploy application automatically

---

## 🔐 Environment Variables

```
PORT=5000
DB_USER=postgres
DB_HOST=postgres-db
DB_NAME=mydb
DB_PASSWORD=postgres
DB_PORT=5432
JWT_SECRET=your_secret_key
JWT_EXPIRE=24h
```

---

## ▶️ How to Run Project

1. Clone repository
2. Run Docker containers
3. Setup PostgreSQL
4. Run Jenkins pipeline
5. Access application in browser

---

## 🌐 Access

* Frontend: http://localhost:3000
* Backend: http://localhost:5000

---

## 💼 DevOps Skills Used

* Docker
* Jenkins
* AWS EC2
* Git & GitHub
* CI/CD Pipeline

---

## 📢 Author

**Dinesh Kumar**

---

## ⭐ Conclusion

This project demonstrates real-world DevOps practices including containerization, automation, and deployment of a full stack application. -->



# 🚀 CI/CD Pipeline Project (Docker + Jenkins + AWS EC2)

---

## 📌 Project Overview

This project demonstrates a complete **CI/CD pipeline** for deploying a full-stack application using:

* Docker 🐳
* Jenkins ⚙️
* AWS EC2 ☁️
* GitHub 🔗

---

## 🧠 Project Flow

```
GitHub → Jenkins → Docker → AWS EC2 → Live Application 🚀
```

---

# 🟢 STEP 1: AWS EC2 SETUP (CLICK METHOD)

### 👉 Go to AWS Console

1. Search → **EC2**
2. Click → **Launch Instance**
3. Name → `jenkins-server`
4. AMI → Ubuntu 22.04
5. Instance type → t2.micro

### 🔐 Key Pair

* Click → Create new key pair
* Download `.pem` file

### 🔥 Security Group

Add:

* SSH (22)
* HTTP (80)
* Custom TCP (8080)

👉 Click **Launch Instance**

---

# 🟢 STEP 2: CONNECT TO EC2

```bash
ssh -i your-key.pem ubuntu@<EC2-IP>
```

---

# 🟢 STEP 3: INSTALL DOCKER

```bash
sudo apt update -y
sudo apt install docker.io -y
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ubuntu
```

👉 Logout & reconnect:

```bash
exit
ssh -i your-key.pem ubuntu@<EC2-IP>
```

---

# 🟢 STEP 4: INSTALL JENKINS

```bash
sudo apt update -y
sudo apt install openjdk-17-jdk -y

curl -fsSL https://pkg.jenkins.io/debian/jenkins.io.key | sudo tee \
/usr/share/keyrings/jenkins-keyring.asc > /dev/null

echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
https://pkg.jenkins.io/debian binary/ | sudo tee \
/etc/apt/sources.list.d/jenkins.list > /dev/null

sudo apt update -y
sudo apt install jenkins -y

sudo systemctl start jenkins
sudo systemctl enable jenkins
```

---

# 🟢 STEP 5: OPEN JENKINS (CLICK METHOD)

👉 Open in browser:

```
http://<EC2-IP>:8080
```

### 🔓 Unlock Jenkins

```bash
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

👉 Paste password → Continue

### Setup:

* Install Suggested Plugins
* Create Admin User
* Save & Continue

---

# 🟢 STEP 6: INSTALL GIT

```bash
sudo apt install git -y
```

---

# 🟢 STEP 7: GITHUB SETUP

### 👉 Create Repository

1. Go to GitHub
2. Click → New Repository
3. Name → `ci-cd-project`
4. Click → Create

---

### PUSH CODE

```bash
git init
git add .
git commit -m "CI/CD Project"
git branch -M main
git remote add origin https://github.com/your-username/ci-cd-project.git
git push -u origin main
```

---

# 🟢 STEP 8: CREATE JENKINS PIPELINE

### 👉 Jenkins UI

1. Click → New Item
2. Name → `docker-pipeline`
3. Select → Pipeline
4. Click OK

---

### Pipeline Configuration

* Go to **Pipeline**
* Select: **Pipeline script**

---

### 🔥 Jenkinsfile

```groovy
pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
                git branch: 'main', url: 'https://github.com/your-username/ci-cd-project.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t myapp .'
            }
        }

        stage('Run Container') {
            steps {
                sh 'docker rm -f myapp-container || true'
                sh 'docker run -d -p 80:3000 --name myapp-container myapp'
            }
        }
    }
}
```

---

👉 Click **Save → Build Now**

---

# 🟢 STEP 9: FIX DOCKER PERMISSION

```bash
sudo usermod -aG docker jenkins
sudo systemctl restart jenkins
```

---

# 🟢 STEP 10: FINAL TEST

👉 Open:

```
http://<EC2-IP>
```

---

# 🎯 FINAL RESULT

✔ Code pushed to GitHub
✔ Jenkins builds automatically
✔ Docker image created
✔ Container deployed on EC2
✔ Application is LIVE 🚀

---

# 💼 SKILLS USED

* Docker
* Jenkins
* AWS EC2
* Git & GitHub
* CI/CD Pipeline

---

# 👨‍💻 AUTHOR

**Dinesh Kumar**

---

# ⭐ CONCLUSION

This project demonstrates a real-world CI/CD pipeline with automated deployment using DevOps tools.
