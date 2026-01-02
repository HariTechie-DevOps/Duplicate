/**
 * Real-world Fallback Logic:
 * This script finds all images and, if they fail to load, 
 * replaces them with a gray placeholder SVG.
 */

const ERROR_IMG_SRC = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';

function handleImageError(imageElement) {
    // 1. Set the source to the placeholder SVG
    imageElement.src = ERROR_IMG_SRC;
    
    // 2. Add some styling to make it look like a placeholder (gray background)
    imageElement.style.backgroundColor = '#f3f4f6'; 
    imageElement.style.padding = '20px';
    
    // 3. Prevent infinite loop if placeholder itself fails
    imageElement.onerror = null; 
}
