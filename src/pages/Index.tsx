
import React, { useState, useEffect } from "react";
import GoogleLogo from "@/components/GoogleLogo";
import SearchBar from "@/components/SearchBar";
import ShortcutTile from "@/components/ShortcutTile";
import { User, ImageIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

// Define the shortcut type
interface Shortcut {
  id: string;
  name: string;
  icon: string;
  bgColor: string;
  iconColor: string;
}

// Define the available icons
const availableIcons = [
  { value: "youtube", label: "YouTube" },
  { value: "message-circle", label: "Chat" },
  { value: "zap", label: "Zap" },
  { value: "sparkles", label: "Sparkles" },
  { value: "home", label: "Home" },
  { value: "code", label: "Code" }
];

// Define the available colors
const availableColors = [
  { bg: "bg-red-50", text: "text-red-500", label: "Red" },
  { bg: "bg-blue-50", text: "text-blue-500", label: "Blue" },
  { bg: "bg-green-50", text: "text-green-500", label: "Green" },
  { bg: "bg-yellow-50", text: "text-yellow-500", label: "Yellow" },
  { bg: "bg-purple-50", text: "text-purple-500", label: "Purple" },
  { bg: "bg-orange-50", text: "text-orange-500", label: "Orange" },
  { bg: "bg-amber-50", text: "text-amber-600", label: "Amber" },
  { bg: "bg-gray-100", text: "text-gray-700", label: "Gray" }
];

const Index = () => {
  const { toast } = useToast();
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState("youtube");
  const [selectedColor, setSelectedColor] = useState({ bg: "bg-gray-100", text: "text-gray-700" });
  
  const form = useForm({
    defaultValues: {
      name: "",
    }
  });

  // Load shortcuts from localStorage on component mount
  useEffect(() => {
    const savedShortcuts = localStorage.getItem("shortcuts");
    
    if (savedShortcuts) {
      setShortcuts(JSON.parse(savedShortcuts));
    } else {
      // Default shortcuts if none saved
      const defaultShortcuts = [
        { id: "1", name: "YouTube", icon: "youtube", bgColor: "bg-red-50", iconColor: "text-red-500" },
        { id: "2", name: "ChatGPT", icon: "message-circle", bgColor: "bg-gray-100", iconColor: "text-gray-700" },
        { id: "3", name: "Grok", icon: "zap", bgColor: "bg-gray-100", iconColor: "text-gray-700" },
        { id: "4", name: "Gemini", icon: "sparkles", bgColor: "bg-blue-50", iconColor: "text-blue-500" },
        { id: "5", name: "Home", icon: "home", bgColor: "bg-amber-50", iconColor: "text-amber-600" },
        { id: "6", name: "LeetCode", icon: "code", bgColor: "bg-orange-50", iconColor: "text-orange-500" },
      ];
      setShortcuts(defaultShortcuts);
      localStorage.setItem("shortcuts", JSON.stringify(defaultShortcuts));
    }
  }, []);

  // Save shortcuts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("shortcuts", JSON.stringify(shortcuts));
  }, [shortcuts]);

  const handleDeleteShortcut = (id: string | number) => {
    const updatedShortcuts = shortcuts.filter(shortcut => shortcut.id !== id);
    setShortcuts(updatedShortcuts);
  };

  const handleAddShortcut = (data: { name: string }) => {
    const newShortcut = {
      id: Date.now().toString(),
      name: data.name,
      icon: selectedIcon,
      bgColor: selectedColor.bg,
      iconColor: selectedColor.text,
    };

    setShortcuts([...shortcuts, newShortcut]);
    setIsAddDialogOpen(false);
    form.reset();
    toast({
      description: `${newShortcut.name} shortcut was added`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-end p-4 text-sm">
        <nav className="flex items-center space-x-4">
          <a href="#" className="text-gray-600 hover:underline">Gmail</a>
          <a href="#" className="text-gray-600 hover:underline">Images</a>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="19" r="1" />
              <circle cx="5" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
              <circle cx="5" cy="5" r="1" />
              <circle cx="19" cy="19" r="1" />
              <circle cx="19" cy="5" r="1" />
              <circle cx="5" cy="19" r="1" />
            </svg>
          </button>
          <button className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
            <span>A</span>
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 -mt-20">
        <GoogleLogo className="mb-8" />
        <SearchBar />
        
        {/* Shortcuts */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 max-w-3xl">
          {shortcuts.map((shortcut) => (
            <ShortcutTile
              key={shortcut.id}
              id={shortcut.id}
              name={shortcut.name}
              icon={shortcut.icon}
              bgColor={shortcut.bgColor}
              iconColor={shortcut.iconColor}
              onDelete={handleDeleteShortcut}
            />
          ))}
          
          {/* Add Shortcut Tile */}
          <ShortcutTile
            id="add"
            name="Add shortcut"
            icon="plus"
            bgColor="bg-blue-50"
            iconColor="text-blue-500"
            isAddButton={true}
            onClick={() => setIsAddDialogOpen(true)}
          />
        </div>
      </main>

      {/* Add Shortcut Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add new shortcut</DialogTitle>
            <DialogDescription>
              Create a new shortcut for your homepage.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={form.handleSubmit(handleAddShortcut)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shortcut Name</FormLabel>
                  <FormControl>
                    <input 
                      className="w-full p-2 border border-gray-300 rounded-md" 
                      placeholder="e.g. Twitter, Facebook" 
                      {...field} 
                      required
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div>
              <FormLabel>Icon</FormLabel>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {availableIcons.map(icon => (
                  <button
                    key={icon.value}
                    type="button"
                    className={`p-2 rounded-md flex items-center justify-center ${selectedIcon === icon.value ? 'bg-blue-100 border border-blue-500' : 'border border-gray-200'}`}
                    onClick={() => setSelectedIcon(icon.value)}
                  >
                    <ShortcutTile
                      id={icon.value}
                      name={icon.label}
                      icon={icon.value}
                      bgColor="bg-transparent"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <FormLabel>Background Color</FormLabel>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {availableColors.map(color => (
                  <button
                    key={color.bg}
                    type="button"
                    className={`p-3 rounded-md ${color.bg} ${selectedColor.bg === color.bg ? 'ring-2 ring-blue-500' : ''}`}
                    onClick={() => setSelectedColor({ bg: color.bg, text: color.text })}
                  />
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Add Shortcut
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
