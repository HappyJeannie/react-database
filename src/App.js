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
import Login from './components/login/login'
import Register from './components/register/register'
import Forget from './components/Forget/forget'
import {currentUser , findAll , addItem ,doneItem ,delItem} from './components/leanCloud/leanCloud';

class App extends Component {
  constructor(){
    super()

    this.state = {
      newTodo : '',
      todoList : [],
      tips:'123',
      showToast:false,
      loginShow:false,
      registerShow:false,
      forgetShow:false,
      userStatus:{
        username:'',
        isLogin:false,
        userId:''
      }
    }
    currentUser().then(
      (res) => {
        if(res.status=== 200){
          this.setState({
            userStatus:{
              username: res.data.username,
              isLogin:true,
              userId:res.userId
            }
          })
          // let queryData = {
          //   tableName:"todoList",
          //   userId:res.userId,
          //   text:'测试内容'
          // }
          // addItem(queryData);
          let queryData1 = {
            userId:res.userId,
            tableName:'todoList'
          }
          findAll(queryData1).then((res)=> {
            let todoList = [];
            for(let i = 0;i<res.length;i++){
              let item = {
                id: res[i].id,
                idx : i,
                msg : res[i].attributes.text,
                isDelete : res[i].attributes.isDelete,
                hasDone : res[i].attributes.isDone,
                userId : res[i].attributes.userId
              };
              todoList.push(item);
            }
            this.setState({
              todoList:todoList
            })
          })
        }
      }
    )
    
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
        <Header userStatus={this.state.userStatus} hideModal={this.setModalStatus.bind(this)} signOut={this.setLoginStatus.bind(this)} onToast={this.showToast.bind(this)}></Header>
        <main>
          <div className="todoList">
            
              <TodoInput newTodo={this.state.newTodo} onSubmit={this.addTodo.bind(this)} onChange={this.changeTitle.bind(this)} onToast={this.showToast.bind(this)}></TodoInput>
            
            <h4>待办列表</h4>
            <ol>
              {todos}
            </ol>
          </div>
        </main>
        <Login status={this.state.loginShow}  hideModal={this.setModalStatus.bind(this)}  registSuccess={this.setLoginStatus.bind(this)} onToast={this.showToast.bind(this)}></Login>
        <Register status={this.state.registerShow} hideModal={this.setModalStatus.bind(this)} registSuccess={this.setLoginStatus.bind(this)} onToast={this.showToast.bind(this)}></Register>
        <Forget status={this.state.forgetShow} onToast={this.showToast.bind(this)}    hideModal={this.setModalStatus.bind(this)}></Forget>
        <Toast msg={this.state.tips} ifShow={this.state.showToast}></Toast>
        <Footer></Footer>
      </div>
    );
  }
  componentDidUpdate(){
  }
  addTodo(msg){
    let item = {
      idx: this.state.todoList.length,
      text: msg,
      status: null,
      isDelete: false,
      hasDone:false,
      id:parseInt(Math.random()*10000),
      userId : this.state.userStatus.userId
    }
    let query = item;
    query.tableName= 'todoList';
    addItem(query)
      .then((res)=>{
        this.showToast(this,"添加成功");
        this.state.todoList.push({
          idx: this.state.todoList.length,
          msg: msg,
          status: null,
          isDelete: false,
          hasDone:false,
          id:parseInt(Math.random()*10000),
          userId : this.state.userStatus.userId
        })
        this.setState({
          newTodo: '',
          todoList: this.state.todoList
        })
      })
    
    
  }
  changeTitle(event){
    this.setState({
      newTodo: event.target.value,
      todoList: this.state.todoList
    })
  }
  toggle(e,todo){
    todo.hasDone = !todo.hasDone
    this.setState(this.state);
    doneItem({'tableName':'todoList','todoId':todo.id,'isDone':todo.hasDone})
      .then((res) => {
        this.showToast(this,"标记成功");
      })

  }
  deleteItem(e,todo){
    todo.isDelete = true;
    this.setState(this.state);
    delItem({'tableName':'todoList','todoId':todo.id})
      .then((res) => {
        this.filterTodoList(todo.idx);
        this.showToast(this,"删除成功");
      })
  }
  filterTodoList(idx){
    let data = this.state.todoList;
    //return false;
    let newList = [];
    for(let i = 0; i< data.length;i++){
      if(i != idx){
        if(i>idx){
          data[i].idx -= 1;
        }
        newList.push(data[i]);
      }
    }
    console.log(newList);
    this.setState({
      todoList:newList
    })
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
  setModalStatus(e,status){
    this.setState({
      loginShow : status[0],
      registerShow : status[1],
      forgetShow : status[2]
    })
  }
  setLoginStatus(e,data){
    // 设置登录状态
    console.log('登录成功')
    console.log(data);
    this.setState({
      userStatus:data,
      registerShow:false,
      loginShow:false
    })
  }
}

export default App;
