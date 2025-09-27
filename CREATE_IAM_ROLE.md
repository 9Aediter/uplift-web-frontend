# สร้าง IAM Role สำหรับ GitHub Actions OIDC

## 🚀 คำสั่งสร้าง IAM Role (วิธีเร็ว)

### 1. สร้าง OIDC Provider (ถ้ายังไม่มี)

```bash
aws iam create-open-id-connect-provider \
  --url https://token.actions.githubusercontent.com \
  --client-id-list sts.amazonaws.com \
  --thumbprint-list 6938fd4d98bab03faadb97b34396831e3780aea1
```

### 2. สร้าง Trust Policy

```bash
cat > trust-policy.json << 'EOF'
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
EOF
```

### 3. สร้าง ECR Permission Policy

```bash
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
```

### 4. สร้าง IAM Role และ Policy

```bash
# แทนที่ YOUR_ACCOUNT_ID ด้วย AWS Account ID จริง
export AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
echo "AWS Account ID: $AWS_ACCOUNT_ID"

# อัปเดต trust policy ด้วย Account ID จริง
sed -i "s/YOUR_ACCOUNT_ID/$AWS_ACCOUNT_ID/g" trust-policy.json

# สร้าง IAM Role
aws iam create-role \
  --role-name GitHubActions-UpliftFrontend \
  --assume-role-policy-document file://trust-policy.json \
  --description "GitHub Actions role for Uplift Frontend deployment"

# สร้าง ECR Policy
aws iam create-policy \
  --policy-name ECRAccess-UpliftFrontend \
  --policy-document file://ecr-policy.json \
  --description "ECR access for Uplift Frontend"

# แนบ Policy กับ Role
aws iam attach-role-policy \
  --role-name GitHubActions-UpliftFrontend \
  --policy-arn arn:aws:iam::$AWS_ACCOUNT_ID:policy/ECRAccess-UpliftFrontend

# แสดง Role ARN
aws iam get-role \
  --role-name GitHubActions-UpliftFrontend \
  --query 'Role.Arn' \
  --output text
```

### 5. Copy Role ARN

คำสั่งสุดท้ายจะแสดง Role ARN ให้ copy มาใส่ใน GitHub Secret:

```
arn:aws:iam::123456789012:role/GitHubActions-UpliftFrontend
```

## 📝 GitHub Secrets ที่ต้องเพิ่ม

| Secret Name | Value | ตัวอย่าง |
|-------------|-------|----------|
| `AWS_ROLE_ARN` | Role ARN ที่ได้จากข้างบน | `arn:aws:iam::123456789012:role/GitHubActions-UpliftFrontend` |
| `GITOPS_TOKEN` | GitHub Personal Access Token | `ghp_xxxxxxxxxxxxxxxxxxxx` |

## 📝 GitHub Variables ที่ต้องเพิ่ม

| Variable Name | Value | ตัวอย่าง |
|---------------|-------|----------|
| `GITOPS_REPO` | GitOps Repository | `9Aediter/uplift-k3s-gitops` |
| `PRODUCTION_URL` | Production URL | `https://uplifttech.store` |

## ✅ การทดสอบ

หลังจากสร้าง Role และเพิ่ม Secrets/Variables แล้ว:

1. Push code หรือ trigger workflow manually
2. ตรวจสอบ job "docker-build" ว่าผ่านหรือไม่
3. ดูว่า ECR มี image ใหม่หรือไม่

## 🔒 ข้อดีของ OIDC เทียบกับ Access Keys

1. **ปลอดภัยกว่า**: ไม่มี long-lived credentials
2. **จัดการง่าย**: ไม่ต้อง rotate keys
3. **ควบคุมได้ดี**: จำกัดการใช้งานเฉพาะ repository และ branch
4. **ตรวจสอบได้**: มี CloudTrail logs ที่ชัดเจน

## 🚨 หมายเหตุสำคัญ

- แทนที่ `YOUR_ACCOUNT_ID` ด้วย AWS Account ID จริง
- ตรวจสอบว่า repository path ใน trust policy ถูกต้อง
- หาก error ให้ดู CloudTrail logs เพื่อ debug