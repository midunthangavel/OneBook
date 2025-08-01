
import { AppIcons, IconLibrary } from '../components/ui/Icon';

// Helper function to get all available icons by category
export const getIconsByCategory = () => {
  return {
    navigation: {
      home: AppIcons.home,
      search: AppIcons.search,
      person: AppIcons.person,
      calendar: AppIcons.calendar,
    },
    actions: {
      add: AppIcons.add,
      close: AppIcons.close,
      checkmark: AppIcons.checkmark,
      arrowBack: AppIcons.arrowBack,
      arrowForward: AppIcons.arrowForward,
    },
    wedding: {
      rings: AppIcons.rings,
      cake: AppIcons.cake,
      flower: AppIcons.flower,
      camera: AppIcons.camera,
      location: AppIcons.location,
    },
    social: {
      heart: AppIcons.heart,
      heartOutline: AppIcons.heartOutline,
      share: AppIcons.share,
      star: AppIcons.star,
      starOutline: AppIcons.starOutline,
    },
    authentication: {
      email: AppIcons.email,
      lock: AppIcons.lock,
      visibility: AppIcons.visibility,
      visibilityOff: AppIcons.visibilityOff,
    },
    settings: {
      settings: AppIcons.settings,
      notification: AppIcons.notification,
      help: AppIcons.help,
    },
  };
};

// Popular icons from different libraries for quick reference
export const popularIcons = {
  Ionicons: [
    'home', 'search', 'heart', 'person', 'settings', 'notifications',
    'add', 'close', 'checkmark', 'star', 'camera', 'location'
  ],
  MaterialIcons: [
    'email', 'lock', 'visibility', 'visibility-off', 'favorite',
    'home', 'search', 'person', 'settings', 'notifications'
  ],
  MaterialCommunityIcons: [
    'ring', 'cake-variant', 'flower', 'church', 'account-multiple',
    'calendar-heart', 'gift', 'music', 'party-popper'
  ],
  FontAwesome: [
    'heart', 'star', 'user', 'home', 'search', 'cog', 'bell'
  ],
  FontAwesome5: [
    'heart', 'star', 'user-alt', 'home', 'search', 'cog', 'bell'
  ],
  Feather: [
    'heart', 'star', 'user', 'home', 'search', 'settings', 'bell'
  ],
  AntDesign: [
    'heart', 'star', 'user', 'home', 'search', 'setting', 'notification'
  ],
  Entypo: [
    'heart', 'star', 'user', 'home', 'magnifying-glass', 'cog', 'bell'
  ]
};

// Function to validate if an icon exists in a library
export const validateIcon = (library: IconLibrary, iconName: string): boolean => {
  // This is a simplified validation - in a real app, you might want to 
  // maintain a comprehensive list of all available icons per library
  const commonIcons = popularIcons[library] || [];
  return commonIcons.includes(iconName);
};
