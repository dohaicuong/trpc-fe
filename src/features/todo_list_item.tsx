import { todoRouter } from 'go1-rpc_todo'
import { trpc } from '../providers/TodoRouterProvider'
import { removeItem } from '../utils/react-query'
import { inferProcedureOutput } from '@trpc/server'

type TodoListPayload = inferProcedureOutput<typeof todoRouter['todo_list']>
type TodoListItem = TodoListPayload['items'][0]

export const TodoListItem = ({ todo }: { todo: TodoListItem }) => {
  const utils = trpc.useContext()
  const todoDelete = trpc.todo_delete.useMutation({
    onSuccess: ({ id }) => {
      utils.todo_list.setInfiniteData(
        data => removeItem(id, data),
        { limit: 10 }
      )
    }
  })

  const onDelete = () => {
    todoDelete.mutate({ id: todo.id })
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
