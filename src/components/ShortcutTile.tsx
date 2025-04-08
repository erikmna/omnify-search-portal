
import React from "react";
import { 
  Youtube, MessageCircle, Zap, Sparkles, Home, 
  Code, Plus, LucideIcon
} from "lucide-react";

interface ShortcutTileProps {
  name: string;
  icon: string;
  bgColor?: string;
  iconColor?: string;
}

const ShortcutTile: React.FC<ShortcutTileProps> = ({ 
  name, 
  icon, 
  bgColor = "bg-gray-100",
  iconColor = "text-gray-600" 
}) => {
  const iconMap: Record<string, React.ReactNode> = {
    youtube: <Youtube size={24} className={iconColor} />,
    "message-circle": <MessageCircle size={24} className={iconColor} />,
    zap: <Zap size={24} className={iconColor} />,
    sparkles: <Sparkles size={24} className={iconColor} />,
    home: <Home size={24} className={iconColor} />,
    code: <Code size={24} className={iconColor} />,
    plus: <Plus size={24} className={iconColor} />
  };

  return (
    <div className="flex flex-col items-center w-24 cursor-pointer group">
      <div className={`w-12 h-12 ${bgColor} rounded-full flex items-center justify-center mb-2 group-hover:bg-gray-200`}>
        {iconMap[icon]}
      </div>
      <span className="text-xs text-gray-600 text-center line-clamp-2">{name}</span>
    </div>
  );
};

export default ShortcutTile;
