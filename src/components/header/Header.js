import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/action';
import './index.css';
import logout from './image/icon-dog.png'
class Header extends Component {
    constructor(props) {
        super(props);

    }

    handleLogout = () => {
        this.props.logoutSuccess();
        localStorage.removeItem("user");
    }
    render() {
        return (
            <div className="header">
                <div className="h-list">
                    <div onClick={this.handleLogout}>
                        <img src={logout} />
                        <span
                            className="btn-logout"
                            type="button"
                        >Logout</span>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {

    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        logoutSuccess: () => {
            dispatch(actions.noAuthenAction())
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);