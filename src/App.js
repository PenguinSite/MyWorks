import React from 'react';
import Layout from './hoc/Layout/Layout'
import Quiz from './containers/Quiz/Quiz'
import {Route, Switch} from 'react-router-dom'
import QuizList from './containers/QuizList/QuizList'
import QuizCreator from './containers/QuizCreator/QuizCreator'
import Auth from './containers/Auth/Auth'
import Registration from "./containers/Registration/Registration";

function App() {
    return (
        <Layout>
            <Switch>
                <Route path='/auth' component={Auth}/>
                <Route path='/registration' component={Registration}/>
                <Route path='/quiz-creator' component={QuizCreator}/>
                <Route path='/quiz/:id' component={Quiz}/>
                <Route path='/' exact component={QuizList}/>
            </Switch>
        </Layout>
    );
}

export default App;
