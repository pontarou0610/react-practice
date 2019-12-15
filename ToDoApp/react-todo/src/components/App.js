import React from "react";

import Form from "./Form";
import CheckAll from "./CheckAll";
import Filter from "./Filter";
import Todo from "./Todo";
import EditTodo from "./EditTodo";

let currentId = 0;

class App extends React.Component {
  constructor(props) {
    super(props)


    this.state = {
      filter: 'all',
      todos: []
    }
  }
  render() {
    const { todos, filter } = this.state
    const filteredTodos = todos.filter(({ completed }) => {
      switch (filter) {
        case 'all':
          return true

        case 'uncompleted':
          return !completed

        case 'completed':
          return completed

        default:
          return true
      }
    })

    return (
      <div>
        <Form onSubmit={this.handleSubmit} />

        <CheckAll allCompleted={todos.length > 0 && todos.every(({ completed }) => completed)
        }
          onChange={this.handleChangedAllCompleted} />

        <Filter filter={filter} onChange={this.handleChangeFilter} />

        <ul>
          {filteredTodos.map(({ id, text, completed, editing }) => (
            <li key={id}>
              {editing ? (<EditTodo id={id} text={text}
                onCancel={this.handleChangedTodoAttribute}
                onSubmit={this.handleUpdateTodoText} />) :
                <Todo id={id}
                  text={text}
                  completed={completed}
                  onChange={this.handleChangedTodoAttribute}
                  onDelete={this.handleClickDelete}>
                </Todo>}

            </li>
          ))}
        </ul>
        <button onClick={this.handleClickDeleteCompleted}>
          完了済みをすべて削除
          </button>
      </div>
    );
  }

  handleUpdateTodoText = (id, text) => {
    const newTodos = this.state.todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          text,
          editing: false
        }
      }

      return todo
    })

    this.setState({ todos: newTodos })
  }

  handleSubmit = text => {
    const newTodo = {
      id: currentId,
      text,
      completed: false,
      editing: false
    }
    const newTodos = [...this.state.todos, newTodo];
    this.setState({ todos: newTodos });
    currentId++;
  }

  handleChangedAllCompleted = completed => {
    const newTodos = this.state.todos.map(todo => ({
      ...todo,
      completed,
    }));

    this.setState({ todos: newTodos })
  }

  handleChangeFilter = filter => {
    this.setState({ filter })
  }

  handleClickDelete = id => {
    const newTodos = this.state.todos.filter(todo => todo.id !== id)
    this.setState({ todos: newTodos })
  }

  handleChangedTodoAttribute = (id, key, value) => {
    const newTodos = this.state.todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          [key]: value
        }
      }
      return todo
    })
    this.setState({ todos: newTodos })
  }

  handleClickDeleteCompleted = () => {
    const newTodos = this.state.todos.filter(({ completed }) => !completed)
    this.setState({ todos: newTodos })
  }
}
export default App;
