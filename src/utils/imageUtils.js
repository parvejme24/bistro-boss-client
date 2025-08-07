// Placeholder SVG patterns for different content types
export const PLACEHOLDER_PATTERNS = {
  blog: {
    pattern: 'diagonal',
    color: '#f3f4f6',
    accent: '#e5e7eb'
  },
  user: {
    pattern: 'dots',
    color: '#f9fafb',
    accent: '#d1d5db'
  },
  food: {
    pattern: 'waves',
    color: '#fef3c7',
    accent: '#f59e0b'
  },
  chef: {
    pattern: 'grid',
    color: '#ecfdf5',
    accent: '#10b981'
  },
  category: {
    pattern: 'circles',
    color: '#fef2f2',
    accent: '#ef4444'
  }
};

// Generate SVG placeholder based on pattern type
const generateSVGPlaceholder = (pattern, color, accent, width = 400, height = 300) => {
  const patterns = {
    diagonal: `
      <defs>
        <pattern id="diagonal" patternUnits="userSpaceOnUse" width="20" height="20">
          <path d="M0,0 L20,20 M20,0 L0,20" stroke="${accent}" stroke-width="1" opacity="0.3"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="${color}"/>
      <rect width="100%" height="100%" fill="url(#diagonal)"/>
    `,
    dots: `
      <defs>
        <pattern id="dots" patternUnits="userSpaceOnUse" width="20" height="20">
          <circle cx="10" cy="10" r="2" fill="${accent}" opacity="0.4"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="${color}"/>
      <rect width="100%" height="100%" fill="url(#dots)"/>
    `,
    waves: `
      <defs>
        <pattern id="waves" patternUnits="userSpaceOnUse" width="40" height="20">
          <path d="M0,10 Q10,0 20,10 Q30,20 40,10" stroke="${accent}" stroke-width="2" fill="none" opacity="0.3"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="${color}"/>
      <rect width="100%" height="100%" fill="url(#waves)"/>
    `,
    grid: `
      <defs>
        <pattern id="grid" patternUnits="userSpaceOnUse" width="20" height="20">
          <path d="M20,0 L0,0 0,20" stroke="${accent}" stroke-width="1" opacity="0.3"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="${color}"/>
      <rect width="100%" height="100%" fill="url(#grid)"/>
    `,
    circles: `
      <defs>
        <pattern id="circles" patternUnits="userSpaceOnUse" width="30" height="30">
          <circle cx="15" cy="15" r="8" fill="${accent}" opacity="0.2"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="${color}"/>
      <rect width="100%" height="100%" fill="url(#circles)"/>
    `
  };

  const svgContent = patterns[pattern] || patterns.diagonal;
  
  return `data:image/svg+xml;base64,${btoa(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      ${svgContent}
    </svg>
  `)}`;
};

// Function to handle image loading errors
export const handleImageError = (event, fallbackType = 'blog') => {
  const pattern = PLACEHOLDER_PATTERNS[fallbackType] || PLACEHOLDER_PATTERNS.blog;
  const placeholderUrl = generateSVGPlaceholder(
    pattern.pattern, 
    pattern.color, 
    pattern.accent,
    event.target.width || 400,
    event.target.height || 300
  );
  event.target.src = placeholderUrl;
  event.target.onerror = null; // Prevent infinite loop
};

// Function to get a placeholder image URL
export const getPlaceholderImage = (type = 'blog', width = 400, height = 300) => {
  const pattern = PLACEHOLDER_PATTERNS[type] || PLACEHOLDER_PATTERNS.blog;
  return generateSVGPlaceholder(pattern.pattern, pattern.color, pattern.accent, width, height);
};

// Function to validate image URL
export const isValidImageUrl = (url) => {
  if (!url || url === 'placeholder') return false;
  
  // Check if it's a valid URL
  try {
    new URL(url);
  } catch {
    return false;
  }
  
  // Check if it's an image URL
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
  const hasImageExtension = imageExtensions.some(ext => 
    url.toLowerCase().includes(ext)
  );
  
  // Check if it's from a known image service
  const knownImageServices = [
    'unsplash.com',
    'images.unsplash.com',
    'picsum.photos',
    'via.placeholder.com',
    'placehold.co',
    'imgur.com',
    'cloudinary.com',
    'firebasestorage.googleapis.com'
  ];
  
  const isFromKnownService = knownImageServices.some(service => 
    url.includes(service)
  );
  
  return hasImageExtension || isFromKnownService;
};

// Function to get optimized image URL or placeholder
export const getOptimizedImageUrl = (url, width = 800, height = 600, quality = 80) => {
  if (!url || url === 'placeholder') {
    return getPlaceholderImage('blog', width, height);
  }
  
  // If it's already an optimized Unsplash URL, return as is
  if (url.includes('images.unsplash.com') && url.includes('w=')) {
    return url;
  }
  
  // If it's an Unsplash URL without parameters, add optimization
  if (url.includes('images.unsplash.com') && !url.includes('?')) {
    return `${url}?w=${width}&h=${height}&fit=crop&q=${quality}`;
  }
  
  // For other URLs, return as is
  return url;
}; 