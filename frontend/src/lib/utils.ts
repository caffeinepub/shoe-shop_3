import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(cents: number | bigint): string {
  const amount = typeof cents === 'bigint' ? Number(cents) : cents;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount / 100);
}

export function getProductImage(imageField: string): string {
  // Map backend image paths to generated assets
  const imageMap: Record<string, string> = {
    '/images/shoe/Classic-Sneakers.jpg': '/assets/generated/shoe-sneaker-white.dim_600x600.png',
    '/images/shoe/Running-Shoes.jpg': '/assets/generated/shoe-runner-neon.dim_600x600.png',
    '/images/shoe/High-Top-Sneakers.jpg': '/assets/generated/shoe-sneaker-white.dim_600x600.png',
    '/images/shoe/Trail-Running-Shoes.jpg': '/assets/generated/shoe-runner-neon.dim_600x600.png',
    '/images/shoe/Leather-Boots.jpg': '/assets/generated/shoe-boot-black.dim_600x600.png',
    '/images/shoe/Chelsea-Boots.jpg': '/assets/generated/shoe-boot-black.dim_600x600.png',
    '/images/shoe/Winter-Boots.jpg': '/assets/generated/shoe-boot-black.dim_600x600.png',
    '/images/shoe/Fashion-Sandals.jpg': '/assets/generated/shoe-sandal-nude.dim_600x600.png',
    '/images/shoe/Flip-Flops.jpg': '/assets/generated/shoe-sandal-nude.dim_600x600.png',
    '/images/shoe/Sport-Sandals.jpg': '/assets/generated/shoe-sandal-nude.dim_600x600.png',
    '/images/shoe/Formal-Oxford-Shoes.jpg': '/assets/generated/shoe-oxford-brown.dim_600x600.png',
    '/images/shoe/Dress-Loafers.jpg': '/assets/generated/shoe-loafer-tan.dim_600x600.png',
  };
  return imageMap[imageField] ?? '/assets/generated/shoe-sneaker-white.dim_600x600.png';
}
