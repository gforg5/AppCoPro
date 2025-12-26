
import React from 'react';

export const COLORS = {
  primary: '#6366f1',
  secondary: '#a855f7',
  accent: '#ec4899',
  dark: '#0f172a',
  light: '#f8fafc'
};

export const PRICING_PLANS = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for testing and personal side-projects.',
    features: ['Android APK Build', 'Standard Icon', 'Community Support', 'Watermarked Splash'],
    buttonText: 'Get Started',
    highlighted: false
  },
  {
    name: 'Pro',
    price: '$29/mo',
    description: 'The professional choice for businesses and creators.',
    features: ['iOS & Android Builds', 'Custom Icon & Splash', 'Push Notifications', 'AdMob Integration', 'No Watermark', 'Priority Email Support'],
    buttonText: 'Go Pro',
    highlighted: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Scale your business with white-label solutions.',
    features: ['Unlimited Builds', 'Multi-app Management', 'Deep Linking Setup', 'App Store Submission Help', 'Dedicated Account Manager', 'SLA Guarantee'],
    buttonText: 'Contact Sales',
    highlighted: false
  }
];

export const TESTIMONIALS = [
  {
    name: 'Sarah Chen',
    role: 'E-commerce Manager',
    content: 'AppCoPro transformed our Shopify store into a stunning mobile app in under 15 minutes. Our mobile conversion rates shot up by 40%!',
    avatar: 'https://picsum.photos/seed/sarah/100/100'
  },
  {
    name: 'David Miller',
    role: 'SaaS Founder',
    content: 'The real-time preview and AI icon generator are game changers. We saved thousands in development costs by using AppCoPro.',
    avatar: 'https://picsum.photos/seed/david/100/100'
  }
];
