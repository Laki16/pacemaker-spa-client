import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Newspeed from './view/Newspeed';
import { fetchNewspeed } from 'store/modules/action/newspeed';

const NewspeedContainer = (props) => {
  return <Newspeed peeds={props.peeds} fetchNewspeed={props.fetchNewspeed}/>;
};

const mapStateToProps = (state) => {
  return {
    peeds: state.newspeed.peeds,
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchNewspeed }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewspeedContainer);
