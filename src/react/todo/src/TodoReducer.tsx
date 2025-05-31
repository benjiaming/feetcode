import React, { useReducer, useRef, useState } from 'react'
import './Todo.css'

type Action = 'ADD_TASK' | 'DELETE_TASK' | 'TOGGLE_TASK'

interface ActionType {
    type: Action
    id?: number,
    name?: string
}

interface TodoTask {
    id: number;
    task: string|undefined;
    completed: boolean;
}

export default function TodoReducer() {
    const idRef = useRef(0);
    const nextId = () => ++idRef.current;

    const todoReducerFun = (state: TodoTask[], action: ActionType): TodoTask[] => {
        switch (action.type) {
            case 'ADD_TASK': 
                return [ ...state, {id: nextId(), task: action.name, completed: false}]
            case 'DELETE_TASK': return state.filter((todo: TodoTask) => todo.id !== action.id)
            case 'TOGGLE_TASK': return state.map((todo: TodoTask) => todo.id === action.id ? {id: todo.id, task: todo.task, completed: !todo.completed} : todo)
            default:
                throw "Unknown action " + JSON.stringify(action)
        }
    }
    const initialState: TodoTask[] = [
        {id: nextId(), task: 'Walk the dog', completed: false},
        {id: nextId(), task: 'Water the plants', completed: false},
        {id: nextId(), task: 'Wash the dishes', completed: false},
    ]
    const [state, dispatch] = useReducer(todoReducerFun, initialState)
    const [newTask, setNewTask] = useState('')
    const [showCompleted, setShowCompleted] = useState(false)

    const onSubmit = () => {
        if (newTask.trim().length === 0) return 
        dispatch({type: 'ADD_TASK', name: newTask})
        setNewTask('')
    }

    return <div>
        <form onSubmit={(e: React.FormEvent) => {e.preventDefault(); onSubmit()}}>
        <label htmlFor="newTask">Enter task:</label>
        <input value={newTask} onChange={(e)=>setNewTask(e.target.value)} type="text" name="newTask"></input> 
        <input type="submit"/>

        <ul>
        {state.filter((todo: TodoTask) => !todo.completed || showCompleted).map((todo: TodoTask) => 
        <li style={{textDecoration: todo.completed ? 'line-through' : 'none'}} key={todo.id}>{todo.task}
            <button onClick={()=>dispatch({type: 'DELETE_TASK', id:todo.id})}>Delete</button>
            <button onClick={()=>dispatch({type: 'TOGGLE_TASK', id:todo.id})}>{todo.completed ? 'Redo' : 'Complete'}</button>
        </li>)}
        </ul>
        
        <label htmlFor='showCompleted'>Show Completed:</label> 
        <input id="showCompleted" type="checkbox" checked={showCompleted} onChange={() => setShowCompleted(prev => !prev)} />
        </form>
    </div>

}