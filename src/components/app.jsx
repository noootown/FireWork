'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Main from './main';

if (typeof window !== 'undefined') {
    window.onload = function() {
        ReactDOM.render(<Main />, document.getElementById('content'));
    };
}
