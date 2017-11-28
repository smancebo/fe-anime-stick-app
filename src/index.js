import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { BrowserRouter } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import Main from './app/main'
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import reducers from './reducers';

const store = createStore(reducers);

class App extends React.Component {
    render() {
        return (
            <div>
                <Main></Main>
            </div>
        )
    }
}




//==================

ReactDOM.render(<BrowserRouter>
    <Provider store={store}>
        <App></App>
    </Provider>
</BrowserRouter>,
    document.getElementById('root'));

//=======