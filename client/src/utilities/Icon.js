//Defines a template to create icons with lucide

import { icons } from 'lucide-react';

function Icon ({ name, color, size, fill, strokeWidth }) {
  const LucideIcon = icons[name];

  return <LucideIcon color={color} size={size} fill={fill} strokeWidth={strokeWidth}/>;
};

export default Icon;
