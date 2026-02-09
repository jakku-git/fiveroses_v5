# Cloudflare R2 CORS Configuration

## Problem
Your R2 bucket resources are being blocked by CORS policy, causing these errors:
```
Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource... 
(Reason: CORS header 'Access-Control-Allow-Origin' missing)
```

## Solution

### Option 1: Using Cloudflare Dashboard (Recommended)

1. Go to your Cloudflare Dashboard
2. Navigate to R2 → Select your bucket (`pub-172cf25c478a4ad6ab218ee60b1a4b4f`)
3. Go to Settings → CORS Policy
4. Add this CORS configuration:

```json
[
  {
    "AllowedOrigins": [
      "https://fiveroses.com.au",
      "https://www.fiveroses.com.au",
      "http://localhost:3000"
    ],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedHeaders": ["*"],
    "ExposeHeaders": [],
    "MaxAgeSeconds": 3600
  }
]
```

### Option 2: Using Wrangler CLI

```bash
# Install wrangler if you haven't
npm install -g wrangler

# Create cors.json file with the configuration above
# Then apply it:
wrangler r2 bucket cors put pub-172cf25c478a4ad6ab218ee60b1a4b4f --file cors.json
```

### Option 3: Allow All Origins (Less Secure)

If you want to allow all origins (not recommended for production):

```json
[
  {
    "AllowedOrigins": ["*"],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedHeaders": ["*"],
    "ExposeHeaders": [],
    "MaxAgeSeconds": 3600
  }
]
```

## Verify the Fix

After applying CORS settings, the errors should disappear and your images/videos will load without CORS errors.
