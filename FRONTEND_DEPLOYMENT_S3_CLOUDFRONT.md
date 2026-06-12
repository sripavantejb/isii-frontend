# Frontend AWS Deployment and CI/CD Guide

This document explains the current frontend deployment model for ISII, how the CI/CD pipeline works, which AWS services are involved, and what must exist in GitHub environments for staging and production.

It reflects the current frontend setup in this repository.

## Overview

The frontend is a Vite-built React SPA.

The deployment flow is:

1. GitHub Actions checks out the frontend repository.
2. It installs dependencies with `npm ci`.
3. It builds the correct frontend mode:
   - `npm run build:staging`
   - `npm run build:production`
4. It assumes an AWS IAM role using GitHub OIDC.
5. It uploads the generated `dist/` files to an S3 bucket.
6. It invalidates CloudFront so the new frontend becomes live.

## Services Used

The frontend CI/CD pipeline uses these services:

- `GitHub Actions`
  - runs the automated deployment workflow
- `GitHub Environments`
  - stores environment-specific variables and secrets such as bucket name, distribution ID, and role ARN
- `AWS IAM`
  - provides the GitHub-assumable deploy role
- `AWS STS`
  - issues temporary credentials via `AssumeRoleWithWebIdentity`
- `Amazon S3`
  - stores the built frontend files
- `Amazon CloudFront`
  - serves the frontend and caches it globally

## Current Architecture

### Staging

The current staging setup uses:

- frontend S3 bucket:
  - `isii-frontend-staging-639920117892`
- CloudFront distribution:
  - `E35PX9JBYDU87M`
- CloudFront domain:
  - `https://d1gbpolz5fkmu.cloudfront.net`

This distribution is reused for two concerns:

1. `Default (*)`
   - serves the staging frontend bucket
2. `/files/*`
   - serves uploaded content files from the shared files bucket through the CloudFront file-rewrite flow

That means the same distribution currently handles:

- frontend app hosting
- public content file delivery

### Production

The production workflow is also ready, but it depends on the production GitHub environment values you configure.

Production deployment targets are not hardcoded in the workflow. They come from:

- `S3_BUCKET_NAME`
- `CLOUDFRONT_DISTRIBUTION_ID`
- `AWS_ROLE_ARN`

## Workflow Files

The frontend CI/CD pipeline is defined in:

- [deploy-staging.yml](/Users/home/Desktop/sai%20teja's%20vs%20code/mern/isii/isii-frontend/.github/workflows/deploy-staging.yml)
- [deploy-production.yml](/Users/home/Desktop/sai%20teja's%20vs%20code/mern/isii/isii-frontend/.github/workflows/deploy-production.yml)

### Staging workflow

Triggered by:

- push to `staging`
- manual `workflow_dispatch`

Build command:

```bash
npm run build:staging
```

### Production workflow

Triggered by:

- push to `main`
- manual `workflow_dispatch`

Build command:

```bash
npm run build:production
```

## How the Pipeline Works

The staging and production workflows follow the same structure.

### 1. Checkout repository

GitHub Actions checks out the frontend code.

### 2. Setup Node.js

Node.js 20 is installed.

### 3. Install dependencies

The workflow runs:

```bash
npm ci
```

### 4. Build the frontend

The workflow runs the environment-specific Vite build:

- staging:
  - `npm run build:staging`
- production:
  - `npm run build:production`

This produces the static build output in:

```text
dist/
```

### 5. Configure AWS credentials

The workflow uses:

```text
aws-actions/configure-aws-credentials@v4
```

It assumes the IAM role provided in:

```text
AWS_ROLE_ARN
```

This is done using GitHub OIDC, so there are no long-lived AWS access keys stored in GitHub.

### 6. Upload to S3

The workflow runs:

```bash
aws s3 sync dist/ "s3://${S3_BUCKET_NAME}" --delete
```

This uploads the frontend build to the target bucket and removes stale files that are no longer present in `dist/`.

### 7. Invalidate CloudFront

The workflow runs:

```bash
aws cloudfront create-invalidation --distribution-id "${CLOUDFRONT_DISTRIBUTION_ID}" --paths "/*"
```

This clears the old cached frontend files from CloudFront so users receive the latest deployment.

## GitHub Environment Values

The workflows depend on GitHub environment-scoped variables and secrets.

### Staging environment

In the `isii-frontend` GitHub repository, under:

- `Settings`
- `Environments`
- `staging`

set:

#### Secret

```text
AWS_ROLE_ARN=<arn:aws:iam::639920117892:role/isii-frontend-staging-role>
```

#### Variables

```text
AWS_REGION=us-east-1
S3_BUCKET_NAME=isii-frontend-staging-639920117892
CLOUDFRONT_DISTRIBUTION_ID=E35PX9JBYDU87M
```

### Production environment

In the same GitHub repository, under:

- `Settings`
- `Environments`
- `production`

set:

#### Secret

```text
AWS_ROLE_ARN=<frontend production deploy role arn>
```

#### Variables

```text
AWS_REGION=us-east-1
S3_BUCKET_NAME=<production frontend bucket name>
CLOUDFRONT_DISTRIBUTION_ID=<production frontend distribution id>
```

## Why the GitHub Environment Matters

The workflow file reads values like:

```yaml
AWS_REGION: ${{ vars.AWS_REGION }}
S3_BUCKET_NAME: ${{ vars.S3_BUCKET_NAME }}
CLOUDFRONT_DISTRIBUTION_ID: ${{ vars.CLOUDFRONT_DISTRIBUTION_ID }}
role-to-assume: ${{ secrets.AWS_ROLE_ARN }}
```

So if the values are placed in the wrong GitHub environment:

- the workflow still starts
- but AWS setup fails because the values are empty

That is why:

- staging workflow must use values from the `staging` environment
- production workflow must use values from the `production` environment

## Frontend Build Environments

The frontend already uses Vite environment files.

### Shared defaults

File:

- [`.env`](/Users/home/Desktop/sai%20teja's%20vs%20code/mern/isii/isii-frontend/.env)

Shared values live here, such as:

- `VITE_STATIC_ASSET_BASE_URL`
- `VITE_PUBLIC_FILES_BASE_URL`

### Development

File:

- [`.env.development`](/Users/home/Desktop/sai%20teja's%20vs%20code/mern/isii/isii-frontend/.env.development)

Used by:

```bash
npm run dev
```

### Staging

File:

- [`.env.staging`](/Users/home/Desktop/sai%20teja's%20vs%20code/mern/isii/isii-frontend/.env.staging)

Used by:

```bash
npm run build:staging
```

### Production

File:

- [`.env.production`](/Users/home/Desktop/sai%20teja's%20vs%20code/mern/isii/isii-frontend/.env.production)

Used by:

```bash
npm run build:production
```

## Current Frontend Environment Resolution

### Development

Uses:

- `.env`
- `.env.development`

### Staging

Uses:

- `.env`
- `.env.staging`

### Production

Uses:

- `.env`
- `.env.production`

The mode-specific file overrides shared defaults from `.env`.

## Static Assets vs Content Files

There are two different asset flows in the frontend.

### 1. Static design assets

Examples:

- hero backgrounds
- people page images
- icons and metadata images

These currently use raw S3 URLs from the new bucket base:

```text
https://s3.ap-south-2.amazonaws.com/www.isii.global/prod/isii-static
```

These values are built from:

- [staticAssets.ts](/Users/home/Desktop/sai%20teja's%20vs%20code/mern/isii/isii-frontend/src/lib/staticAssets.ts)
- `VITE_STATIC_ASSET_BASE_URL`

### 2. Uploaded content files

Examples:

- article images
- news images
- PDFs
- uploaded content files

These are intentionally served through CloudFront `/files/...` URLs, not raw S3.

Examples:

```text
https://www.isii.global/files/press-and-news/example.pdf
https://www.isii.global/files/staging/images/example.jpg
```

These values are handled through:

- [fileUrls.ts](/Users/home/Desktop/sai%20teja's%20vs%20code/mern/isii/isii-frontend/src/lib/fileUrls.ts)

## IAM Role Requirements

Each frontend environment needs a GitHub-assumable IAM role.

For staging, the role trust policy should allow:

```text
repo:Nxtwave-Platform/isii-frontend:environment:staging
```

For production:

```text
repo:Nxtwave-Platform/isii-frontend:environment:production
```

The role permissions should allow:

- `s3:ListBucket`
- `s3:GetObject`
- `s3:PutObject`
- `s3:DeleteObject`
- `cloudfront:CreateInvalidation`
- `cloudfront:GetDistribution`
- `cloudfront:ListDistributions`

## Staging-Specific Notes

The current staging frontend deploy target is:

```text
s3://isii-frontend-staging-639920117892
```

and it is served from:

```text
https://d1gbpolz5fkmu.cloudfront.net
```

Because the existing CloudFront distribution is reused, the staging frontend and `/files/*` content delivery currently share the same distribution.

## Production-Specific Notes

Before production frontend deployment, make sure:

- the production frontend bucket exists
- the production CloudFront distribution ID is known
- the production GitHub environment values are set
- [`.env.production`](/Users/home/Desktop/sai%20teja's%20vs%20code/mern/isii/isii-frontend/.env.production) points to the correct production backend API

## Manual Deployment Fallback

If GitHub Actions is unavailable, you can still deploy manually.

### Staging

```bash
npm run build:staging
aws s3 sync dist/ s3://isii-frontend-staging-639920117892 --delete --profile new-aws
aws cloudfront create-invalidation --distribution-id E35PX9JBYDU87M --paths "/*" --profile new-aws
```

### Production

```bash
npm run build:production
aws s3 sync dist/ s3://YOUR_PROD_FRONTEND_BUCKET --delete --profile new-aws
aws cloudfront create-invalidation --distribution-id YOUR_PROD_DISTRIBUTION_ID --paths "/*" --profile new-aws
```

## Troubleshooting

### Error: `Input required and not supplied: aws-region`

Reason:

- the workflow is running under one GitHub environment
- but the required variables were added to a different environment

Fix:

- add the variables to the correct environment:
  - `staging` for staging workflow
  - `production` for production workflow

### Build succeeds but site does not update

Reason:

- CloudFront is still serving cached frontend files

Fix:

- check that the invalidation step completed successfully

### Static images still show old bucket URL

Reason:

- an older frontend bundle is still deployed or cached

Fix:

1. rebuild the frontend
2. upload `dist/`
3. invalidate CloudFront

### Uploaded content images use CloudFront while static images use raw S3

This is expected.

- static design assets use raw S3
- uploaded content uses the `/files/...` CloudFront path

## Summary

The frontend CI/CD pipeline is built around:

- GitHub Actions
- GitHub OIDC
- IAM role assumption
- S3 static hosting
- CloudFront invalidation

Staging and production use the same deployment logic, but differ in:

- GitHub environment values
- target S3 bucket
- target CloudFront distribution
- Vite build mode

This keeps the frontend deployment automated, repeatable, and environment-safe without storing long-lived AWS credentials in GitHub.
