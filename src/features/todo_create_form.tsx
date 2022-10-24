import { useForm } from 'react-hook-form'
import { trpc } from '../providers/TodoRouterProvider'
import { TodoCreateInput } from 'go1-rpc_todo'
import { appendData } from '../utils/react-query'

export const TodoCreateForm = () => {
  const { handleSubmit, register, reset } = useForm<TodoCreateInput>()

  const utils = trpc.useContext()
  const todoCreate = trpc.todo_create.useMutation({
    onSuccess: todo => {
      utils.todo_list.setInfiniteData(
        data => {
          const newData = appendData(todo, data)
          console.log(newData)
          return newData
        },
        { limit: 10 }
      )
      utils.todo_list.invalidate()
      reset()
    }
  })
  
  const onSubmit = (data: TodoCreateInput) => {
    todoCreate.mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        placeholder='title'
        required
        {...register('title')}
      />
      <input
        placeholder='content'
        required
        {...register('content')}
      />
      <button type='submit'>
        create
      </button>
    </form>
  )
}
