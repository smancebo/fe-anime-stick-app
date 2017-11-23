import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { BrowserRouter } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import Main from './app/main'


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
    <App></App>
</BrowserRouter>,
    document.getElementById('root'));

//=======