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
      { label: 'Drink Coffee', important: false, id: 1 },
      { label: 'Make Awesome App', important: true, id: 2 },
      { label: 'Have a lunch', important: false, id: 3 }
    ]
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
    const newItem = {
      label: todo,
      important: false,
      id: this.maxId++
    }

    this.setState(({todoData}) => {
      const newArray = [...todoData, newItem]//не изменяет текущий массив
      return {
        todoData: newArray
      }
    });
  };

  render() {
    return (
        <div className="todo-app">
          <AppHeader toDo={1} done={3} />
          <div className="top-panel d-flex">
            <SearchPanel />
            <ItemStatusFilter />
          </div>
    
          <TodoList todos={this.state.todoData} 
                    onDeleted={this.deleteItem}/>
          
          <TodoAdd onAddItem={this.addItem}/>
        </div>
      );
  };
};