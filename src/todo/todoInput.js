import React from 'react';

class TodoInput extends React.Component{
  render(){
    return <div className="input-box"><input type="text" value={this.props.newTodo} placeholder="新建待办" onKeyPress={this.submit.bind(this)} onChange={this.changeTitle.bind(this)}/><i className="icon iconfont icon-icon_add" onClick={this.clickSubmit.bind(this)}></i></div>
  }
  submit(e){
    if(e.key === 'Enter'){
      console.log(111);
      console.log()
      if(e.target.value === ''){
        console.log(123);
        this.props.onToast(e,'新增内容不能为空');
        return false;
      }
      this.props.onSubmit(e.target.value);
      
    }
  }
  changeTitle(e){
    this.props.onChange(e);
  }
  clickSubmit(e){
    let target = e.target.previousSibling;
    if(target.value.length === ''){
      this.props.onToast(e,'新增内容不能为空');
      return false;
    }
    this.props.onSubmit(target.value);
  }
}

export default TodoInput