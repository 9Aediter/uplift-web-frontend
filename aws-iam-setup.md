# การตั้งค่า AWS IAM Role สำหรับ GitHub Actions

## ขั้นตอนการสร้าง IAM Role

### 1. สร้าง OIDC Provider (ถ้ายังไม่มี)

```bash
aws iam create-open-id-connect-provider \
  --url https://token.actions.githubusercontent.com \
  --client-id-list sts.amazonaws.com \
  --thumbprint-list 6938fd4d98bab03faadb97b34396831e3780aea1
```

### 2. สร้าง Trust Policy

สร้างไฟล์ `trust-policy.json`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::YOUR_ACCOUNT_ID:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com",
          "token.actions.githubusercontent.com:sub": "repo:9Aediter/uplift-web-frontend:ref:refs/heads/main"
        }
      }
    }
  ]
}
```

**⚠️ แทนที่ YOUR_ACCOUNT_ID ด้วย AWS Account ID จริงของคุณ**

### 3. สร้าง Permission Policy

สร้างไฟล์ `ecr-policy.json`:

```json
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
```

### 4. สร้าง IAM Role

```bash
# สร้าง Role
aws iam create-role \
  --role-name GitHubActions-UpliftFrontend \
  --assume-role-policy-document file://trust-policy.json

# สร้าง Policy
aws iam create-policy \
  --policy-name ECRAccess-UpliftFrontend \
  --policy-document file://ecr-policy.json

# แนบ Policy กับ Role
aws iam attach-role-policy \
  --role-name GitHubActions-UpliftFrontend \
  --policy-arn arn:aws:iam::YOUR_ACCOUNT_ID:policy/ECRAccess-UpliftFrontend
```

### 5. ดู ARN ของ Role

```bash
aws iam get-role --role-name GitHubActions-UpliftFrontend --query 'Role.Arn' --output text
```

ผลลัพธ์จะเป็น: `arn:aws:iam::YOUR_ACCOUNT_ID:role/GitHubActions-UpliftFrontend`

## การตั้งค่า GitHub Secrets

ไปที่ GitHub repository → Settings → Secrets and variables → Actions

เพิ่ม Secrets ต่อไปนี้:

| Secret Name | ค่าที่ต้องใส่ | ตัวอย่าง |
|-------------|-------------|----------|
| `AWS_ROLE_ARN` | ARN ของ IAM Role | `arn:aws:iam::123456789012:role/GitHubActions-UpliftFrontend` |
| `AWS_ACCOUNT_ID` | AWS Account ID | `123456789012` |
| `NEXT_PUBLIC_API_URL` | Backend API URL | `https://api.uplifttech.store` |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics ID | `G-XXXXXXXXXX` |
| `GITOPS_REPO` | GitOps Repository | `9Aediter/uplift-k3s-gitops` |
| `GITOPS_TOKEN` | GitHub Personal Access Token | `ghp_xxxxxxxxxxxx` |
| `PRODUCTION_URL` | Production Website URL | `https://uplifttech.store` |

## การสร้าง GitHub Personal Access Token

1. ไปที่ GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. คลิก "Generate new token (classic)"
3. ตั้งชื่อ: "GitOps Repository Access"
4. เลือก scopes:
   - `repo` (Full control of private repositories)
   - `workflow` (Update GitHub Action workflows)
5. คลิก "Generate token"
6. Copy token และนำไปใส่ใน `GITOPS_TOKEN` secret

## การตรวจสอบ

หลังจากตั้งค่าเสร็จแล้ว ให้ทดสอบ:

1. Push code ไป main branch
2. ดู GitHub Actions workflow ใน tab "Actions"
3. ตรวจสอบว่า job "docker-build" ผ่านหรือไม่

หาก error ยังคงมี ให้ตรวจสอบ:
- AWS Account ID ถูกต้องหรือไม่
- Repository path ใน trust policy ถูกต้องหรือไม่
- OIDC Provider มีอยู่ใน AWS หรือไม่