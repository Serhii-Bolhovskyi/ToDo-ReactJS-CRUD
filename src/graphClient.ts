import { Todo } from "./features/todos/todoTypes.ts";

const GRAPHQL_ENDPOINT = "https://localhost:7205/graphql";

const GET_TODOS_QUERY = `
    query {
    tasks {
        id
        title
        categoryId
        deadline
        completeDate
        isCompleted
    }
    }
`;

const ADD_TODO_MUTATION = `
    mutation ($title: String!, $categoryId: Int, $deadline: DateTime ) {
    addTask(task: {title: $title, categoryId: $categoryId, 
        deadline: $deadline}) {
        id
        title
        categoryId
        deadline
        isCompleted
    }
    }
`;

const convertDate = (date: string | undefined): string | null => {
  if (!date) return null;
  return `${date}T00:00:00`;
};

async function graphqlRequest<T>(
  query: string,
  variables?: Record<string, any>
): Promise<T> {
  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "GraphQL-Require-Preflight": "1",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP erroe! status: ${response.status}`);
    }

    const result = await response.json();
    if (result.errors) {
      throw new Error(result.errors[0].message || "GraphQL error");
    }

    return result.data;
  } catch (error) {
    console.error("GraphQL request error: ", error);
    throw error;
  }
}

export const todosApi = {
  async fetchTodos(): Promise<Todo[]> {
    const data = await graphqlRequest<{ tasks: Todo[] }>(GET_TODOS_QUERY);
    return data.tasks;
  },
  async addTask(input: {
    title: string;
    categoryId: number;
    deadline?: string;
  }): Promise<Todo> {
    const convertedDeadline = convertDate(input.deadline);
    const data = await graphqlRequest<{ addTask: Todo }>(ADD_TODO_MUTATION, {
      title: input.title,
      categoryId: input.categoryId,
      deadline: convertedDeadline,
    });
    return data.addTask;
  },
};
