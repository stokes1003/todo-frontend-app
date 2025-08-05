export interface Task {
  id: string;
  title: string;
  completed: boolean;
  color:
    | "red"
    | "blue"
    | "green"
    | "yellow"
    | "purple"
    | "orange"
    | "pink"
    | "brown";
  createdAt: Date;
  updatedAt: Date;
}

export type TaskColor = Task["color"];

export const TASK_COLORS: TaskColor[] = [
  "red",
  "blue",
  "green",
  "yellow",
  "purple",
  "orange",
  "pink",
  "brown",
];

export const COLOR_NAMES: Record<TaskColor, string> = {
  red: "Red",
  blue: "Blue",
  green: "Green",
  yellow: "Yellow",
  purple: "Purple",
  orange: "Orange",
  pink: "Pink",
  brown: "Brown",
};

export const COLOR_CLASSES: Record<TaskColor, string> = {
  red: "bg-red-100 border-red-300 text-red-800",
  blue: "bg-blue-100 border-blue-300 text-blue-800",
  green: "bg-green-100 border-green-300 text-green-800",
  yellow: "bg-yellow-100 border-yellow-300 text-yellow-800",
  purple: "bg-purple-100 border-purple-300 text-purple-800",
  orange: "bg-orange-100 border-orange-300 text-orange-800",
  pink: "bg-pink-100 border-pink-300 text-pink-800",
  brown: "bg-amber-100 border-amber-300 text-amber-800",
};
