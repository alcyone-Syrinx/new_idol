import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <ul>
                <li>
                    <a href="/">home</a>
                </li>
                <li>
                    <a href="/idol">아이돌 검색</a>
                </li>
            </ul>
        )
    }
}

Header.getInitialProps = ({ query }) => {
    return query;
}

export default Header;