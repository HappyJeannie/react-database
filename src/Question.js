import React from 'react';

class Question extends React.Component{
  render(){
    return <div>
      <div class='item'>
        <h3>1、webpack 代码压缩</h3>
        <p>在webpack 4.x 中，只需要在 package.json 的脚本指令中加入环境参数会自动打包打包压缩代码。如在 build 中执行 "webpack --mode=production"，打包出来的代码就是已经压缩过的</p>
      </div>
      <div class='item'>
        <h3>2、"build": "webpack -p" 中 -p 的含义</h3>
        <p>其中 p 是 production 的简写，实现的功能与问题一相同</p>
      </div>
      <div class='item'>
        <h3>3、将 Hello World 部署成功</h3>
        <p><a href="https://happyjeannie.github.io/react-list/build/index.html">链接</a></p>
      </div>
      <div class='item'>
        <h3>4、import 、 export 、export default 的 区别</h3>
        <p>
          <ul>
            <li><strong>1) export 与 import </strong></li>
            <li>这两个是 ES6 模块的语法</li>
            <li>export 用于对外输出本模块的接口（一个文件可以理解为一个模块）</li>
            <li>import 用于在一个模块中加载另一个含有 export 接口的模块</li>
            <li>export 命令定义了模块对外的接口以后，其他的 JS 文件就可以通过 import 命令加载这个模块</li>
            <li><strong>2) export 与 export default </strong></li>
            <li>export与export default均可用于导出常量、函数、文件、模块等</li>
            <li>可以在其它文件或模块中通过import+(常量 | 函数 | 文件 | 模块)名的方式，将其导入</li>
            <li>在一个文件或模块中，export、import可以有多个，export default仅有一个</li>
            <li>通过export方式导出，在导入时要加{ }，export default则不需要</li>
          </ul>
        </p>
      </div>
    </div>
  }
  
}

export default Question