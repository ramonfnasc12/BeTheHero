import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profiles';
import NewIncident from './pages/NewIncidents';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon}/>
                <Route path="/register" exac component={Register}/>
                <Route path="/profile" exac component={Profile}/>
                <Route path="/incidents/new" exac component={NewIncident}/>
            </Switch>
        </BrowserRouter>
    );
}