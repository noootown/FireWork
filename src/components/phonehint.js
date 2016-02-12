'use strict';
import React from 'react';

class PhoneHint extends React.Component{
    constructor(){
        super();
    }
    render(){
        return(
                <div className={'phonehint-div'}>
                    <div className={'title'}></div>
                    <button id={'navbarAboutBtn'} className={'navbarBtn'} onClick={this.}>Watch</button>
                </div>
              );
    }
}
export default PhoneHint;
