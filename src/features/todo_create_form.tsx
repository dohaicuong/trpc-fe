import { useForm } from 'react-hook-form'
import { useQueryClient } from 'react-query'
import { trpc } from '../providers/TodoRouterProvider'
import { Todo, TodoCreateInput } from 'go1-rpc_todo'

export const TodoCreateForm = () => {
  const queryClient = useQueryClient()
  const todoCreate = trpc.useMutation(['todo.create'])

  const { handleSubmit, register, reset } = useForm<TodoCreateInput>()
  const onSubmit = (data: TodoCreateInput) => {
    todoCreate.mutate(data, {
      onSuccess: todo => {
        queryClient.setQueryData<Todo[]>(['todo.list', {}], todos => ([...(todos || []), todo]))
        reset()
      }
    })
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
