import React, { Component } from 'react'
import Header from './Header'
import "../resources/main.scss";

class Layout extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div >
                <Header />
                <div className="main-body">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Layout;