import React from "react";
import CategoryCheckbox from "./CategoryCheckbox";

interface Category {
  id: number;
  label: string;
  color: string;
  checked: boolean;
}

interface CategoryListProps {
  categories: Category[];
  onToggle: (id: number) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  onToggle,
}) => {
  return (
    <div className="flex flex-col gap-2">
      {categories.map((category) => (
        <CategoryCheckbox
          key={category.id}
          label={category.label}
          color={category.color}
          checked={category.checked}
          onChange={() => onToggle(category.id)}
        />
      ))}
    </div>
  );
};

export default CategoryList;
