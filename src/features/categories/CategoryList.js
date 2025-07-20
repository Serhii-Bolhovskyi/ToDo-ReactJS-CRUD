import { useSelector } from "react-redux";

function CategoryList({ selectedCatId, onSetSelectedCatId }) {
  const categories = useSelector((state) => state.categories);
  return (
    <select
      value={selectedCatId}
      onChange={(e) => onSetSelectedCatId(e.target.value)}
    >
      {categories.map((cat) => (
        <option key={cat.id} value={cat.id}>
          {cat.name}
        </option>
      ))}
    </select>
  );
}

export default CategoryList;
