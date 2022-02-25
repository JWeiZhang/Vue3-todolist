interface TodoListItem {
  id: number;
  title: string;
  content: string;
  members: string[];
}

interface TodoList {
  listId: number;
  name: string;
  todos: TodoListItem[];
}

export { TodoList, TodoListItem };
