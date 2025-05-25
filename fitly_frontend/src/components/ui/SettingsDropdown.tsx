import { Building2, Pencil, Trash2, Settings } from "lucide-react";
import { useState } from "react";

interface SettingsDropdownProps {
  onViewDetails?: () => void;
  onEditDetails?: () => void;
  onDeleteAccount?: () => void;
}

export default function SettingsDropdown({
  onViewDetails,
  onEditDetails,
  onDeleteAccount,
}: SettingsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownItems = [
    {
      icon: <Building2 className="w-4 h-4 mr-2" />,
      label: "Τα Στοιχεία μου",
      onClick: onViewDetails,
      className: "text-gray-700"
    },
    {
      icon: <Pencil className="w-4 h-4 mr-2" />,
      label: "Επεξεργασία Στοιχείων",
      onClick: onEditDetails,
      className: "text-gray-700"
    },
    {
      icon: <Trash2 className="w-4 h-4 mr-2" />,
      label: "Διαγραφή Λογαριασμού",
      onClick: onDeleteAccount,
      className: "text-red-600"
    }
  ];

  return (
    <div className="relative">
      <Settings 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-10 h-10 cursor-pointer text-gray-600" 
      />

      {isOpen && (
        <div className="absolute right-0 mt-6 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            <div className="px-4 py-2 text-sm font-semibold text-gray-700">
              Ρυθμίσεις
            </div>
            <div className="border-t border-gray-100" />
            
            {dropdownItems.map((item, index) => (
              <button
                key={item.label}
                onClick={() => {
                  item.onClick?.();
                  setIsOpen(false);
                }}
                className={`flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 ${item.className}`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}