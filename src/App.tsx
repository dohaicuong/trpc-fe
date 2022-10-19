import { Suspense } from 'react'

import { TodoCreateForm } from './features/todo_create_form'
import { TodoList } from './features/todo_list'

const App = () => {

  return (
    <>
      <p>
        Post list
      </p>
      <TodoCreateForm />
      <Suspense fallback='loading...'>
        <TodoList />
      </Suspense>
    </>
  )
}

export default App
