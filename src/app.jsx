import React from 'react';
import ReactDOM from 'react-dom';
import Navigation from './components/Navigation';
//import {CLIEngine} from 'eslint';
//const cli = new CLIEngine();

import 'normalize.css';

import "styles/base/_main.sass"  // Global styles
import "styles/base/_common.sass"  // Global styles
import styles from "./app.sass"  // Css-module styles

class Launcher extends React.Component {

  componentWillMount() {
    this.childWindow = window.open('', '_blank', 'width=500,height=800')
    this.newDiv = this.childWindow.document.createElement("div");
    this.childWindow.document.body.appendChild(this.newDiv);
  }

  componentWillUnmount() {
    if (this.childWindow) {
      this.childWindow.close();
    }
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.newDiv,
    );
  }
}

class App extends React.PureComponent {
  constructor() {
    super();
    this.hideHandler = this.handler.bind(this, false);
    this.showHandler = this.handler.bind(this, true);
  }

  state = {
    showLauncher: true,
  }

  handler(showLauncher) {
    this.setState({showLauncher})
  }

  render() {
    const {showLauncher} = this.state;

    return (
      <div className='app'>
        {
          showLauncher ? (
            <Launcher>
              <button onClick={this.hideHandler}>Testing</button>
            </Launcher>
          ) : (
          <div>
            Window Closed
              <button onClick={this.showHandler}>Wanna Try Again?</button>
          </div>
          )
        }
      </div>
    )
  }
}

export default App;
