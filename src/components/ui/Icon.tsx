
import React from 'react';
import { 
  Ionicons, 
  MaterialIcons, 
  MaterialCommunityIcons, 
  FontAwesome, 
  FontAwesome5,
  Feather,
  Entypo,
  AntDesign
} from '@expo/vector-icons';

export type IconLibrary = 
  | 'Ionicons' 
  | 'MaterialIcons' 
  | 'MaterialCommunityIcons' 
  | 'FontAwesome' 
  | 'FontAwesome5'
  | 'Feather'
  | 'Entypo'
  | 'AntDesign';

export interface IconProps {
  library: IconLibrary;
  name: string;
  size?: number;
  color?: string;
  style?: any;
}

export const Icon: React.FC<IconProps> = ({ 
  library, 
  name, 
  size = 24, 
  color = '#000', 
  style 
}) => {
  const IconComponent = {
    Ionicons,
    MaterialIcons,
    MaterialCommunityIcons,
    FontAwesome,
    FontAwesome5,
    Feather,
    Entypo,
    AntDesign,
  }[library];

  return (
    <IconComponent 
      name={name as any} 
      size={size} 
      color={color} 
      style={style}
    />
  );
};

// Predefined icons for common use cases
export const AppIcons = {
  // Navigation
  home: { library: 'Ionicons' as IconLibrary, name: 'home' },
  search: { library: 'Ionicons' as IconLibrary, name: 'search' },
  heart: { library: 'Ionicons' as IconLibrary, name: 'heart' },
  heartOutline: { library: 'Ionicons' as IconLibrary, name: 'heart-outline' },
  person: { library: 'Ionicons' as IconLibrary, name: 'person' },
  calendar: { library: 'Ionicons' as IconLibrary, name: 'calendar' },
  
  // Actions
  add: { library: 'Ionicons' as IconLibrary, name: 'add' },
  close: { library: 'Ionicons' as IconLibrary, name: 'close' },
  checkmark: { library: 'Ionicons' as IconLibrary, name: 'checkmark' },
  arrowBack: { library: 'Ionicons' as IconLibrary, name: 'arrow-back' },
  arrowForward: { library: 'Ionicons' as IconLibrary, name: 'arrow-forward' },
  
  // Wedding specific
  rings: { library: 'MaterialCommunityIcons' as IconLibrary, name: 'ring' },
  cake: { library: 'MaterialCommunityIcons' as IconLibrary, name: 'cake-variant' },
  flower: { library: 'MaterialCommunityIcons' as IconLibrary, name: 'flower' },
  camera: { library: 'Ionicons' as IconLibrary, name: 'camera' },
  location: { library: 'Ionicons' as IconLibrary, name: 'location' },
  
  // Authentication
  email: { library: 'MaterialIcons' as IconLibrary, name: 'email' },
  lock: { library: 'MaterialIcons' as IconLibrary, name: 'lock' },
  visibility: { library: 'MaterialIcons' as IconLibrary, name: 'visibility' },
  visibilityOff: { library: 'MaterialIcons' as IconLibrary, name: 'visibility-off' },
  
  // Social
  share: { library: 'Ionicons' as IconLibrary, name: 'share-social' },
  star: { library: 'Ionicons' as IconLibrary, name: 'star' },
  starOutline: { library: 'Ionicons' as IconLibrary, name: 'star-outline' },
  
  // Settings
  settings: { library: 'Ionicons' as IconLibrary, name: 'settings' },
  notification: { library: 'Ionicons' as IconLibrary, name: 'notifications' },
  help: { library: 'Ionicons' as IconLibrary, name: 'help-circle' },
};
