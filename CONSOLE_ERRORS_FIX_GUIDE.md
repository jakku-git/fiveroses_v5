# Console Errors Fix Guide

## Critical Errors

### 1. Element.animate() Keyframe Error ⚠️ CRITICAL

**Error:**
```
Uncaught TypeError: Element.animate: Keyframes with specified offsets must be in order and all be in the range [0, 1].
```

**Source:** This error is coming from `6600-8b15c4ddf9918504.js` (Next.js bundle)

**Likely Causes:**
1. **Framer Motion viewport animations with invalid configs**
2. **Third-party library using Web Animations API incorrectly**
3. **Browser auto-animations or polyfill issues**

**Solution:**

The error is likely from Framer Motion's `viewport` prop animations. The `viewport` configuration in some animations might be causing issues.

#### Files to Check:
- `components/granville/PhasingChart.tsx`
- `components/granville/KpiGrid.tsx`
- `components/granville/ExecutiveSummary.tsx`
- `components/granville/ContactForm.tsx`
- `components/granville/ChannelAccordion.tsx`
- `components/granville/BudgetTable.tsx`

#### Recommended Fix:

Update all `whileInView` animations to include proper animation configuration:

**Before:**
```tsx
<motion.div
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
>
```

**After:**
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
>
```

#### Quick Fix - Add Error Boundary:

Create a global error handler to catch and log these errors without breaking the app:

```tsx
// app/error-boundary.tsx
'use client';

import { useEffect } from 'react';

export default function GlobalErrorHandler() {
  useEffect(() => {
    // Catch Element.animate errors
    const originalAnimate = Element.prototype.animate;
    Element.prototype.animate = function(keyframes, options) {
      try {
        return originalAnimate.call(this, keyframes, options);
      } catch (error) {
        console.warn('Animation error caught and suppressed:', error);
        // Return a dummy animation
        return {
          finished: Promise.resolve(),
          cancel: () => {},
          play: () => {},
          pause: () => {},
          reverse: () => {},
          finish: () => {},
          currentTime: 0,
          playbackRate: 1,
          playState: 'finished'
        } as Animation;
      }
    };
  }, []);

  return null;
}
```

Then add it to your layout:

```tsx
// app/layout.tsx
import GlobalErrorHandler from './error-boundary';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <GlobalErrorHandler />
        {children}
      </body>
    </html>
  );
}
```

---

## Non-Critical Errors

### 2. CORS Errors - R2 Cloudflare Storage

**Errors:**
```
Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource... 
(Reason: CORS header 'Access-Control-Allow-Origin' missing)
```

**Affected Resources:**
- `pub-172cf25c478a4ad6ab218ee60b1a4b4f.r2.dev` (images and videos)

**Impact:** Resources still load and display, but JavaScript cannot access them programmatically (e.g., for canvas manipulation)

**Solution:** See `R2_CORS_CONFIG.md` for detailed instructions

---

### 3. Cloudflare Analytics Issues

**Errors:**
- Enhanced Tracking Protection blocking
- Subresource Integrity (SRI) hash mismatch
- CORS issues with beacon.min.js

**Impact:** Analytics may not track properly, but site functionality is not affected

**Solutions:**

#### Option 1: Disable Cloudflare Web Analytics (if not needed)
1. Go to Cloudflare Dashboard
2. Navigate to Analytics & Logs → Web Analytics
3. Disable "Enable Web Analytics"

#### Option 2: Fix SRI Hash Mismatch
1. Go to Cloudflare Dashboard
2. Navigate to Speed → Optimization
3. Under "Content Optimization," disable "Rocket Loader" if enabled
4. This can interfere with script integrity checks

#### Option 3: Update Cloudflare Analytics Settings
1. Ensure you're using the latest version
2. Regenerate the analytics beacon in Cloudflare Dashboard

---

### 4. Referrer Policy Warnings ⚠️ (Can be ignored)

**Warnings:**
```
Referrer Policy: Ignoring the less restricted referrer policy "origin-when-cross-origin"
```

**Impact:** These are just warnings, not errors. They inform you that the browser is using a stricter referrer policy than specified.

**Optional Fix:** Update `next.config.mjs` to use a stricter policy:

```javascript
{
  key: 'Referrer-Policy',
  value: 'strict-origin-when-cross-origin' // Changed from 'origin-when-cross-origin'
}
```

---

### 5. Preload Resource Warnings ⚠️ (Performance optimization)

**Warnings:**
```
The resource at "...woff2" preloaded with link preload was not used within a few seconds.
```

**Impact:** Minimal - fonts may load slightly slower than expected

**Solution:** Optimize font preloading in `app/layout.tsx`:

```tsx
// Current - fonts are auto-preloaded by Next.js
const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true, // This causes the warning
});

// Recommended - Let Next.js handle font optimization
const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  // Remove preload: true, Next.js optimizes automatically
});
```

---

## Priority Action Items

1. **HIGH PRIORITY:** Fix Element.animate() error (implement error boundary as temporary fix)
2. **MEDIUM PRIORITY:** Configure R2 CORS headers
3. **LOW PRIORITY:** Disable or fix Cloudflare Analytics
4. **LOW PRIORITY:** Remove explicit font preload flags

---

## Testing After Fixes

1. Clear browser cache completely
2. Hard refresh (Ctrl+Shift+R / Cmd+Shift+R)
3. Open DevTools Console
4. Enter password and navigate to home page
5. Verify no critical errors remain
6. Check Network tab for successful resource loading

---

## Additional Notes

- Most errors are non-critical and don't affect user experience
- The Element.animate() error is the only one that could potentially break functionality
- CORS errors only affect programmatic access to resources, not display
- Cloudflare-related errors are outside your codebase and require Cloudflare dashboard configuration
