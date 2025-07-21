import React from "react";
import { useSelector } from "react-redux";
import { Category } from "./types.ts";
import { RootState } from "../../store.ts";

interface CategoryListProps {
  selectedCatId: number;
  onSetSelectedCatId: (id: number) => void;
}

function CategoryList({
  selectedCatId,
  onSetSelectedCatId,
}: CategoryListProps) {
  const categories = useSelector((state: RootState) => state.categories);
  return (
    <select
      value={selectedCatId}
      onChange={(e) => onSetSelectedCatId(Number(e.target.value))}
    >
      {categories.map((cat: Category) => (
        <option key={cat.id} value={cat.id}>
          {cat.name}
        </option>
      ))}
    </select>
  );
}

export default CategoryList;
