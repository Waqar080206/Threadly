/**
 * This app is locked to a single warm paper–light aesthetic.
 * Dark mode is intentionally disabled to preserve the fixed design.
 */

import { Colors } from '@/constants/theme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = 'light';
  const colorFromProps = props.light;

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors.light[colorName];
  }
}
