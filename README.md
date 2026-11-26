# COMP229 Assignment 3 — MyPortfolio
Jacques Honoré Wendji | Web Application Development

## Local setup (Windows PowerShell)
Use Node 24 and a running local MongoDB service. Open PowerShell in MyPortfolio (the folder containing server.js).

```powershell
npm ci
npm ci --prefix client
npm run dev
```
Open http://localhost:5173 (or the URL Vite prints). Backend: http://localhost:3000. Stop any other application using port 3000 first. The database is PortfolioAssignment3, separate from Assignment 2. Set MONGODB_URI if necessary. JWT_SECRET can be set to a private random value; otherwise a random secret is generated each server start, requiring sign-in again after restart.

## Demonstration accounts
The local classroom administrator is inserted into MongoDB on first startup with role admin and a hashed password. Email: admin@portfolio.example; password: PortfolioDemo!2026. This is a public demonstration credential, not suitable for deployment. Set ADMIN_PASSWORD before the first startup to use a different password. Regular accounts are created through Sign Up and always receive role user. Do not enter real confidential contact information in the demo.

## Features
Existing public portfolio pages remain. Sign in and open Records to create, read, edit and delete contacts, projects and qualifications as admin. Ordinary users can only read these records. The Contact page also has an administrator-only controlled form. Projects and Education link to their corresponding database records. The original static portfolio examples are retained separately. JWT is stored in sessionStorage and sent in the Authorization Bearer header. Sign out clears client state; previously issued tokens expire after one hour (stateless JWT).

## Verification
With MongoDB running, execute `npm test` in a separate terminal and `npm run build`. The integration test uses a temporary database, not the portfolio database. Then manually demonstrate sign up, sign in, each CRUD operation, read-only user access, refresh persistence and sign out. Capture actual screenshots for the professor. The supplied code has passed backend syntax checks only; dependency installation and runtime verification were blocked in the preparation environment. Do not claim integration tests passed until they do.

## GitHub
Existing repository: https://github.com/Jacqueswendji/COMP229_Assignment2_MyPortfolio . To preserve history, clone it into a separate folder, copy the updated source files into that clone (excluding node_modules, .env and .git), review git diff, commit and push. Confirm the remote contains Assignment 3 before submitting its link.
