import { useState } from 'react'

import './Todo.css'

export default function Todo() {
  const STATUS_NEW = 0
  const STATUS_COMPLETED = 1

  const initialTasks = [
    { id: 0, task: 'Walk the dog', status: STATUS_NEW },
    { id: 1, task: 'Water the plants', status: STATUS_NEW },
    { id: 2, task: 'Wash the dishes', status: STATUS_NEW },
  ]

  const [todo, setTodo] = useState(initialTasks)
  const [newTask, setNewTask] = useState('')
  const [showCompleted, setShowCompleted] = useState(false)
  const [lastId, setLastId] = useState(3)

  const doSubmit = (e) => {
    e.preventDefault()
    if (newTask === '') {
      alert('Enter task!')
      return
    }
    setTodo(prev => [...prev, { task: newTask, status: STATUS_NEW, id: lastId }]),
      setNewTask('')
    setLastId(prev => prev + 1)
  }
  const Table = () => {
    return (
      <table>
        <caption>Todo tasks</caption>
        <thead><tr><td>Task</td></tr></thead>
        <tbody>
          {todo.map((task => {
            if (!showCompleted && task.status === STATUS_COMPLETED) return null
            return <tr key={task.id}>
              <td>{task.id} {task.task}</td>
              <td><button onClick={() => { setTodo(prev => [...prev.filter(value => value.id !== task.id)]) }}>Delete</button></td>
              <td>
                {task.status === STATUS_NEW && <button onClick={() => { setTodo(prev => prev.map(t => t.id === task.id ? { ...t, status: STATUS_COMPLETED } : t)) }}>Complete</button>}
                {task.status === STATUS_COMPLETED && <div>Completed</div>}
              </td>
            </tr>
          }))}
        </tbody>
      </table>
    )
  }
  let shouldShowTable = todo !== undefined
  if (showCompleted) {
    shouldShowTable = todo.length > 0
  } else {
    shouldShowTable = todo.find(t => t.status !== STATUS_COMPLETED) !== undefined
  }
  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <form onSubmit={(e) => { doSubmit(e) }}>
          <input type="text" placeholder="Add your task" value={newTask} onChange={(e) => { setNewTask(e.target.value) }} />
          <div>
            <button>Submit</button>
          </div>
        </form>
      </div>
      {shouldShowTable && <Table />}
      <label htmlFor="completed">Show completed</label>
      <input id="completed" type="checkbox" onChange={() => setShowCompleted(prev => !prev)} />
    </div>
  );
}
