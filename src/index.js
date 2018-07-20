import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Welcome from './Welcome'
import Question from './Question'

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

// function setDom(){
//   const element = (
//     <div>
//       <h1>summer</h1>
//       <h2>time:{new Date().toLocaleTimeString()}</h2>
//     </div>
//   )
//   ReactDOM.render(
//     <Welcome name="jude" age="20"></Welcome>,
//     document.getElementById('root')
//   );
// }

// setDom();

