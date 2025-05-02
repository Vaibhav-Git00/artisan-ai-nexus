import { ThemeConfig } from 'antd';

// Define our color palette
export const colors = {
  primary: '#E07A5F',
  primaryHover: '#c05a3f',
  secondary: '#333333',
  textPrimary: '#333333',
  textSecondary: '#555555',
  textLight: '#888888',
  background: '#ffffff',
  backgroundSecondary: '#f8f9fa',
  borderColor: '#e8e8e8',
  success: '#52c41a',
  warning: '#faad14',
  error: '#f5222d',
  info: '#1890ff',
};

// Dark mode colors
export const darkColors = {
  primary: '#E07A5F',
  primaryHover: '#c05a3f',
  secondary: '#1f1f1f',
  textPrimary: '#ffffff',
  textSecondary: 'rgba(255, 255, 255, 0.85)',
  textLight: 'rgba(255, 255, 255, 0.65)',
  background: '#121212',
  backgroundSecondary: '#1f1f1f',
  borderColor: '#303030',
  success: '#52c41a',
  warning: '#faad14',
  error: '#f5222d',
  info: '#1890ff',
};

// Font settings
export const fontSettings = {
  fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  fontSize: 14,
  headingFontWeight: 600,
};

// Border radius
export const borderRadius = {
  small: 4,
  medium: 8,
  large: 12,
};

// Shadows
export const shadows = {
  small: '0 2px 8px rgba(0, 0, 0, 0.05)',
  medium: '0 4px 12px rgba(0, 0, 0, 0.1)',
  large: '0 8px 24px rgba(0, 0, 0, 0.15)',
};

// Spacing
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Ant Design theme configuration
export const lightTheme: ThemeConfig = {
  token: {
    colorPrimary: colors.primary,
    borderRadius: borderRadius.medium,
    colorBgContainer: colors.background,
    fontFamily: fontSettings.fontFamily,
    fontSize: fontSettings.fontSize,
  },
  components: {
    Layout: {
      bodyBg: colors.background,
      headerBg: colors.background,
      footerBg: colors.secondary,
    },
    Button: {
      primaryColor: colors.background,
      defaultBg: colors.background,
    },
    Card: {
      colorBorderSecondary: 'transparent',
    },
    Typography: {
      colorTextHeading: colors.textPrimary,
      colorText: colors.textSecondary,
      colorTextSecondary: colors.textLight,
    },
  },
};

export const darkTheme: ThemeConfig = {
  token: {
    colorPrimary: darkColors.primary,
    borderRadius: borderRadius.medium,
    colorBgContainer: darkColors.background,
    fontFamily: fontSettings.fontFamily,
    fontSize: fontSettings.fontSize,
  },
  components: {
    Layout: {
      bodyBg: darkColors.background,
      headerBg: darkColors.secondary,
      footerBg: darkColors.secondary,
    },
    Button: {
      primaryColor: darkColors.textPrimary,
      defaultBg: darkColors.secondary,
    },
    Card: {
      colorBorderSecondary: 'transparent',
    },
    Typography: {
      colorTextHeading: darkColors.textPrimary,
      colorText: darkColors.textSecondary,
      colorTextSecondary: darkColors.textLight,
    },
  },
};

export default lightTheme;
