import { Category } from "./types.ts";

const initialState: Category[] = [
  {
    id: 1,
    name: "General",
  },
  {
    id: 2,
    name: "Study",
  },
  {
    id: 3,
    name: "Personal",
  },
  {
    id: 4,
    name: "Household",
  },
  {
    id: 5,
    name: "Work",
  },
];

export default function categoriesReducer(
  state: Category[] = initialState,
  action: any
): Category[] {
  return state;
}
