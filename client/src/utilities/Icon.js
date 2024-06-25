//Defines a template to create icons with lucide

import { icons } from 'lucide-react';

function Icon ({ name, color, size, fill, strokeWidth, onClick , handleMouseEnter}) {
  const LucideIcon = icons[name];

  return <span className='icon-component-wrapper' onMouseEnter={handleMouseEnter}  onClick={onClick}><LucideIcon color={color} size={size} fill={fill} strokeWidth={strokeWidth}/></span>
};

export default Icon;
