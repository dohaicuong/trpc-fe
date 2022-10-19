import { Todo } from 'go1-rpc_todo'
import { useQueryClient } from 'react-query'
import { trpc } from '../providers/TodoRouterProvider'

export const TodoList = () => {
  const { data: todos } = trpc.useQuery(['todo.list', {}])

  return (
    <ul>
      {todos?.map(todo => (
        <TodoListItem key={todo.id} todo={todo} />
      ))}
    </ul>
  )
}

export const TodoListItem = ({ todo }: { todo: Todo }) => {
  const queryClient = useQueryClient()
  const todoDelete = trpc.useMutation('todo.delete')
  const onDelete = () => {
    todoDelete.mutate(
      {
        id: todo.id,
      },
      {
        onSuccess: ({ id }) => {
          queryClient.setQueryData<Todo[]>(['todo.list', {}], todos => todos?.filter(todo => todo.id !== id) || [])
        }
      }
    )
  }

  return (
    <li>
      <button onClick={onDelete}>
        x
      </button>
      {' '}
      {todo.title}
    </li>
  )
}
