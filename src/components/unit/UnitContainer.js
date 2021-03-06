import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { update } from 'store/modules/creators/unit';
import { show } from 'store/modules/creators/modal';
import unitDocument from 'store/modules/action/document';

import Unit from './view/Unit';

const documentHandler = (state, setState) => (type) => (data) => {
  switch (type) {
    case 'title':
      setState({
        ...state,
        title: data,
      });
      return;
    case 'body':
      setState({
        ...state,
        body: data,
      });
      return;
    default:
      return;
  }
};

const onAnswerHandler = (state, setState) => (index, answer) => () => {
  setState({
    ...state,
    questions: state.questions.map((question, i) =>
      i === index ? { ...question, user_answer: answer } : question
    ),
  });
};

const onVerifyHandler = (state, setState) => (id) => () => {
  setState({
    ...state,
    questions: state.questions.map((question) =>
      question.id === id
        ? { ...question, verified: !question.verified }
        : question
    ),
  });
};

const createDocument = (createDocs) => (token, channel, unit) => (
  callbackHandler
) => () => {
  createDocs({ token, channel, unit }, callbackHandler);
};

const updateDocument = (updateDocs) => (token, document) => (
  callbackHandler
) => () => {
  updateDocs({ token, document }, callbackHandler);
};

const updatePaper = (updateHandler) => (state, action) => () => {
  updateHandler({
    ...state,
    unit: {
      ...state.unit,
      paper: action,
    },
  });
};

// const editDocument = (token, document) => () => {};

const verifyPaper = (updateHandler) => (
  state,
  local,
  updateLocalState
) => () => {
  const questions = local.questions.filter((question) => question.verified);

  updateLocalState({
    ...local,
    questions: questions,
  });

  updateHandler({
    ...state,
    unit: {
      ...state.unit,
      paper: {
        ...local,
        questions: questions,
      },
    },
  });
};

const UnitContainer = ({
  type,
  channelId,
  unitId,
  tab,
  data,
  token,
  update: updateHandler,
  show: showModalHandler,
  createDocs,
  updateDocs,
}) => {
  const history = useHistory();
  if (!data.unit.isOpened) history.goBack();
  const [document, setDocument] = useState(data.unit.document);
  const [paper, setPaper] = useState(data.unit.paper);

  useEffect(() => {
    setDocument(data.unit.document);
    setPaper(data.unit.paper);
  }, [data.unit.document, data.unit.paper]);

  return (
    <Unit
      type={type}
      channel={data.channel}
      unit={data.unit}
      tab={tab}
      document={document}
      paper={paper}
      showModalHandler={showModalHandler}
      createDocument={createDocument(createDocs)(token, channelId, unitId)}
      updateDocument={updateDocument(updateDocs)(token, document)}
      documentHandler={documentHandler(document, setDocument)}
      updatePaper={updatePaper(updateHandler)(data, paper)}
      verifyPaper={verifyPaper(updateHandler)(data, paper, setPaper)}
      onVerifyHandler={onVerifyHandler(paper, setPaper)}
      onAnswerHandler={onAnswerHandler(paper, setPaper)}
    />
  );
};

const mapStateToProps = ({ account, unit }) => ({
  token: account.token,
  data: unit,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      show,
      update,
      createDocs: unitDocument.create,
      updateDocs: unitDocument.update,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UnitContainer);
