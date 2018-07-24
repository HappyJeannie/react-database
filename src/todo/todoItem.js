import React , {Component} from 'react';

class TodoItem extends Component{
  render(){
    return <div className={this.props.todo.hasDone?'complete':""} ><i className="iconfont icon-icon_right_fill" onClick={this.toggle.bind(this)}></i><span>{this.props.todo.idx+1} - {this.props.todo.msg}</span><i className="iconfont icon-icon_delete" onClick={this.deleteItem.bind(this)}></i></div>
  }
  toggle(e){
    this.props.onToggle(e,this.props.todo);
  }
  deleteItem(e){
    this.props.onDelete(e,this.props.todo);
  }
}

export default TodoItem