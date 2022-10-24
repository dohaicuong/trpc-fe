import { Fragment } from 'react'
import { trpc } from '../providers/TodoRouterProvider'
import { TodoListItem } from './todo_list_item'

export const TodoList = () => {
  const { data: todoList } = trpc.todo_list.useInfiniteQuery(
    { limit: 10 },
    { getNextPageParam: lastPage => lastPage.nextCursor }
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
