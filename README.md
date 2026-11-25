# URL Shortener

A full-featured URL shortening service built with **TypeScript**, **Express**, and **Prisma ORM** (PostgreSQL). It includes user authentication (register/login/logout), JWT-based session management, avatar uploads via Cloudinary, and short URL redirection with click tracking.

## 🚀 Features

- **User Authentication** — Register, login, logout, and get current user profile
- **JWT Sessions** — HttpOnly cookie-based authentication with 1-hour expiry
- **URL Shortening** — Create short URLs with nanoid-generated short codes
- **Click Tracking** — Every redirect increments the click counter
- **Avatar Uploads** — Profile pictures stored via Cloudinary
- **Protected Routes** — Auth middleware guards URL creation and user profile endpoints
- **Input Validation** — express-validator for registration, login, and URL creation
- **Error Handling** — Centralized error middleware with operational vs. unexpected errors
- **Database Migrations** — Prisma ORM with PostgreSQL and migration history

## 📁 Project Structure

```
url-shortner/
├── prisma.config.ts              # Prisma ORM CLI configuration
├── server.ts                     # Application entry point
├── tsconfig.json                 # TypeScript compiler config
├── package.json                  # Dependencies and scripts
├── .gitignore                    # Git ignore rules
├── prisma-8.md                   # Prisma ORM documentation
├── ts.md                         # TypeScript utility types reference
├── README.md                     # This file
├── src/
│   ├── app.ts                    # Express app setup and middleware
│   ├── controllers/
│   │   ├── url.controller.ts     # URL shortener & redirect controllers
│   │   └── user.controller.ts    # Auth controllers (register, login, logout, me)
│   ├── middlewares/
│   │   ├── auth.middleware.ts    # JWT authentication middleware
│   │   ├── error.middleware.ts   # Global error handler
│   │   ├── multer.middleware.ts  # File upload configuration
│   │   └── validate.middleware.ts# express-validator result handler
│   ├── prisma/
│   │   ├── db.ts                 # Prisma database client
│   │   ├── contract.prisma       # Data model schema
│   │   ├── contract.json         # Generated contract (committed)
│   │   └── contract.d.ts         # Generated TypeScript types (committed)
│   ├── repositories/
│   │   ├── url.repository.ts     # ShortUrl data access layer
│   │   └── user.repository.ts    # User data access layer
│   ├── routes/
│   │   ├── url.route.ts          # URL routes
│   │   └── user.route.ts         # User/auth routes
│   ├── services/
│   │   ├── cloudinary.service.ts # Cloudinary file upload service
│   │   ├── url.service.ts        # URL business logic
│   │   └── user.service.ts       # User business logic (password hashing, etc.)
│   ├── types/
│   │   ├── express.d.ts          # Express Request augmentation (userId)
│   │   ├── jwt.d.ts              # JWT payload type augmentation
│   │   ├── url.ts                # IShortUrl interface
│   │   └── user.ts               # IUser, UpdateUser, ShortUrl interfaces
│   ├── utils/
│   │   ├── AppError.ts           # Custom error class with statusCode
│   │   ├── asyncHandler.ts       # Async route handler wrapper
│   │   ├── shortUrl.ts           # nanoid short code generator
│   │   └── token.ts              # JWT sign and verify helpers
│   └── validations/
│       ├── url.validator.ts      # URL creation validation rules
│       └── user.validator.ts     # Register and login validation rules
├── migrations/
│   └── app/
│       ├── 20261121T1702_init/   # Initial database migration
│       ├── 20261121T1708_init/   # Second migration
│       ├── 20261125T1306_updatetable/
│       ├── 20261125T1307_updatetable/
│       ├── 20261125T1350_updatetable/
│       └── refs/
│           └── db.json           # Database reference snapshot
└── migrations/snapshots/         # Prisma contract snapshots per migration
```

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Runtime | Node.js |
| Language | TypeScript |
| Web Framework | Express 5 |
| Database | PostgreSQL |
| ORM | Prisma ORM (v8 rc) |
| Authentication | JWT (jsonwebtoken) + HttpOnly cookies |
| Password Hashing | bcryptjs |
| File Uploads | Multer + Cloudinary |
| Validation | express-validator |
| Short ID Generation | nanoid |
| Dev Tooling | tsx, TypeScript |

## 📦 Installation

### Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL 15+
- Cloudinary account (for avatar uploads)

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd url-shortner
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the project root:
   ```env
   PORT=8080
   DATABASE_URL="postgresql://user:password@localhost:5432/url_shortner"
   JWT_SECRET="your-super-secret-jwt-key"
   CLOUDINARY_CLOUD_NAME="your-cloud-name"
   CLOUDINARY_API_KEY="your-api-key"
   CLOUDINARY_API_SECRET="your-api-secret"
   NODE_ENV=development
   ```

4. **Set up the database**

   Run migrations to create tables:
   ```bash
   npx prisma db init
   ```

   Or check migration status:
   ```bash
   npx prisma migration status
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

   The server will start at `http://localhost:8080`.

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with tsx watch |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run production build from `dist/server.js` |
| `npm run contract:emit` | Regenerate Prisma contract files |

## 🔌 API Reference

### Base URL
```
http://localhost:8080
```

### Authentication

#### Register User
```http
POST /api/v1/users/register
Content-Type: multipart/form-data

Body:
- name (string, required, min 3 chars)
- email (string, required, valid email)
- password (string, required, strong password)
- avatar (file, optional)
```

**Response:**
```json
{
  "message": "user registered successfully",
  "success": true,
  "data": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": "https://cloudinary.com/..."
  }
}
```
Sets an HttpOnly `token` cookie.

#### Login User
```http
POST /api/v1/users/login
Content-Type: application/json

Body:
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "message": "user Login successfully",
  "success": true,
  "data": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": "https://cloudinary.com/..."
  }
}
```
Sets an HttpOnly `token` cookie.

#### Logout User
```http
GET /api/v1/users/logout
```

**Response:**
```json
{
  "message": "user Logout successfully",
  "success": true
}
```
Clears the `token` cookie.

#### Get Current User
```http
GET /api/v1/users/me
Authorization: Bearer <token>
# or Cookie: token=<token>
```

**Response:**
```json
{
  "message": "user Logout successfully",
  "success": true,
  "data": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": "https://cloudinary.com/..."
  }
}
```

### URLs

#### Create Short URL
```http
POST /api/v1/urls
Authorization: Bearer <token>
# or Cookie: token=<token>
Content-Type: application/json

Body:
{
  "fullUrl": "https://example.com/very/long/url"
}
```

**Response:**
```json
{
  "message": "url created successfully",
  "shortUrl": "https://your-domain.com/abc123"
}
```

#### Redirect Short URL
```http
GET /:id
```

Redirects to the original full URL and increments the click counter.

## 🗄️ Database Schema

### User
| Field | Type | Notes |
|-------|------|-------|
| id | String | UUID, primary key |
| name | String | Required |
| email | String | Unique, required |
| password | String | Required (hashed) |
| avatar | String? | Cloudinary URL |
| createdAt | DateTime | Default now |
| updatedAt | DateTime | Auto-updated |
| shortUrls | ShortUrl[] | Relation |

### ShortUrl
| Field | Type | Notes |
|-------|------|-------|
| id | Uuid | Primary key |
| fullUrl | String | Required |
| short | String | Unique, short code |
| clicks | Int | Default 0 |
| createdAt | DateTime? | Default now |
| userId | String? | Foreign key to User |

## 🔐 Authentication

- JWT tokens are signed with `JWT_SECRET` and expire after **1 hour**
- Tokens are stored in HttpOnly cookies named `token`
- The `authMiddleware` extracts the token from cookies or the `Authorization` header
- On successful verification, `req.userId` is populated for use in controllers

## 🧩 Architecture

The project follows a **layered architecture**:

1. **Routes** — Define endpoints and attach middleware/validators
2. **Controllers** — Handle HTTP request/response, call services
3. **Services** — Contain business logic, coordinate repositories
4. **Repositories** — Direct database access via Prisma ORM
5. **Middlewares** — Cross-cutting concerns (auth, validation, error handling, file upload)
6. **Utils** — Helper functions (AppError, asyncHandler, token, shortUrl)
7. **Types** — TypeScript interfaces and type augmentations
8. **Validations** — express-validator rules for request validation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Prisma ORM](https://www.prisma.io/) — Database toolkit
- [Express](https://expressjs.com/) — Web framework
- [Cloudinary](https://cloudinary.com/) — Image/video management
- [nanoid](https://github.com/ai/nanoid) — Unique short ID generation
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) — JWT implementation