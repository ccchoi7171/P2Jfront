import { useState } from "react";

export interface Category {
  id: number;
  label: string;
  color: string;
  checked: boolean;
}

export const useSidebarState = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const [categories, setCategories] = useState<Category[]>([
    { id: 1, label: "Category 1", color: "#FF4D49", checked: true },
    { id: 2, label: "Category 2", color: "#FFA100", checked: true },
    { id: 3, label: "Category 3", color: "#FFE000", checked: true },
    { id: 4, label: "Category 4", color: "#00DE2E", checked: true },
    { id: 5, label: "Category 5", color: "#0099FF", checked: true },
    { id: 6, label: "Category 6", color: "#E769FF", checked: true },
    { id: 7, label: "Category 7", color: "#929297", checked: true },
  ]);

  const toggleCategory = (id: number) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === id ? { ...cat, checked: !cat.checked } : cat
      )
    );
  };

  return {
    activeTab,
    setActiveTab,
    categories,
    toggleCategory,
  };
};
