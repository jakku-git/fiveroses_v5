# Project Page Template Documentation

This template provides a consistent structure for creating project showcase pages with smooth animations and a professional layout.

## Quick Start

1. Create a new file in `app/work/your-project/page.tsx`
2. Copy the contents of `ProjectTemplate.tsx` into your new file
3. Update the component name from `ProjectTemplate` to your project name (e.g., `YourProjectPage`)
4. Follow the TODO comments to customize each section

## Template Structure

### 1. Hero Section
- Full-screen image with gradient overlay
- Animated title and description
- Three metadata boxes for:
  - Industry
  - Year
  - Type

### 2. Content Sections
- Project Overview
- Challenge & Approach (two columns)
- Gallery (5 slots)
- Results & Impact
- More Projects
- CTA Section

## Gallery Structure

The gallery section includes 5 image slots with specific aspect ratios:

1. Slot 1: Full width (16:9)
2. Slot 2: Full width (16:9)
3. Slot 3: Two columns (8:9 each)
4. Slot 4: Full width (16:9)
5. Slot 5: Full width (16:9)

## Customization Checklist

### Essential Updates
- [ ] Replace hero image (`src="/your-hero-image.webp"`)
- [ ] Update project category
- [ ] Update project title
- [ ] Update project description
- [ ] Update metadata (Industry, Year, Type)
- [ ] Update Project Overview content
- [ ] Update Challenge & Approach content
- [ ] Replace gallery images and captions
- [ ] Update Results & Impact content
- [ ] Update More Projects section with related projects

### Image Guidelines
- Hero image: High-quality, landscape orientation
- Gallery images: Follow specified aspect ratios
- Recommended formats: .webp, .jpg, .png
- Optimize images for web performance

## Animations

The template includes several built-in animations:
- Scroll-based hero section effects
- Fade-in animations for sections
- Scale and fade effects for images
- Hover effects on project cards
- Smooth transitions on the CTA button

## TypeScript Notes

- The template uses TypeScript for type safety
- Animation components (`AnimatedSection` and `AnimatedImage`) are typed
- Props and event handlers are properly typed

## Best Practices

1. **Images**
   - Always provide meaningful alt text
   - Use descriptive filenames
   - Optimize images before adding them
   - Use the correct aspect ratios

2. **Content**
   - Keep descriptions concise and impactful
   - Use consistent tone and voice
   - Proofread all text content
   - Ensure links are working

3. **Performance**
   - Compress images appropriately
   - Use `priority` prop only on hero image
   - Lazy load gallery images
   - Test on multiple devices

## Troubleshooting

### Common Issues

1. **Images not displaying**
   - Check file paths
   - Verify image files exist in public directory
   - Ensure correct file extensions

2. **Animations not working**
   - Check if Framer Motion is installed
   - Verify intersection observer is working
   - Check for console errors

3. **Layout issues**
   - Verify Tailwind classes
   - Check responsive breakpoints
   - Test on different screen sizes

## Need Help?

If you encounter any issues or need assistance:
1. Check the comments in the template file
2. Review this documentation
3. Test in development mode
4. Check browser console for errors 