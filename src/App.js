import 'normalize.css';
import './css/reset.css';
import './css/iconfont.css';

import React, { Component } from 'react';
import './App.css';
import TodoInput from './todo/todoInput';
import TodoItem from './todo/todoItem';
import Footer from './components/Footer/footer'
import Header from './components/Header/header'
import Toast from './components/Toast/toast'
import { save , load } from './localStore';

class App extends Component {
  constructor(){
    super()

    this.state = {
      newTodo : '',
      todoList : load('todoList') || [{}],
      tips:'123',
      showToast:false
    }
  }

  render() {
    let todos = this.state.todoList.filter(((item) => {
      return item.isDelete === false
    })).map((item,index)=>{
      return (
          <li key={item.id}>
            <TodoItem todo={item} onToggle={this.toggle.bind(this)} onDelete={this.deleteItem.bind(this)}></TodoItem>
          </li>
      )
    })


    return (
      <div className="App">
        <Header></Header>
        <main>
          <div className="todoList">
            
              <TodoInput newTodo={this.state.newTodo} onSubmit={this.addTodo.bind(this)} onChange={this.changeTitle.bind(this)} onToast={this.showToast.bind(this)}></TodoInput>
            
            <h4>待办列表</h4>
            <ol>
              {todos}
            </ol>
          </div>
          
        </main>
        <Toast msg={this.state.tips} ifShow={this.state.showToast}></Toast>
        <Footer></Footer>
      </div>
    );
  }
  componentDidUpdate(){
    save('todoList',this.state.todoList)
  }
  addTodo(msg){
    this.state.todoList.push({
      id: this.state.todoList.filter((item) => item.isDelete === false).length + 1,
      msg: msg,
      status: null,
      isDelete: false
    })
    this.setState({
      newTodo: '',
      todoList: this.state.todoList
    })
    
  }
  changeTitle(event){
    this.setState({
      newTodo: event.target.value,
      todoList: this.state.todoList
    })
  }
  toggle(e,todo){
    todo.status = todo.status === 'complete' ? '' : 'complete';
    this.setState(this.state);
  }
  deleteItem(e,todo){
    todo.isDelete = true;
    this.setState(this.state);
    
  }
  showToast(e,msg){
    console.log('展示弹窗')
    this.setState({
      tips:msg,
      showToast:true
    })
    setTimeout(()=>{
      this.setState({
        showToast:false
      })
    },1000)
  }
}

export default App;
