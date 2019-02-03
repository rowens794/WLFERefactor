import React, { Component } from 'react';
import { MyContext } from '../ContextProvider/ContextProvider';
import SubHeaderBar from './SubHeaderBar';

class HeaderBar extends Component {
    render() {
        return (
            <MyContext.Consumer>
                {(context) => (
                    <SubHeaderBar context={context} />
                )}
            </MyContext.Consumer>
        );
    }
}

export default HeaderBar;