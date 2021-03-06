import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import EnterChannel from './view/EnterChannel';
import { enterChannel } from 'store/modules/action/board';

const title = 'INTO MY NEW CHANNEL';
const info = 'ENTER YOUR ACCESS CODE';

const onChangeHandler = (state, setState) => (data) => {
  setState({
    ...state,
    code: data,
  });
};

const EnterChannelContainer = (props) => {
  const [state, setState] = useState({
    code: '',
  });

  const onEnterHandler = (token, code) => () => {
    props.changeHandler();
    props.enter(token, code);
  };
  return (
    <EnterChannel
      show={props.visible}
      title={title}
      info={info}
      onOverlayHandler={props.changeHandler}
      onChangeHandler={onChangeHandler(state, setState)}
      onEnterHandler={onEnterHandler(props.token, state.code)}
    />
  );
};

const mapStateToProps = ({ account }) => ({
  token: account.token,
});

const mapDispatchToProps = (dispatch) => ({
  enter: (token, code) => dispatch(enterChannel({ token, code })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EnterChannelContainer);
