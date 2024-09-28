# GitVigil

Welcome to **GitVigil** – a streak management tool designed for developers to track your coding progress and keep those streaks going strong! 💻🔥

This project is built with [Next.js](https://nextjs.org/) and bootstrapped using [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/gitvigil.git
cd gitvigil
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set Up Environment Variables

You'll need to create a `.env` file in the root of your project and add the following environment variables:

```bash
# Authentication Secrets
AUTH_SECRET="your_auth_secret_here"
AUTH_GITHUB_ID="your_github_oauth_id"
AUTH_GITHUB_SECRET="your_github_oauth_secret"
GITHUB_TOKEN="your_github_token_here"

# Database URLs
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
POSTGRES_PRISMA_URL="postgres://username:password@dbhost:5432/dbname?pgbouncer=true&connect_timeout=15"
POSTGRES_URL_NON_POOLING="postgres://username:password@dbhost:5432/dbname"

# Encryption Keys
ENCRYPTION_KEY="your_encryption_key"
ENCRYPTION_IV="your_encryption_iv"

# Redis Token and Url
REDIS_TOKEN= "your_redis_token"
REDIS_URL= "https://destined-shrimp-62901.upstash.io"  
 
#Resend token
RESEND_TOKEN= "re_TtLNqShx_PG185CkTbLefiYbf"
```

Replace the placeholder values (`your_auth_secret_here`, `your_github_oauth_id`, etc.) with your actual credentials.

### 4. Run the Development Server

Once everything is set up, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

### 5. Deployment

To deploy this app, the easiest method is using [Vercel](https://vercel.com/). For detailed instructions, check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment).

---

## Learn More
- [Prisma Edge Documentation](https://www.prisma.io/docs/orm/prisma-client/deployment/edge) - Learn how to setup prisma in a edge environment
- [Next.js Documentation](https://nextjs.org/docs) – Learn about Next.js features and API.
- [Vercel Deployment Guide](https://vercel.com/docs) – Learn how to deploy your Next.js app.

Enjoy using **GitVigil** to stay on top of your coding streaks! 🚀
