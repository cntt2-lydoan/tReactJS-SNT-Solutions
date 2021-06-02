import React, { Component } from 'react';
import axios from 'axios';
import './index.css';
import { connect } from 'react-redux';
import * as actions from '../../redux/action';
import input from './image/input-login.png';
import picture from './image/login-dc.png';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            secret: '',
            loginFailmess: ''
        }
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleLogin = () => {
        axios.post("https://api.petfinder.com/v2/oauth2/token", {

            "client_id": this.state.id,
            "client_secret": this.state.secret,
            "grant_type": "client_credentials"

        }).then(response => {
            console.log('response >>>', response);
            localStorage.setItem("user", response.data.access_token);
            this.props.loginSuccess(response.data.access_token)

        }).catch(error => {
            console.log('response >>>', error);
            this.setState({
                id: '',
                secret: '',
                loginFailmess: 'Vui lòng đăng nhập lại!'
            })
        })
    }
    render() {
        const { id, secret, error } = this.state;
        console.log(this.state);
        return (
            <div className="f-login height-100">

                <div className="">

                    <form className="form">
                        <div className="form-t">
                            <img src={picture} />
                        </div>
                        <div className="form-b">
                            LOGIN <br /> <br />
                            <div className="">
                                <input className="f-input" value={id} onChange={(event) => this.handleChange(event)} type="name" name="id" placeholder="Id" />
                            </div><br />
                            <div>
                                <input className="f-input" value={secret} type="password" onChange={(event) => this.handleChange(event)} name="secret" placeholder="Secret"></input>
                            </div><br />
                            <span>{this.state.loginFailmess}</span><br /> <br />

                            <input className="f-button" type="button" value="Login" onClick={this.handleLogin} />
                        </div>


                    </form>
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
        loginSuccess: (token) => {
            dispatch(actions.isAuthenAction(token))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);