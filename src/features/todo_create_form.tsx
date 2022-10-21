import { useForm } from 'react-hook-form'
import { trpc } from '../providers/TodoRouterProvider'
import { TodoCreateInput } from 'go1-rpc_todo'
import { appendData } from '../utils/react-query'

export const TodoCreateForm = () => {
  const { handleSubmit, register, reset } = useForm<TodoCreateInput>()

  const utils = trpc.useContext()
  const todoCreate = trpc.useMutation(['todo.create'], {
    onSuccess: todo => {
      utils.setInfiniteQueryData(
        ['todo.list', { limit: 10 }],
        data => appendData(todo, data)
      )

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
