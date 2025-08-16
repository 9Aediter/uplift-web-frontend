# UPLIFT Admin API Documentation

This document outlines all API endpoints in the current Next.js application for migration to NestJS.

## Base URL
- Development: `http://localhost:3000/api`
- Production: `https://your-domain.com/api`

## Authentication
The system uses NextAuth.js for authentication with multiple providers:
- Google OAuth
- Facebook OAuth  
- Credentials (email/password)

Most admin endpoints require authentication and proper role permissions.

---

## 1. Authentication APIs

### NextAuth.js Endpoints
**Base Path:** `/api/auth`

| Endpoint | Method | Description |
|----------|---------|-------------|
| `/api/auth/[...nextauth]` | GET, POST | NextAuth.js dynamic routes for all auth operations |

#### Supported NextAuth Routes:
- `GET /api/auth/session` - Get current session
- `POST /api/auth/signin` - Sign in with providers
- `POST /api/auth/signout` - Sign out
- `GET /api/auth/csrf` - Get CSRF token
- `GET /api/auth/providers` - Get configured providers
- `POST /api/auth/callback/[provider]` - OAuth callbacks

**Response Format:**
```json
{
  "user": {
    "id": "string",
    "email": "string", 
    "name": "string",
    "role": "USER|ADMIN|SUPER_ADMIN",
    "image": "string"
  },
  "expires": "string"
}
```

---

## 2. User Management APIs

### Get All Users
**Endpoint:** `GET /api/admin/users`
**Auth Required:** Yes (ADMIN/SUPER_ADMIN)

**Query Parameters:**
- `page?: number` - Page number (default: 1)
- `limit?: number` - Items per page (default: 10)
- `search?: string` - Search by name/email
- `role?: string` - Filter by role

**Response:**
```json
{
  "users": [
    {
      "id": "string",
      "email": "string",
      "name": "string",
      "role": "USER|ADMIN|SUPER_ADMIN",
      "status": "ACTIVE|INACTIVE|SUSPENDED",
      "image": "string",
      "createdAt": "string",
      "updatedAt": "string",
      "profile": {
        "id": "string",
        "bio": "string",
        "phone": "string",
        "address": "string"
      }
    }
  ],
  "pagination": {
    "total": "number",
    "page": "number", 
    "limit": "number",
    "totalPages": "number"
  }
}
```

### Create User
**Endpoint:** `POST /api/admin/users`
**Auth Required:** Yes (ADMIN/SUPER_ADMIN)

**Request Body:**
```json
{
  "email": "string",
  "name": "string", 
  "password": "string",
  "role": "USER|ADMIN|SUPER_ADMIN",
  "profile": {
    "bio": "string",
    "phone": "string", 
    "address": "string"
  }
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "user": {
    "id": "string",
    "email": "string",
    "name": "string",
    "role": "string",
    "createdAt": "string"
  }
}
```

### Get User by ID
**Endpoint:** `GET /api/admin/users/[id]`
**Auth Required:** Yes (ADMIN/SUPER_ADMIN)

**Response:** Same as user object in Get All Users

### Update User
**Endpoint:** `PUT /api/admin/users/[id]`
**Auth Required:** Yes (ADMIN/SUPER_ADMIN)

**Request Body:**
```json
{
  "name": "string",
  "email": "string", 
  "role": "USER|ADMIN|SUPER_ADMIN",
  "status": "ACTIVE|INACTIVE|SUSPENDED",
  "profile": {
    "bio": "string",
    "phone": "string",
    "address": "string"
  }
}
```

### Delete User
**Endpoint:** `DELETE /api/admin/users/[id]`
**Auth Required:** Yes (SUPER_ADMIN)

**Response:**
```json
{
  "message": "User deleted successfully"
}
```

---

## 3. Content Management APIs

### Get All Content
**Endpoint:** `GET /api/admin/content`
**Auth Required:** Yes (ADMIN/SUPER_ADMIN)

**Query Parameters:**
- `page?: number`
- `limit?: number`  
- `type?: string` - Content type filter
- `status?: string` - DRAFT|REVIEW|PUBLISHED|ARCHIVED
- `search?: string`

**Response:**
```json
{
  "content": [
    {
      "id": "string",
      "type": "HERO_SECTION|PROBLEM_SECTION|FEATURES_SECTION",
      "status": "DRAFT|REVIEW|PUBLISHED|ARCHIVED", 
      "locale": "en|th",
      "fields": {
        "title": "string",
        "description": "string",
        "buttons": [
          {
            "type": "SHORT|LONG",
            "text": "string", 
            "url": "string"
          }
        ]
      },
      "createdAt": "string",
      "updatedAt": "string",
      "author": {
        "id": "string",
        "name": "string"
      }
    }
  ],
  "pagination": {
    "total": "number",
    "page": "number",
    "limit": "number", 
    "totalPages": "number"
  }
}
```

### Create Content
**Endpoint:** `POST /api/admin/content`
**Auth Required:** Yes (ADMIN/SUPER_ADMIN)

**Request Body:**
```json
{
  "type": "HERO_SECTION|PROBLEM_SECTION|FEATURES_SECTION",
  "locale": "en|th",
  "fields": {
    "title": "string",
    "description": "string",
    "buttons": [
      {
        "type": "SHORT|LONG",
        "text": "string",
        "url": "string"
      }
    ]
  }
}
```

### Get Content by ID  
**Endpoint:** `GET /api/admin/content/[id]`
**Auth Required:** Yes (ADMIN/SUPER_ADMIN)

### Update Content
**Endpoint:** `PUT /api/admin/content/[id]`
**Auth Required:** Yes (ADMIN/SUPER_ADMIN)

**Request Body:** Same as Create Content

### Delete Content
**Endpoint:** `DELETE /api/admin/content/[id]`
**Auth Required:** Yes (SUPER_ADMIN)

### Publish Content
**Endpoint:** `PATCH /api/admin/content/[id]/publish`
**Auth Required:** Yes (ADMIN/SUPER_ADMIN)

**Response:**
```json
{
  "message": "Content published successfully",
  "content": {
    "id": "string",
    "status": "PUBLISHED"
  }
}
```

---

## 4. Product Management APIs

### Get All Products
**Endpoint:** `GET /api/products`
**Auth Required:** No (Public)

**Query Parameters:**
- `page?: number`
- `limit?: number`
- `category?: string`
- `featured?: boolean`

**Response:**
```json
{
  "products": [
    {
      "id": "string",
      "name": "string",
      "slug": "string", 
      "description": "string",
      "shortDescription": "string",
      "featured": "boolean",
      "status": "DRAFT|PUBLISHED|ARCHIVED",
      "images": [
        {
          "id": "string",
          "url": "string",
          "alt": "string"
        }
      ],
      "sections": [
        {
          "id": "string",
          "title": "string",
          "content": "string",
          "order": "number",
          "cards": [
            {
              "id": "string", 
              "title": "string",
              "description": "string",
              "icon": "string",
              "order": "number"
            }
          ]
        }
      ],
      "techStack": [
        {
          "id": "string",
          "name": "string",
          "category": "string",
          "icon": "string"
        }
      ],
      "createdAt": "string",
      "updatedAt": "string"
    }
  ],
  "pagination": {
    "total": "number",
    "page": "number", 
    "limit": "number",
    "totalPages": "number"
  }
}
```

### Create Product (Admin)
**Endpoint:** `POST /api/products`  
**Auth Required:** Yes (ADMIN/SUPER_ADMIN)

**Request Body:**
```json
{
  "name": "string",
  "slug": "string",
  "description": "string", 
  "shortDescription": "string",
  "featured": "boolean",
  "images": [
    {
      "url": "string",
      "alt": "string"
    }
  ],
  "sections": [
    {
      "title": "string",
      "content": "string", 
      "order": "number",
      "cards": [
        {
          "title": "string",
          "description": "string",
          "icon": "string",
          "order": "number"
        }
      ]
    }
  ],
  "techStackIds": ["string"]
}
```

### Get Product by ID
**Endpoint:** `GET /api/products/[id]`
**Auth Required:** No (Public)

### Update Product
**Endpoint:** `PUT /api/products/[id]`
**Auth Required:** Yes (ADMIN/SUPER_ADMIN)

### Delete Product  
**Endpoint:** `DELETE /api/products/[id]`
**Auth Required:** Yes (SUPER_ADMIN)

### Get Product Sections
**Endpoint:** `GET /api/products/[id]/sections`
**Auth Required:** No (Public)

### Create Product Section
**Endpoint:** `POST /api/products/[id]/sections`
**Auth Required:** Yes (ADMIN/SUPER_ADMIN)

**Request Body:**
```json
{
  "title": "string",
  "content": "string",
  "order": "number"
}
```

### Update Product Section
**Endpoint:** `PUT /api/products/[id]/sections/[sectionId]`
**Auth Required:** Yes (ADMIN/SUPER_ADMIN)

### Delete Product Section
**Endpoint:** `DELETE /api/products/[id]/sections/[sectionId]`
**Auth Required:** Yes (SUPER_ADMIN)

### Get Section Cards
**Endpoint:** `GET /api/products/[id]/sections/[sectionId]/cards`
**Auth Required:** No (Public)

### Create Section Card
**Endpoint:** `POST /api/products/[id]/sections/[sectionId]/cards`
**Auth Required:** Yes (ADMIN/SUPER_ADMIN)

**Request Body:**
```json
{
  "title": "string",
  "description": "string", 
  "icon": "string",
  "order": "number"
}
```

---

## 5. Technology Stack APIs

### Get All Technologies
**Endpoint:** `GET /api/technologies`
**Auth Required:** No (Public)

**Response:**
```json
{
  "technologies": [
    {
      "id": "string",
      "name": "string",
      "category": "FRONTEND|BACKEND|DATABASE|CLOUD|MOBILE",
      "icon": "string",
      "description": "string",
      "createdAt": "string"
    }
  ]
}
```

### Create Technology (Admin)
**Endpoint:** `POST /api/technologies`
**Auth Required:** Yes (ADMIN/SUPER_ADMIN)

**Request Body:**
```json
{
  "name": "string",
  "category": "FRONTEND|BACKEND|DATABASE|CLOUD|MOBILE",
  "icon": "string",
  "description": "string"
}
```

### Update Technology
**Endpoint:** `PUT /api/technologies/[id]`
**Auth Required:** Yes (ADMIN/SUPER_ADMIN)

### Delete Technology
**Endpoint:** `DELETE /api/technologies/[id]`  
**Auth Required:** Yes (SUPER_ADMIN)

---

## 6. File Upload APIs

### Generate Presigned URL
**Endpoint:** `POST /api/upload/presigned`
**Auth Required:** Yes (ADMIN/SUPER_ADMIN)

**Request Body:**
```json
{
  "fileName": "string",
  "fileType": "string",
  "fileSize": "number"
}
```

**Response:**
```json
{
  "presignedUrl": "string",
  "publicUrl": "string", 
  "key": "string",
  "expiresIn": "number"
}
```

### Upload Complete Callback
**Endpoint:** `POST /api/upload/complete`
**Auth Required:** Yes (ADMIN/SUPER_ADMIN)

**Request Body:**
```json
{
  "key": "string",
  "fileName": "string",
  "fileType": "string",
  "fileSize": "number",
  "publicUrl": "string"
}
```

**Response:**
```json
{
  "message": "Upload completed successfully",
  "image": {
    "id": "string",
    "url": "string",
    "fileName": "string",
    "fileSize": "number",
    "createdAt": "string"
  }
}
```

### Get Upload History
**Endpoint:** `GET /api/upload/history`
**Auth Required:** Yes (ADMIN/SUPER_ADMIN)

**Query Parameters:**
- `page?: number`
- `limit?: number`
- `type?: string` - File type filter

**Response:**
```json
{
  "uploads": [
    {
      "id": "string", 
      "fileName": "string",
      "originalName": "string",
      "fileType": "string",
      "fileSize": "number",
      "url": "string",
      "key": "string",
      "uploadedBy": {
        "id": "string",
        "name": "string"
      },
      "createdAt": "string"
    }
  ],
  "pagination": {
    "total": "number",
    "page": "number",
    "limit": "number",
    "totalPages": "number"
  }
}
```

---

## 7. Analytics & Monitoring APIs

### Get Dashboard Stats
**Endpoint:** `GET /api/admin/stats`
**Auth Required:** Yes (ADMIN/SUPER_ADMIN)

**Response:**
```json
{
  "users": {
    "total": "number",
    "active": "number", 
    "newThisMonth": "number"
  },
  "content": {
    "total": "number",
    "published": "number",
    "drafts": "number"
  },
  "products": {
    "total": "number",
    "featured": "number"
  },
  "uploads": {
    "total": "number",
    "totalSize": "number",
    "thisMonth": "number"
  }
}
```

### Get Activity Logs
**Endpoint:** `GET /api/admin/activity`
**Auth Required:** Yes (ADMIN/SUPER_ADMIN)

**Query Parameters:**
- `page?: number`
- `limit?: number`
- `userId?: string`
- `action?: string`

**Response:**
```json
{
  "activities": [
    {
      "id": "string",
      "action": "string",
      "entityType": "USER|CONTENT|PRODUCT|UPLOAD",
      "entityId": "string",
      "details": "object",
      "user": {
        "id": "string",
        "name": "string"
      },
      "ipAddress": "string",
      "userAgent": "string", 
      "createdAt": "string"
    }
  ],
  "pagination": {
    "total": "number",
    "page": "number",
    "limit": "number",
    "totalPages": "number"
  }
}
```

---

## Error Response Format

All APIs return errors in consistent format:

```json
{
  "error": {
    "code": "string",
    "message": "string", 
    "details": "object|null"
  },
  "statusCode": "number",
  "timestamp": "string"
}
```

## Common Error Codes
- `400` - Bad Request
- `401` - Unauthorized  
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `500` - Internal Server Error

## Rate Limiting
- **Public APIs**: 100 requests per minute
- **Authenticated APIs**: 1000 requests per minute  
- **Admin APIs**: 500 requests per minute
- **Upload APIs**: 50 requests per minute

## Database Schema References

### User Model
```prisma
model User {
  id            String   @id @default(cuid())
  email         String   @unique
  name          String?
  password      String?
  role          Role     @default(USER)
  status        UserStatus @default(ACTIVE)
  image         String?
  emailVerified DateTime?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  profile       Profile?
  accounts      Account[]
  sessions      Session[]
  content       Content[]
  activities    Activity[]
}

enum Role {
  USER
  ADMIN
  SUPER_ADMIN
}

enum UserStatus {
  ACTIVE
  INACTIVE  
  SUSPENDED
}
```

### Content Model
```prisma
model Content {
  id        String      @id @default(cuid())
  type      ContentType
  status    ContentStatus @default(DRAFT)
  locale    String      @default("en")
  fields    Json
  authorId  String
  createdAt DateTime    @default(now())
  updatedAt DateTime    @updatedAt
  
  author    User        @relation(fields: [authorId], references: [id])
}

enum ContentType {
  HERO_SECTION
  PROBLEM_SECTION
  FEATURES_SECTION
  CTA_SECTION
}

enum ContentStatus {
  DRAFT
  REVIEW
  PUBLISHED
  ARCHIVED
}
```

### Product Model  
```prisma
model Product {
  id               String    @id @default(cuid())
  name             String
  slug             String    @unique
  description      String?
  shortDescription String?
  featured         Boolean   @default(false)
  status           ProductStatus @default(DRAFT)
  createdAt        DateTime  @default(now())
  updatedAt        DateTime  @updatedAt
  
  images           ProductImage[]
  sections         ProductSection[]
  techStack        ProductTechnology[]
}

enum ProductStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}
```

---

## Migration Notes for NestJS

### Recommended NestJS Structure:
```
src/
├── modules/
│   ├── auth/
│   ├── users/
│   ├── content/
│   ├── products/
│   ├── technologies/
│   ├── uploads/
│   └── admin/
├── common/
│   ├── decorators/
│   ├── guards/
│   ├── interceptors/
│   └── pipes/
└── prisma/
```

### Key Migration Considerations:
1. **Authentication**: Replace NextAuth.js with Passport.js + JWT
2. **File Uploads**: Use `@nestjs/platform-express` with multer for S3 uploads
3. **Validation**: Use `class-validator` and `class-transformer`
4. **Documentation**: Implement Swagger/OpenAPI auto-generation
5. **Rate Limiting**: Use `@nestjs/throttler`
6. **Caching**: Implement Redis caching with `@nestjs/cache-manager`

This documentation provides a complete reference for rebuilding the API in NestJS while maintaining compatibility with the existing frontend.