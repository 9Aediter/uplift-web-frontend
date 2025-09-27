# GitHub Variables และ Secrets Setup

สำหรับ GitHub Actions workflow ใหม่ จำเป็นต้องตั้งค่าตัวแปรต่อไปนี้ใน GitHub repository:

## 📋 Repository Variables (vars)

ไปที่: **Repository → Settings → Secrets and variables → Actions → Variables tab**

| Variable Name | Value ตัวอย่าง | คำอธิบาย |
|---------------|-------------|---------|
| `ECR_REGISTRY` | `123456789012.dkr.ecr.ap-southeast-1.amazonaws.com` | ECR Registry URL |
| `ECR_REPOSITORY` | `uplift-web-frontend` | ชื่อ ECR Repository |
| `NEXT_PUBLIC_API_URL` | `https://api.uplifttech.store` | Backend API URL |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `G-XXXXXXXXXX` | Google Analytics Measurement ID |
| `GITOPS_REPO` | `9Aediter/uplift-k3s-gitops` | GitOps Repository สำหรับ ArgoCD |
| `PRODUCTION_URL` | `https://uplifttech.store` | Production Website URL |

## 🔐 Repository Secrets (secrets)

ไปที่: **Repository → Settings → Secrets and variables → Actions → Secrets tab**

| Secret Name | Value ตัวอย่าง | คำอธิบาย |
|-------------|-------------|---------|
| `AWS_ACCESS_KEY_ID` | `AKIAIOSFODNN7EXAMPLE` | AWS Access Key ID |
| `AWS_SECRET_ACCESS_KEY` | `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY` | AWS Secret Access Key |
| `GITOPS_TOKEN` | `ghp_xxxxxxxxxxxxxxxxxxxx` | GitHub Personal Access Token |

## 🛠️ การสร้าง AWS Access Keys

### 1. สร้าง IAM User หรือใช้ User ที่มีอยู่

```bash
# สร้าง IAM User ใหม่ (ถ้ายังไม่มี)
aws iam create-user --user-name github-actions-uplift

# สร้าง Policy สำหรับ ECR
cat > ecr-policy.json << 'EOF'
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "ecr:GetAuthorizationToken",
                "ecr:BatchCheckLayerAvailability",
                "ecr:GetDownloadUrlForLayer",
                "ecr:BatchGetImage",
                "ecr:InitiateLayerUpload",
                "ecr:UploadLayerPart",
                "ecr:CompleteLayerUpload",
                "ecr:PutImage"
            ],
            "Resource": "*"
        }
    ]
}
EOF

# สร้าง Policy
aws iam create-policy \
    --policy-name ECRFullAccess-UpliftFrontend \
    --policy-document file://ecr-policy.json

# แนบ Policy กับ User
aws iam attach-user-policy \
    --user-name github-actions-uplift \
    --policy-arn arn:aws:iam::YOUR_ACCOUNT_ID:policy/ECRFullAccess-UpliftFrontend

# สร้าง Access Key
aws iam create-access-key --user-name github-actions-uplift
```

### 2. Copy Access Key และ Secret Key

ผลลัพธ์จะแสดง:
```json
{
    "AccessKey": {
        "UserName": "github-actions-uplift",
        "AccessKeyId": "AKIAIOSFODNN7EXAMPLE",
        "Status": "Active",
        "SecretAccessKey": "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
    }
}
```

นำ `AccessKeyId` และ `SecretAccessKey` ไปใส่ใน GitHub Secrets

## 🔑 การสร้าง GitHub Personal Access Token

### 1. สร้าง Token

1. ไปที่ **GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)**
2. คลิก **"Generate new token (classic)"**
3. ตั้งชื่อ: `GitOps Repository Access - Uplift Frontend`
4. เลือก Expiration: `90 days` หรือ `No expiration`
5. เลือก Scopes:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `workflow` (Update GitHub Action workflows)
6. คลิก **"Generate token"**
7. **Copy token ทันที** (จะไม่สามารถดูได้อีก)

### 2. ใส่ Token ใน GitHub Secrets

นำ token ที่ copy มาใส่ใน `GITOPS_TOKEN` secret

## ✅ ตรวจสอบการตั้งค่า

หลังจากตั้งค่าเสร็จแล้ว:

### 1. ตรวจสอบ Variables และ Secrets

ไปที่ **Repository → Settings → Secrets and variables → Actions**

- **Variables tab**: ต้องมี 6 ตัวแปร
- **Secrets tab**: ต้องมี 3 secrets

### 2. ทดสอบ Workflow

1. Push code ไป main branch หรือ
2. ไปที่ **Actions tab → เลือก workflow → Run workflow**

### 3. ตรวจสอบ Logs

ดู logs ของแต่ละ job:
- ✅ Quality Gate: ต้องผ่าน
- ✅ Docker Build: ต้อง build และ push สำเร็จ
- ✅ GitOps Update: ต้องอัปเดต manifest สำเร็จ
- ✅ Health Check: ต้องเข้าถึงเว็บไซต์ได้

## 🚨 หมายเหตุสำคัญ

1. **AWS Credentials**: ใช้ Access Keys แทน OIDC เพื่อความง่าย
2. **ECR Repository**: ต้องสร้างใน AWS ก่อนการใช้งาน
3. **GitOps Repository**: ต้องมี K8s manifests พร้อมใช้งาน
4. **Token Expiration**: ต้องต่ออายุ Personal Access Token เป็นระยะ
5. **Environment**: ใช้ `environment: production` สำหรับ protection rules

## 🔄 การ Rotate Credentials

### AWS Access Keys (ทุก 90 วัน)
```bash
# สร้าง Access Key ใหม่
aws iam create-access-key --user-name github-actions-uplift

# อัปเดตใน GitHub Secrets
# ลบ Access Key เก่า
aws iam delete-access-key --user-name github-actions-uplift --access-key-id OLD_ACCESS_KEY_ID
```

### GitHub Token (ตามที่ตั้งค่า)
1. สร้าง token ใหม่ใน GitHub Settings
2. อัปเดตใน `GITOPS_TOKEN` secret
3. ลบ token เก่า