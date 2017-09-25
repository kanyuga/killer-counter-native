import React, {Component} from 'react';
import {foulPort, port} from "../../actions";
import {connect} from "react-redux";
import BallGrid from "./BallGrid";

let BallGridContainer = (props) => (<BallGrid { ...props }/>);

const mapStateToProps = state => ({ balls: state.balls });

const mapDispatchToProps = (dispatch, ownProps) => ({
  onPress: number => ownProps.legal ? dispatch(port(number)) : dispatch(foulPort(number))
});

BallGridContainer = connect(mapStateToProps, mapDispatchToProps)(BallGridContainer);

export default BallGridContainer;

