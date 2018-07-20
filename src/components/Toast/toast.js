import './toast.css';

import React , {Component} from 'react';

class Toast extends Component{
  render(){
    return (
      <div className={this.props.ifShow?"active Toast" :"Toast"}>
        {this.props.msg}
      </div>
    )
  }
}

export default Toast