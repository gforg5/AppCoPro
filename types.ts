
export enum AppPlatform {
  IOS = 'ios',
  ANDROID = 'android',
  BOTH = 'both'
}

export enum NavStyle {
  TAB_BAR = 'tab_bar',
  SIDE_MENU = 'side_menu',
  BOTTOM_NAV = 'bottom_nav'
}

export enum Orientation {
  PORTRAIT = 'portrait',
  LANDSCAPE = 'landscape',
  BOTH = 'both'
}

export interface AppConfig {
  url: string;
  name: string;
  description: string;
  icon: string;
  splashScreen: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  navStyle: NavStyle;
  platform: AppPlatform;
  orientation: Orientation;
  userAgent: string;
  features: {
    pushNotifications: boolean;
    offlineMode: boolean;
    admob: boolean;
    socialSharing: boolean;
    cameraAccess: boolean;
    micAccess: boolean;
    locationAccess: boolean;
  };
}

export interface AppProject extends AppConfig {
  id: string;
  createdAt: Date;
  status: 'draft' | 'building' | 'completed';
  lastBuildDate?: Date;
}
