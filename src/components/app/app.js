import React, { Component } from 'react';
import './app.css';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import TodoAdd from '../todo-for-add';

export default class App extends Component {

  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch')
    ],
    filter: 'all', 
    term: ''
  };

  createTodoItem(label) {
    return {
      label,
      important: false, 
      done: false,
      id: this.maxId++
    };
  };
  
  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]//не изменяет текущий массив

      return {
        todoData: newArray
      }
    });
  };

  addItem = (todo) => {
    const newItem = this.createTodoItem(todo);

    this.setState(({todoData}) => {
      const newArray = [...todoData, newItem]//не изменяет текущий массив
      return {
        todoData: newArray
      }
    });
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);
      const oldItem = arr[idx];

      const newItem = {...oldItem, [propName]: !oldItem[propName]};
      return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]//не изменяет текущий массив
  };

  onToggleDone = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      }
    });
  };

  onToggleImportant = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      }
    });
  };

  onFilterChange = (filter) => {
    this.setState({ filter })
  };

  onSearchChange = (term) => {
    this.setState({ term })
  };

  filteredTodos(items, filter){
    if (filter === 'done') {
      return items.filter((item) => item.done)
    }
    else if (filter === 'active') {
      return items.filter((item) => !item.done)
    }
    else{
      return items
    }
  }

  search(items, term) {
    if (term.length === 0) {
      return items
    }
    
    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  }

  render() {
    const { todoData, filter, term } = this.state
    const doneCount = todoData.filter((el) => el.done).length
    const todoCount = todoData.length - doneCount

    const visibleItems = this.filteredTodos(this.search(todoData, term), filter)

    return (
        <div className="todo-app">
          <AppHeader toDo={todoCount} done={doneCount} />
          <div className="top-panel d-flex">
            <SearchPanel onSearchChange={this.onSearchChange}/>
            <ItemStatusFilter onFilterChange={this.onFilterChange}
                              filter={filter}/>
          </div>
    
          <TodoList todos={visibleItems} 
                    onDeleted={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}/>
          
          <TodoAdd onAddItem={this.addItem}/>
        </div>
      );
  };
};
