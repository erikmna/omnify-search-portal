
import React from "react";
import { 
  Youtube, MessageCircle, Zap, Sparkles, Home, 
  Code, Plus, LucideIcon, Trash2, X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ShortcutTileProps {
  id: string | number;
  name: string;
  icon: string;
  bgColor?: string;
  iconColor?: string;
  onDelete?: (id: string | number) => void;
  isAddButton?: boolean;
  onClick?: () => void;
}

const ShortcutTile: React.FC<ShortcutTileProps> = ({ 
  id,
  name, 
  icon, 
  bgColor = "bg-gray-100",
  iconColor = "text-gray-600",
  onDelete,
  isAddButton = false,
  onClick
}) => {
  const { toast } = useToast();
  
  const iconMap: Record<string, React.ReactNode> = {
    youtube: <Youtube size={24} className={iconColor} />,
    "message-circle": <MessageCircle size={24} className={iconColor} />,
    zap: <Zap size={24} className={iconColor} />,
    sparkles: <Sparkles size={24} className={iconColor} />,
    home: <Home size={24} className={iconColor} />,
    code: <Code size={24} className={iconColor} />,
    plus: <Plus size={24} className={iconColor} />
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(id);
      toast({
        description: `${name} shortcut was removed`,
      });
    }
  };

  const handleClick = () => {
    if (isAddButton && onClick) {
      onClick();
    } else if (!isAddButton) {
      // In a real app, this would navigate to the URL
      window.open(`https://${name.toLowerCase().replace(/\s/g, '')}.com`, '_blank');
    }
  };

  return (
    <div className="flex flex-col items-center w-24 cursor-pointer group relative" onClick={handleClick}>
      <div className={`w-12 h-12 ${bgColor} rounded-full flex items-center justify-center mb-2 group-hover:bg-gray-200 relative`}>
        {iconMap[icon]}
        
        {!isAddButton && onDelete && (
          <button 
            onClick={handleDelete}
            className="absolute -top-2 -right-2 bg-red-500 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Delete shortcut"
          >
            <X size={14} className="text-white" />
          </button>
        )}
      </div>
      <span className="text-xs text-gray-600 text-center line-clamp-2">{name}</span>
    </div>
  );
};

export default ShortcutTile;
