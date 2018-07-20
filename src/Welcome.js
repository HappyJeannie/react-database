import React from 'react';

class Welcome extends React.Component{
  constructor() {
    super();
    this.state = {
      date: new Date().toLocaleTimeString()
    }
    console.log('我已经在 constructor 里将 props 和 state 初始化好了')
  //   setInterval(()=>{ // 搜索「JS 箭头函数 MDN」
  //     this.setState({
  //      date: new Date().toLocaleTimeString() // 更新 date
  //    })
  //  },1000)
  }
  componentWillMount(){
    console.log('运行到这里的话，说明马上就要运行 render 了')
  }

  render(){
    console.log('嗯，这里是 render')
    return <h1>Hello,{this.props.name} Component ， {this.props.age} years old , time : {this.state.date}</h1>
  }
  componentDidMount(){
    console.log('已经挂载到页面里了')
  }
}

// function Welcome(props) {
//   return <h1>Hello, {props.name}</h1>;
// }
export default Welcome