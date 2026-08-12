import type { Product, ExclusiveDeal } from './Product';
import type { SponsorBrand, PlatformQuality } from './Sponsor';
import type { OrderTrackingDetails } from './Order';
import type { PolicySection } from './Policy';

export const MOCK_PRODUCTS: Product[] = [
  // Electronics
  {
    id: 'prod-elec-1',
    name: 'Zenith OLED UltraVision 65" 4K Smart TV',
    category: 'electronics',
    categoryName: 'Electronics',
    price: 1299,
    originalPrice: 1699,
    rating: { rate: 4.9, count: 320 },
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80',
    description: 'Breathtaking 4K OLED display with AI-enhanced contrast, 120Hz refresh rate for gaming, and Dolby Atmos cinematic sound system.',
    specifications: {
      'Display': '65-inch OLED 4K UHD',
      'Refresh Rate': '120Hz VRR',
      'Audio': '60W Dolby Atmos',
      'Connectivity': 'HDMI 2.1 x4, Wi-Fi 6E'
    },
    isExclusive: true,
    inStock: true,
    brand: 'Samsung',
    discountPercentage: 23,
    badge: 'Exclusive Tech'
  },
  {
    id: 'prod-elec-2',
    name: 'Aura SoundBar Studio 5.1 Surround',
    category: 'electronics',
    categoryName: 'Electronics',
    price: 349,
    originalPrice: 449,
    rating: { rate: 4.7, count: 184 },
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
    description: 'Immersive surround sound with wireless subwoofer, crystal clear voice enhancement, and eARC support.',
    specifications: {
      'Channels': '5.1 Channel',
      'Power Output': '450W',
      'Subwoofer': 'Wireless 8-inch',
      'Inputs': 'HDMI eARC, Optical, Bluetooth 5.3'
    },
    isExclusive: false,
    inStock: true,
    brand: 'Sony',
    discountPercentage: 22
  },

  // Laptops
  {
    id: 'prod-lap-1',
    name: 'Apex ProBook 16 M3 Max Edition',
    category: 'laptops',
    categoryName: 'Laptops',
    price: 2199,
    originalPrice: 2599,
    rating: { rate: 5.0, count: 412 },
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    description: 'Unmatched speed with 16-core CPU, Liquid Retina XDR display, and up to 22 hours of battery life for power creators.',
    specifications: {
      'Processor': '16-Core NextGen CPU',
      'RAM': '32GB Unified Memory',
      'Storage': '1TB NVMe SSD',
      'Display': '16.2-inch Liquid Retina XDR 120Hz'
    },
    isExclusive: true,
    inStock: true,
    brand: 'Apple',
    discountPercentage: 15,
    badge: 'Top Seller'
  },
  {
    id: 'prod-lap-2',
    name: 'Razer Matrix RTX 4090 Gaming Beast',
    category: 'laptops',
    categoryName: 'Laptops',
    price: 2899,
    originalPrice: 3299,
    rating: { rate: 4.8, count: 156 },
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80',
    description: 'Extreme PC performance packed into a ultra-slim CNC aluminum chassis with QHD+ 240Hz display.',
    specifications: {
      'GPU': 'NVIDIA GeForce RTX 4090 16GB',
      'RAM': '64GB DDR5',
      'Storage': '2TB PCIe Gen4 SSD',
      'Display': '17.3-inch QHD+ 240Hz'
    },
    isExclusive: true,
    inStock: true,
    brand: 'Razer',
    discountPercentage: 12,
    badge: 'Exclusive Gaming'
  },

  // Boots
  {
    id: 'prod-boot-1',
    name: 'Vanguard Waterproof Tactical Trail Boots',
    category: 'boots',
    categoryName: 'Boots',
    price: 189,
    originalPrice: 249,
    rating: { rate: 4.8, count: 230 },
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    description: 'Heavy-duty full-grain leather boots with Vibram outsole, breathable GORE-TEX membrane, and impact-absorbing midsole.',
    specifications: {
      'Material': 'Full-Grain Leather & Cordura',
      'Membrane': 'GORE-TEX Waterproof',
      'Outsole': 'Vibram Megagrip',
      'Weight': '620g per boot'
    },
    isExclusive: false,
    inStock: true,
    brand: 'Nike',
    discountPercentage: 24
  },
  {
    id: 'prod-boot-2',
    name: 'Timbercraft Heavy-Duty Worker Boots',
    category: 'boots',
    categoryName: 'Boots',
    price: 165,
    originalPrice: 199,
    rating: { rate: 4.6, count: 189 },
    image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=800&q=80',
    description: 'Steel-toe protection combined with cushioned memory foam orthotics for all-day comfort on tough terrains.',
    specifications: {
      'Safety Rating': 'ASTM F2413 Steel Toe',
      'Upper': 'Nubuck Leather',
      'Insole': 'Anti-Fatigue Dual Density',
      'Color': 'Honey Wheat'
    },
    isExclusive: false,
    inStock: true,
    brand: 'Adidas',
    discountPercentage: 17
  },

  // Bluetooth Devices
  {
    id: 'prod-bt-1',
    name: 'SonicAir Pods Max Wireless Noise Cancelling',
    category: 'bluetooth',
    categoryName: 'Bluetooth Devices',
    price: 279,
    originalPrice: 349,
    rating: { rate: 4.9, count: 540 },
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    description: 'Industry-leading Active Noise Cancellation with spatial audio tracking and 40-hour playtime battery.',
    specifications: {
      'Driver': '40mm Titanium Drivers',
      'Bluetooth': 'Version 5.4 LE Audio',
      'Battery': '40 Hours ANC On',
      'Fast Charge': '10 min = 5 hours'
    },
    isExclusive: true,
    inStock: true,
    brand: 'Apple',
    discountPercentage: 20,
    badge: 'Hot Deal'
  },
  {
    id: 'prod-bt-2',
    name: 'PulseWave Rugged IPX7 Waterproof Speaker',
    category: 'bluetooth',
    categoryName: 'Bluetooth Devices',
    price: 89,
    originalPrice: 129,
    rating: { rate: 4.7, count: 210 },
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80',
    description: '360-degree punchy bass, fully dustproof and waterproof IPX7 rating with ambient RGB light ring.',
    specifications: {
      'Power': '30W RMS Output',
      'Waterproof': 'IPX7 Submersible',
      'Battery': '20 Hours Continuous',
      'Features': 'Party Connect up to 100 speakers'
    },
    isExclusive: false,
    inStock: true,
    brand: 'Sony',
    discountPercentage: 31
  },

  // Hair Care Machines
  {
    id: 'prod-hair-1',
    name: 'Dyson AirStyling Ionic Turbo Hair Dryer',
    category: 'hair-care',
    categoryName: 'Hair Caring Machines',
    price: 399,
    originalPrice: 499,
    rating: { rate: 4.9, count: 680 },
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    description: 'Ultra-fast drying with smart heat control to protect hair shine and natural moisture balance.',
    specifications: {
      'Motor Speed': '110,000 RPM V9 Digital Motor',
      'Attachments': 'Magnetic Styling Concentrator, Diffuser, Flyaway nozzle',
      'Heat Settings': '4 Precise Heat Settings',
      'Weight': '560g'
    },
    isExclusive: true,
    inStock: true,
    brand: 'Dyson',
    discountPercentage: 20,
    badge: 'Premium Beauty'
  },
  {
    id: 'prod-hair-2',
    name: 'Philips Precision Titanium Beard & Hair Trimmer',
    category: 'hair-care',
    categoryName: 'Hair Caring Machines',
    price: 79,
    originalPrice: 109,
    rating: { rate: 4.7, count: 310 },
    image: 'https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=800&q=80',
    description: 'Self-sharpening titanium blades with 40 length settings and 120 minutes cord-free lithium battery runtime.',
    specifications: {
      'Blade Material': 'Self-sharpening Titanium',
      'Length Precision': '0.2mm increments (0.4mm - 20mm)',
      'Battery': '120 min Runtime',
      'Washable': '100% Waterproof'
    },
    isExclusive: false,
    inStock: true,
    brand: 'Philips',
    discountPercentage: 275
  },

  // Sports Products
  {
    id: 'prod-sport-1',
    name: 'Kookaburra Pro Grade English Willow Cricket Bat',
    category: 'sports',
    categoryName: 'Sports Products',
    price: 320,
    originalPrice: 399,
    rating: { rate: 4.9, count: 145 },
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80',
    description: 'Handcrafted Grade 1 English Willow featuring massive edges, lightweight pickup, and supreme power sweet spot.',
    specifications: {
      'Willow Grade': 'Grade 1 English Willow',
      'Weight': '2lb 8oz - 2lb 10oz',
      'Handle': '12-Piece Singapore Cane',
      'Edge Thickness': '40mm'
    },
    isExclusive: true,
    inStock: true,
    brand: 'Nike',
    discountPercentage: 20,
    badge: 'Pro Sports'
  },
  {
    id: 'prod-sport-2',
    name: 'Wilson Pro Staff v14 Carbon Tennis Racket',
    category: 'sports',
    categoryName: 'Sports Products',
    price: 249,
    originalPrice: 299,
    rating: { rate: 4.8, count: 98 },
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=800&q=80',
    description: 'Legendary control and feel with Braid 45 technology designed for precision aggressive tournament players.',
    specifications: {
      'Head Size': '97 sq in',
      'Unstrung Weight': '315g',
      'Balance': '31cm / 10 pts HL',
      'String Pattern': '16x19'
    },
    isExclusive: false,
    inStock: true,
    brand: 'Adidas',
    discountPercentage: 17
  },
  {
    id: 'prod-sport-3',
    name: 'Adidas FIFA Official Match Ball',
    category: 'sports',
    categoryName: 'Sports Products',
    price: 139,
    originalPrice: 165,
    rating: { rate: 4.9, count: 215 },
    image: 'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?auto=format&fit=crop&w=800&q=80',
    description: 'Seamless thermally bonded surface for predictable trajectory, enhanced touch, and zero water absorption.',
    specifications: {
      'Certification': 'FIFA Quality Pro',
      'Surface': 'Thermally Bonded Seamless',
      'Bladder': 'Butyl Bladder',
      'Size': 'Official Size 5'
    },
    isExclusive: false,
    inStock: true,
    brand: 'Adidas',
    discountPercentage: 15
  }
];

export const MOCK_EXCLUSIVE_DEALS: ExclusiveDeal[] = [
  {
    id: 'deal-1',
    productId: 'prod-elec-1',
    title: 'Zenith OLED 65" Ultra Cinema Deal',
    subtitle: 'Save $400 Today + Free Wall Mount & Premium 3-Year Warranty',
    bannerImage: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=1200&q=80',
    discountBadge: 'EXCLUSIVE 23% OFF',
    originalPrice: 1699,
    dealPrice: 1299,
    timerHours: 14,
    timerMinutes: 32,
    timerSeconds: 45,
    featureBullets: [
      'Genuine 4K OLED 120Hz Panel',
      'Dolby Vision & Dolby Atmos Audio',
      'Zero Lag Gaming Mode'
    ]
  },
  {
    id: 'deal-2',
    productId: 'prod-lap-1',
    title: 'Apex ProBook 16 M3 Creator Bundle',
    subtitle: 'Includes Free Leather Sleeve & USB-C Thunderbolt Hub',
    bannerImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
    discountBadge: 'FLASH $400 OFF',
    originalPrice: 2599,
    dealPrice: 2199,
    timerHours: 8,
    timerMinutes: 15,
    timerSeconds: 20,
    featureBullets: [
      '32GB Unified Ultra Memory',
      'Liquid Retina XDR Display',
      '22 Hours Longest Battery'
    ]
  },
  {
    id: 'deal-3',
    productId: 'prod-hair-1',
    title: 'Dyson AirStyling Ionic Luxury Set',
    subtitle: 'Limited Edition Copper & Matte Black with Hard Travel Case',
    bannerImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80',
    discountBadge: 'LIMITED SAVINGS',
    originalPrice: 499,
    dealPrice: 399,
    timerHours: 21,
    timerMinutes: 48,
    timerSeconds: 10,
    featureBullets: [
      'Intelligent Heat Sensor',
      'Negative Ion Moisture Lock',
      '5 Quick Magnetic Attachments'
    ]
  }
];

export const MOCK_PLATFORM_QUALITIES: PlatformQuality[] = [
  {
    id: 'qual-1',
    title: 'Global Express Delivery',
    description: 'Free expedited 48-hour door delivery on all orders over $99 with real-time GPS tracking.',
    iconName: 'Truck',
    highlightText: 'Fast & Tracked'
  },
  {
    id: 'qual-2',
    title: '100% Authentic Guarantee',
    description: 'Direct partnerships with world-class manufacturers guaranteeing original products & factory seals.',
    iconName: 'ShieldCheck',
    highlightText: 'Verified Quality'
  },
  {
    id: 'qual-3',
    title: '30-Day Money Back',
    description: 'Hassle-free 30-day return policy with instant prepaid shipping labels and no restock fees.',
    iconName: 'RefreshCw',
    highlightText: 'Zero Risk Returns'
  },
  {
    id: 'qual-4',
    title: '24/7 Priority Support',
    description: 'Dedicated customer service concierge team available around the clock via live chat or phone.',
    iconName: 'Headphones',
    highlightText: 'Always Here for You'
  }
];

export const MOCK_SPONSORS: SponsorBrand[] = [
  {
    id: 'spon-1',
    name: 'SAMSUNG',
    category: 'Mobile & Electronics',
    logoSvg: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg',
    description: 'Global leader in mobile innovation and display tech.'
  },
  {
    id: 'spon-2',
    name: 'APPLE',
    category: 'Computers & Wearables',
    logoSvg: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
    description: 'Pioneering technology and premium devices.'
  },
  {
    id: 'spon-3',
    name: 'SONY',
    category: 'Audio & Gaming',
    logoSvg: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg',
    description: 'World-renowned sound engineering and PlayStation hardware.'
  },
  {
    id: 'spon-4',
    name: 'NIKE',
    category: 'Sports & Footwear',
    logoSvg: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg',
    description: 'Innovator in athletic footwear and sportswear.'
  },
  {
    id: 'spon-5',
    name: 'ADIDAS',
    category: 'Sports Equipment',
    logoSvg: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg',
    description: 'Official sports gear and match apparel supplier.'
  },
  {
    id: 'spon-6',
    name: 'DYSON',
    category: 'Hair Care & Home',
    logoSvg: 'https://upload.wikimedia.org/wikipedia/commons/d/dd/Dyson_logo.svg',
    description: 'Engineering excellence in hair beauty and airflow.'
  },
  {
    id: 'spon-7',
    name: 'RAZER',
    category: 'Gaming Hardware',
    logoSvg: 'https://upload.wikimedia.org/wikipedia/en/4/40/Razer_snake_logo.svg',
    description: 'High-performance gaming laptops and peripherals.'
  },
  {
    id: 'spon-8',
    name: 'PHILIPS',
    category: 'Personal Care & Electronics',
    logoSvg: 'https://upload.wikimedia.org/wikipedia/commons/5/52/Philips_logo_new.svg',
    description: 'Trusted personal care and grooming tools.'
  }
];

export const MOCK_ORDERS: Record<string, OrderTrackingDetails> = {
  'ZEN-98421': {
    orderId: 'ZEN-98421',
    customerName: 'Alexander Wright',
    email: 'alexander@example.com',
    orderDate: '2026-08-01',
    estimatedDelivery: '2026-08-05',
    carrier: 'FedEx Express (Tracking #FX-884920192)',
    trackingNumber: 'FX-884920192',
    shippingAddress: '742 Evergreen Terrace, Suite 4B, New York, NY 10001',
    status: 'out_for_delivery',
    totalAmount: 1648,
    timeline: [
      {
        step: 'confirmed',
        title: 'Order Confirmed',
        description: 'Payment verified and order details sent to warehouse',
        timestamp: 'Aug 01, 2026 - 09:30 AM',
        completed: true,
        current: false
      },
      {
        step: 'processing',
        title: 'Package Prepared',
        description: 'Items scanned, quality checked, and boxed with eco-packaging',
        timestamp: 'Aug 02, 2026 - 02:15 PM',
        completed: true,
        current: false
      },
      {
        step: 'shipped',
        title: 'In Transit',
        description: 'Departed sorting facility in Newark, NJ',
        timestamp: 'Aug 03, 2026 - 06:45 AM',
        completed: true,
        current: false
      },
      {
        step: 'out_for_delivery',
        title: 'Out for Delivery',
        description: 'Package is on courier van with driver Michael (Stop 14 of 28)',
        timestamp: 'Aug 03, 2026 - 08:20 AM',
        completed: false,
        current: true
      },
      {
        step: 'delivered',
        title: 'Delivered',
        description: 'Sign for delivery at door',
        timestamp: 'Estimated Aug 03, 2026 by 05:00 PM',
        completed: false,
        current: false
      }
    ],
    items: [
      {
        productName: 'Zenith OLED UltraVision 65" 4K Smart TV',
        category: 'Electronics',
        quantity: 1,
        price: 1299,
        image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=400&q=80'
      },
      {
        productName: 'Aura SoundBar Studio 5.1 Surround',
        category: 'Electronics',
        quantity: 1,
        price: 349,
        image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=400&q=80'
      }
    ]
  },

  'ZEN-55102': {
    orderId: 'ZEN-55102',
    customerName: 'Sophia Martinez',
    email: 'sophia@example.com',
    orderDate: '2026-07-28',
    estimatedDelivery: '2026-07-31',
    carrier: 'DHL Express (Tracking #DHL-9920141)',
    trackingNumber: 'DHL-9920141',
    shippingAddress: '120 Ocean Drive, Miami, FL 33139',
    status: 'delivered',
    totalAmount: 478,
    timeline: [
      {
        step: 'confirmed',
        title: 'Order Confirmed',
        description: 'Order confirmed and authorized',
        timestamp: 'Jul 28, 2026 - 11:10 AM',
        completed: true,
        current: false
      },
      {
        step: 'processing',
        title: 'Processing',
        description: 'Packed at distribution hub',
        timestamp: 'Jul 29, 2026 - 08:00 AM',
        completed: true,
        current: false
      },
      {
        step: 'shipped',
        title: 'Shipped',
        description: 'In transit via air express',
        timestamp: 'Jul 30, 2026 - 01:20 PM',
        completed: true,
        current: false
      },
      {
        step: 'out_for_delivery',
        title: 'Out for Delivery',
        description: 'Loaded for local drop-off',
        timestamp: 'Jul 31, 2026 - 09:00 AM',
        completed: true,
        current: false
      },
      {
        step: 'delivered',
        title: 'Delivered',
        description: 'Delivered to porch / front reception',
        timestamp: 'Jul 31, 2026 - 02:40 PM',
        completed: true,
        current: true
      }
    ],
    items: [
      {
        productName: 'SonicAir Pods Max Wireless',
        category: 'Bluetooth Devices',
        quantity: 1,
        price: 279,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80'
      },
      {
        productName: 'Vanguard Tactical Trail Boots',
        category: 'Boots',
        quantity: 1,
        price: 189,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80'
      }
    ]
  }
};

export const MOCK_POLICIES: PolicySection[] = [
  {
    id: 'privacy',
    title: 'Privacy Policy',
    iconName: 'Shield',
    summary: 'How Zenith protects your personal data, payment info, and browsing preferences.',
    lastUpdated: 'August 2026',
    content: [
      'At Zenith E-Commerce Platform, we treat your data privacy as a fundamental engineering standard. We employ bank-grade 256-bit SSL encryption to safeguard all transmission channels.',
      'We collect basic transactional information (name, delivery address, contact email) exclusively to process, ship, and support your purchases. We NEVER sell or lease user data to third-party advertisers.',
      'Cookies are utilized strictly for preserving shopping cart items, authenticating sessions, and improving site loading speeds via edge CDN caching.',
      'You hold full ownership over your account data. You can request a complete data export or account deletion at any time by contacting privacy@zenith-store.com.'
    ],
    faqs: [
      {
        question: 'Is my credit card payment secure?',
        answer: 'Yes. Zenith never stores raw credit card credentials on our servers. All credit card transactions are processed directly by PCI-DSS Level 1 certified gateway partners (Stripe, Visa CyberSource).'
      },
      {
        question: 'How can I unsubscribe from promotional emails?',
        answer: 'Every email includes a 1-click unsubscribe link at the bottom, or you can manage notifications in your account settings.'
      }
    ]
  },
  {
    id: 'returns',
    title: '30-Day Return & Refund Policy',
    iconName: 'RotateCcw',
    summary: 'Clear, straightforward 30-day return policy for peace of mind on every purchase.',
    lastUpdated: 'August 2026',
    content: [
      'We offer a 30-day hassle-free return window starting from the day your package is delivered according to carrier tracking.',
      'Eligibility Requirements: Items must be in original condition, unused, with all factory security tags, original box, and documentation intact.',
      'Free Return Shipping: Zenith provides prepaid return shipping labels for all domestic returns. Simply initiate a return request in your dashboard to generate your label.',
      'Refund Processing Time: Once our inspection facility receives and verifies your return (typically 2-3 business days), refunds are immediately issued back to your original payment method.'
    ],
    faqs: [
      {
        question: 'What items are non-returnable?',
        answer: 'Hygiene products (open hair clippers/trimmers once unsealed), software keys, and personalized custom engraved items cannot be returned unless defective.'
      },
      {
        question: 'Can I exchange an item for a different color or size?',
        answer: 'Yes! Select "Exchange" when initiating your return to reserve the desired item before it sells out.'
      }
    ]
  },
  {
    id: 'terms',
    title: 'Terms of Service',
    iconName: 'FileText',
    summary: 'The legal framework governing purchases, product warranties, and store usage.',
    lastUpdated: 'August 2026',
    content: [
      'By placing an order on Zenith, you agree to these operational terms. All prices displayed are in USD and include applicable taxes where specified.',
      'Product Warranty: All electronics and brand products carry standard manufacturer warranties plus Zenith 1-year buyer protection against defects.',
      'Order Cancellation: Orders can be canceled free of charge prior to warehouse dispatch (typically within 2 hours of placement).'
    ]
  },
  {
    id: 'shipping',
    title: 'Global Shipping Guidelines',
    iconName: 'Truck',
    summary: 'Delivery times, carrier partners, customs clearance, and free shipping thresholds.',
    lastUpdated: 'August 2026',
    content: [
      'Free Standard Shipping is automatically applied to all orders exceeding $99.',
      'Standard Delivery: 3 to 5 business days.',
      'Express Air Delivery: 1 to 2 business days available at checkout.'
    ]
  }
];
