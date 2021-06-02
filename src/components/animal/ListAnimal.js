import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/action';
import './index.css';
import axios from 'axios';
import Header from './../header/Header';
class ListAnimal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
        }

    }
    getAnimalList = (page) => {
        let token = localStorage.getItem('user');
        this.props.getAnimalPending();
        axios.get("https://api.petfinder.com/v2/animals?page=" + page, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },

        }).then(data => {
            console.log(data);
            this.props.getAnimalSuccess(data.data);

        })
            .catch((error) => {
                console.error('Errors:', error);
                this.props.getAnimalFail()
            });
    }
    componentDidMount() {
        this.getAnimalList(1);
    }
    prevPage = () => {
        if (this.state.page > 1) {
            this.getAnimalList(this.state.page - 1);
            this.setState({ page: this.state.page - 1 });
        }
    }
    nextPage = () => {
        if (this.state.page < this.props.totalPages)
            this.getAnimalList(this.state.page + 1);
        this.setState({ page: this.state.page + 1 });
    }
    changePage = (e) => {
        if (e.key == "Enter" && e.target.value > 0 && e.target.value <= this.props.totalPages) {
            this.getAnimalList(e.target.value);
            this.setState({ page: Number.parseInt(e.target.value) });
        }
        console.log(e.target.value);

    }

    render() {
        return (
            <div className="animal-l">
                {
                    this.props.loading == true ? <div className="loading"><img src="https://i.pinimg.com/originals/71/3a/32/713a3272124cc57ba9e9fb7f59e9ab3b.gif" /></div> :
                        <div>
                            <Header />
                            <h1 className='title-list'>List Animals</h1><br />
                            <div className="list-animals">
                                {
                                    this.props.animals?.length > 0 ? this.props.animals.map(val => (
                                        <div className="animal-item" key={val.id}>
                                            <div className="img-item">

                                                <img src={val.photos[0]?.medium || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEXd3d2amprg4OCXl5e9vb2UlJTFxcWnp6efn5/S0tLW1tavr6/IyMjPz8+srKy3t7cOBfakAAADkUlEQVR4nO2c23aDIBAAFcRbkub//7ZJ2ygqqDHIrTPPxnWOZt1FoCgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAdiF841uvqyu/1J1PSVG3SvpGtbU3RfGlyhCoL0+K4ksGESxL6UdR1GHu4BPl5UEVbTDBsmx9GHbhbuHjJnbnC4o61L/wifTwmIpKM/T0otACVl4NZevpbd/KMIby7q1iu8sghl7y2l/QNoShj2BD0LvHoGEMfQbFMP2gGH54dnMzn4uhEN21qq6GZj4PQ3G7/FWB5eU2O3UOhqJv1FibqaafnDwDw0fHMmlZ5LSJSN9QVIumU+mnT97QODCij1gkb9gbm2rZnxrUygnBRGM2bIYAqRveLCM/6nZiUDvug4mLZeRHXl4RUjc0+z3JxLCzDt7J19hh2obiaje8ipOCrl6Qc8PKblhheAY8pe+Tfab5B2+L/N/4+Vdt/6DyTrx72jPdJ+UOWBRVq1Sz9eU23VEM0ZU/R6tm68BUR6KGP5iWNSynTXQ0cZyYsj3ZJ8UR4clbYHx9249PbVR/VqvI+57MlNKXmUV+VHsUPwzqgr3BxLIWU4cvL0pDU51yeOJdlIZLv6fi9dgFRmhoKaZLOX8PuAzqiF3BxklMC8X+yCVGZ2goM0d64y+28nJchoY0qmP6QXVf/YfGZmhu94bntJ2fsXiUpHK1OI/NcGOa9KwKf/UfC/P3grpjM5gtjVoUx+HSlf4jKkN7GtUUxypcT0p2xZgM961VGBTFRT/c2mJFZChu23fwT1H85Jjp4bb+IyLD9TSqu7R1193l/HBL/xGR4RurTaaT8AdF87Mfi6GLFVHG/iMWwz1pdIeiobqJxNDVki+17D/iMBT274Bvsmyx4jA097zHFOctVhyGThft9TuDejR0vLC03RXUp+HKhIpDzBqN8Ibi6nrZ5bQKD27oLo1aFIMbOkyjmqLWaIQ23O55jynqXWRQQ+tskY8Vh0YjrOHq0OFnDI1GUEP3aVRXrIUxqE9DsbvnPab422gEvYdn+pWvRiOg4UlpVEN2IqThaWlUV3w0GsEMT0yjOn04wzPTqE4ww3PT6IhsQxl626hGNkEMS093cBLLr2EIMMQQQwwxxBBDDDHEEMNsDLPf+zL//Uv/wR60+e8jnP9e0EX++3kX+e/JXuS/r/6vpGf86gEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEC6fAP2rj9/Wdk3nwAAAABJRU5ErkJggg=="} alt="" />

                                            </div>
                                            <div className="bottom-item">
                                                <div className="name">{val.name}</div>
                                                <div className="subname">{val.type}</div>
                                                <div className="gender">{val.gender}</div>
                                                <div className="description">
                                                    <p className="">{val.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )) : <h4>Không có dữ liệu!</h4>
                                }
                            </div>
                            {this.props.totalPages > 0 &&
                                (
                                    <div className="pagination">
                                        <ul>
                                            <li onClick={() => this.prevPage()}><i className="fa fa-chevron-left" aria-hidden="true"></i></li>
                                            <li><input defaultValue={this.state.page} onKeyDown={e => this.changePage(e)}></input> of <span>{this.props.totalPages}</span></li>
                                            <li onClick={() => this.nextPage()} ><i className="fa fa-chevron-right" aria-hidden="true"></i></li>
                                        </ul>

                                    </div>

                                )
                            }
                        </div>
                }
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        animals: state?.animal,
        loading: state?.loading,
        totalPages: state?.totalPages
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        getAnimalPending: () => {
            dispatch(actions.getAnimalPending())
        },
        getAnimalSuccess: (data) => {
            dispatch(actions.getAnimalSuccess(data))
        },
        getAnimalFail: () => {
            dispatch(actions.getAnimalFail())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListAnimal);