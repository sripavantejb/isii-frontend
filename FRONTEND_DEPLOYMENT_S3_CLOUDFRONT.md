# Frontend Deployment Guide

This document explains how the frontend is deployed in this project using Amazon S3 and CloudFront.

It has been updated to reflect the actual deployment flow currently being used:

1. build locally with Vite
2. sync the `dist/` files to S3 using AWS CLI
3. invalidate CloudFront cache

## Overview

The frontend is a Vite-based React single-page application (SPA).

It is deployed as static files.

The deployment flow is:

1. build the frontend into `dist/`
2. upload the build files to an S3 bucket
3. serve the bucket through CloudFront
4. invalidate CloudFront after redeployment so users receive the latest files

## Services Used

### 1. Amazon S3

Amazon S3 stores the frontend build output.

Examples of files stored there:

- `index.html`
- JavaScript bundles
- CSS bundles
- static assets

### 2. Amazon CloudFront

CloudFront sits in front of S3 and serves the frontend to users.

It is responsible for:

- CDN delivery
- caching
- HTTPS delivery
- routing support for the SPA when configured correctly

### 3. AWS CLI

AWS CLI is used from the local machine to automate deployment.

It is used for:

- syncing build files to S3
- invalidating CloudFront cache

### 4. AWS Certificate Manager and DNS

If a custom domain or subdomain is used, SSL/TLS and DNS are handled through:

- AWS Certificate Manager
- Route 53 or another DNS provider

## Current Frontend Build Setup

This frontend is not SSR.

It is a static SPA built with Vite.

Relevant project details:

- production build command: `npm run build:production`
- staging build command: `npm run build:staging`
- output folder: `dist/`

From [`package.json`](/Users/home/Desktop/sai%20teja's%20vs%20code/mern/isii-aws/isii-frontend/package.json):

```json
"scripts": {
  "build:staging": "vite build --mode staging",
  "build:production": "vite build --mode production"
}
```

## Environment Files

### Production

File:

[`isii-frontend/.env.production`](/Users/home/Desktop/sai%20teja's%20vs%20code/mern/isii-aws/isii-frontend/.env.production)

Current values:

```env
VITE_API_URL=https://w69a5y16ae.execute-api.ap-south-1.amazonaws.com/api
VITE_APP_ENV=production
```

### Staging

File:

[`isii-frontend/.env.staging`](/Users/home/Desktop/sai%20teja's%20vs%20code/mern/isii-aws/isii-frontend/.env.staging)

Current values:

```env
VITE_API_URL=https://m1e5w84k38.execute-api.ap-south-1.amazonaws.com/api
VITE_APP_ENV=staging
```

## Architecture

```text
Local machine
    ->
Vite build
    ->
dist/ generated
    ->
AWS CLI sync to S3
    ->
CloudFront serves files from S3
    ->
CloudFront invalidation refreshes cached content
    ->
Users get updated frontend
```

## Why This Deployment Model Is Used

This approach fits the current frontend because:

- the app becomes static after build
- no server-side runtime is needed
- S3 is simple for static hosting
- CloudFront handles caching and public delivery
- CLI deployment is easier to repeat than manual uploads

## Prerequisites

Before deployment, these are needed:

- AWS CLI installed
- AWS CLI configured with valid credentials
- S3 bucket already created
- CloudFront distribution already created
- correct environment file for the target deployment
- successful frontend build

## AWS CLI Prerequisites

### Install AWS CLI

Example check:

```bash
aws --version
```

### Configure AWS CLI

Run:

```bash
aws configure
```

You will need:

- AWS Access Key ID
- AWS Secret Access Key
- default region: `ap-south-1`
- default output format: `json`

### Verify access

Run:

```bash
aws s3 ls
```

If this works, the CLI is correctly configured for S3 access.

## Deployment Modes

There are two main deployment modes in this project:

- production deployment
- staging deployment

The difference is mainly:

- which env file is used during build
- which S3 bucket or target path is used
- which CloudFront distribution is invalidated

## Production Deployment Flow

### Step 1. Confirm production environment values

Check:

[`isii-frontend/.env.production`](/Users/home/Desktop/sai%20teja's%20vs%20code/mern/isii-aws/isii-frontend/.env.production)

Make sure `VITE_API_URL` points to the correct production backend.

### Step 2. Build production

Run:

```bash
npm run build:production
```

This creates the `dist/` folder using production variables.

### Step 3. Sync build files to S3

Example:

```bash
aws s3 sync dist/ s3://isii-frontend
```

This:

- uploads new files
- updates changed files
- keeps old files if `--delete` is not used

If you want a cleaner deployment, you can use:

```bash
aws s3 sync dist/ s3://isii-frontend --delete
```

This also removes old files from the bucket that no longer exist in `dist/`.

### Step 4. Invalidate CloudFront

Example:

```bash
aws cloudfront create-invalidation --distribution-id E2TERZH6D4DU9W --paths "/*"
```

This clears the CloudFront cache for the distribution so users receive the newest files from S3.

### Step 5. Test the deployed frontend

After deployment, verify:

- homepage loads
- CSS loads
- images load
- deep links load
- API calls work

## Staging Deployment Flow

### Step 1. Confirm staging environment values

Check:

[`isii-frontend/.env.staging`](/Users/home/Desktop/sai%20teja's%20vs%20code/mern/isii-aws/isii-frontend/.env.staging)

Make sure `VITE_API_URL` points to the correct staging backend.

### Step 2. Build staging

Run:

```bash
npm run build:staging
```

This creates the `dist/` folder using staging variables.

### Step 3. Sync staging build files to the staging target

Use the staging S3 bucket or staging deployment path.

Example pattern:

```bash
aws s3 sync dist/ s3://YOUR_STAGING_BUCKET
```

### Step 4. Invalidate the staging CloudFront distribution

Example pattern:

```bash
aws cloudfront create-invalidation --distribution-id YOUR_STAGING_DISTRIBUTION_ID --paths "/*"
```

### Important note about staging

Staging is only deployed if all of the following are true:

- `npm run build:staging` was used
- the generated `dist/` came from `.env.staging`
- files were synced to the staging target
- the staging CloudFront distribution was invalidated

Invalidating CloudFront alone does not mean staging is deployed.

## Recommended Command Flow

### Production

```bash
cd "/Users/home/Desktop/sai teja's vs code/mern/isii-aws/isii-frontend"
npm run build:production
aws s3 sync dist/ s3://isii-frontend
aws cloudfront create-invalidation --distribution-id E2TERZH6D4DU9W --paths "/*"
```

### Production with cleanup

```bash
cd "/Users/home/Desktop/sai teja's vs code/mern/isii-aws/isii-frontend"
npm run build:production
aws s3 sync dist/ s3://isii-frontend --delete
aws cloudfront create-invalidation --distribution-id E2TERZH6D4DU9W --paths "/*"
```

### Staging

```bash
cd "/Users/home/Desktop/sai teja's vs code/mern/isii-aws/isii-frontend"
npm run build:staging
aws s3 sync dist/ s3://YOUR_STAGING_BUCKET
aws cloudfront create-invalidation --distribution-id YOUR_STAGING_DISTRIBUTION_ID --paths "/*"
```

## What `aws s3 sync` Does

Command example:

```bash
aws s3 sync dist/ s3://isii-frontend
```

This command compares the local `dist/` folder with the target S3 bucket and uploads differences.

Without `--delete`, old files remain in the bucket.

With `--delete`, old files are removed if they no longer exist locally.

## What CloudFront Invalidation Does

Command example:

```bash
aws cloudfront create-invalidation --distribution-id E2TERZH6D4DU9W --paths "/*"
```

This does not change files in S3.

It tells CloudFront to clear cached copies so the next requests pull fresh files from S3.

This is especially useful after redeploying updated frontend files.

## Why Invalidation Is Important

CloudFront caches files.

Without invalidation:

- users may continue to receive old cached files
- new UI changes may not appear immediately
- updated `index.html` may not be served right away

With invalidation:

- CloudFront fetches fresh files on the next request
- updated frontend changes appear sooner

## SPA Routing Requirement

This frontend uses client-side routing.

CloudFront must support SPA fallback for deep links such as:

- `/about`
- `/press-and-news`
- `/admin/login`

This is usually configured with:

- `403 -> /index.html` with `200`
- `404 -> /index.html` with `200`

## Cache Recommendation

For best frontend behavior:

- hashed assets can be cached longer
- `index.html` should be refreshed more often

This helps users receive the latest asset references after each deployment.

## Troubleshooting

### Problem: `aws` command not found

Cause:

- AWS CLI is not installed

Fix:

- install AWS CLI and run `aws configure`

### Problem: `AccessDenied` on CloudFront invalidation

Cause:

- IAM user or role does not have `cloudfront:CreateInvalidation`

Fix:

- request CloudFront invalidation permission for the target distribution

### Problem: frontend does not look updated after redeploy

Cause:

- CloudFront is still serving cached files

Fix:

- run a CloudFront invalidation

### Problem: wrong backend is being called

Cause:

- wrong env file was used during build

Fix:

- rebuild with the correct mode:
  - `npm run build:staging`
  - `npm run build:production`

### Problem: direct route refresh fails

Cause:

- SPA fallback is missing in CloudFront

Fix:

- map `403` and `404` to `/index.html`

## Simple Summary

The current frontend deployment process is:

- build locally with Vite
- sync the `dist/` files to S3 with AWS CLI
- invalidate CloudFront cache
- test the deployed site

Production and staging use the same deployment pattern, but different env files and usually different deployment targets.
