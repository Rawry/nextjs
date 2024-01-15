export default interface Task {
    id: string | null;
    title: string;
    completed: boolean;
    createdAt: Date | null;
  }