import React, { Component } from 'react';

import './todo-add.css';

export default class TodoAdd extends Component {
  constructor(){
    super();
    this.state = {value: ''}   
  }

  handleChange = (event) => {
    this.setState({value: event.target.value})
  };
  
  render(){
    return (
      <div className='add-panel'>
          <input type="text"
                  className="form-control add-input"
                  placeholder="type to add" 
                  value={this.state.value}
                  onChange={this.handleChange}/>
          <button type="button"
                  className="btn btn-info"
                  onClick={()=>{ if (this.state.value.length > 0) {this.props.onAddItem(this.state.value)}}}>Add to TodoList</button>
      </div>
    );
  }
};