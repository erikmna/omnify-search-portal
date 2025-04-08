
import React from "react";
import GoogleLogo from "@/components/GoogleLogo";
import SearchBar from "@/components/SearchBar";
import ShortcutTile from "@/components/ShortcutTile";
import { User, ImageIcon } from "lucide-react";

const Index = () => {
  const shortcuts = [
    { id: 1, name: "(614) YouTube", icon: "youtube", bgColor: "bg-red-50", iconColor: "text-red-500" },
    { id: 2, name: "ChatGPT", icon: "message-circle", bgColor: "bg-gray-100", iconColor: "text-gray-700" },
    { id: 3, name: "Grok", icon: "zap", bgColor: "bg-gray-100", iconColor: "text-gray-700" },
    { id: 4, name: "Gemini", icon: "sparkles", bgColor: "bg-blue-50", iconColor: "text-blue-500" },
    { id: 5, name: "Home", icon: "home", bgColor: "bg-amber-50", iconColor: "text-amber-600" },
    { id: 6, name: "LeetCode", icon: "code", bgColor: "bg-orange-50", iconColor: "text-orange-500" },
    { id: 7, name: "Add shortcut", icon: "plus", bgColor: "bg-blue-50", iconColor: "text-blue-500" },
  ];

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
              name={shortcut.name}
              icon={shortcut.icon}
              bgColor={shortcut.bgColor}
              iconColor={shortcut.iconColor}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
