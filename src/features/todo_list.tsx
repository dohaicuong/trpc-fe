import { Todo } from 'go1-rpc_todo'
import { trpc } from '../providers/TodoRouterProvider'
import { Fragment } from 'react'
import { removeItem } from '../utils/react-query'

export const TodoList = () => {
  const { data: todoList } = trpc.useInfiniteQuery(
    ['todo.list', { limit: 10 }],
    {
      getNextPageParam: lastPage => lastPage.nextCursor
    }
  )

  return (
    <ul>
      {todoList?.pages.map((page, i) => (
        <Fragment key={i}>
          {page.items.map(item => (
            <TodoListItem key={item.id} todo={item} />
          ))}
        </Fragment>
      ))}
    </ul>
  )
}

export const TodoListItem = ({ todo }: { todo: Todo }) => {
  const utils = trpc.useContext()
  const todoDelete = trpc.useMutation('todo.delete', {
    onSuccess: ({ id }) => {
      utils.setInfiniteQueryData(
        ['todo.list', { limit: 10 }],
        data => removeItem(id, data)
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
