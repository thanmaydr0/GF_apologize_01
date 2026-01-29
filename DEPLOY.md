# Deployment Guide for Render.com

This project is configured for easy deployment on [Render](https://render.com).

## Prerequisites

1.  **Push to GitHub**: Ensure your latest code is pushed to your GitHub repository.
2.  **Render Account**: Create an account at [render.com](https://render.com) if you haven't already.

## How to Deploy

1.  **New Static Site**:
    *   Go to your Render Dashboard.
    *   Click the **New +** button and select **Static Site**.

2.  **Connect Repository**:
    *   Connect your GitHub account.
    *   Select the repository `romantic-reconciliation` (or whatever you named it).

3.  **Configure**:
    *   **Name**: `romantic-reconciliation` (or your choice).
    *   **Branch**: `main` (or your default branch).
    *   **Root Directory**: Leave empty (defaults to project root).
    *   **Build Command**: `npm run build`
    *   **Publish Directory**: `dist`

4.  **Deploy**:
    *   Click **Create Static Site**.
    *   Render will start building your site. Once finished (usually < 1 min), you'll get a live URL (e.g., `https://romantic-reconciliation.onrender.com`).

## Alternative: Use Blueprints

1.  Go to **Blueprints** in Render Dashboard.
2.  Click **New Blueprint Instance**.
3.  Connect your repo.
4.  Render will automatically detect the `render.yaml` file in this project and configure everything for you.
5.  Click **Apply**.
