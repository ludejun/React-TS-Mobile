import * as React from 'react';
import { Link } from 'react-router-dom';
import Count from './components/Count';
import logo from './logo.svg';
import './App.less';

interface IAppProps {
  count?: number;
  increment?: () => void;
  incrementAsync?: () => void;
}

export default class App extends React.Component<IAppProps, {}> {
  constructor(props: IAppProps) {
    super(props);
  }

  render() {
    const { increment, incrementAsync } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <p>计数中：{this.props.count}</p>
          {/* <Count onAddClick={increment} onAddAsyncClick={incrementAsync} /> */}

          <Link to="/login" style={{ marginTop: 20 }}>
            到登陆页
          </Link>
        </header>
      </div>
    );
  }
}
