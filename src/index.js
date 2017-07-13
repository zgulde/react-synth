import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

Array.prototype.dropIf = function(f) {
  return this.filter((e, i, a) => ! f(e, i , a));
};

Array.prototype.first = function(n) {
  return typeof n === 'undefined' ? this[0] : this.slice(0, n);
};

Array.prototype.rest = function() {
  return this.slice(1);
};

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
