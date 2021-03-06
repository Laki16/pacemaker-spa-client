import React from 'react';
import classNames from 'classnames';

import AccessCode from 'components/overlay-contexts/access-code';
import Account from 'components/overlay-contexts/account';
import CreateChannel from 'components/overlay-contexts/create-channel';
import CreateUnit from 'components/overlay-contexts/create-unit';
import SubmitDocument from 'components/overlay-contexts/submit-document';
import SubmitPaper from 'components/overlay-contexts/submit-paper';
import EnterChannel from 'components/overlay-contexts/enter-channel';
import ModifyAccount from 'components/overlay-contexts/modify-account';
import Menu from 'components/overlay-contexts/overlay-menu';

import './Overlay.scss';

const Overlay = ({ visible, type, overlayHandler }) => {
  const goModifyAccount = () => {
    overlayHandler('MODIFY ACCOUNT');
  };

  let context = '';
  switch (type) {
    case 'MENU':
      context = <Menu visible={visible} changeHandler={overlayHandler} />;
      break;
    case 'MY ACCOUNT':
      context = (
        <Account
          visible={visible}
          moveToModify={goModifyAccount}
          changeHandler={overlayHandler}
        />
      );
      break;
    case 'MODIFY ACCOUNT':
      context = (
        <ModifyAccount visible={visible} changeHandler={overlayHandler} />
      );
      break;
    case 'CREATE CHANNEL':
      context = (
        <CreateChannel visible={visible} changeHandler={overlayHandler} />
      );
      break;
    case 'ENTER CHANNEL':
      context = (
        <EnterChannel visible={visible} changeHandler={overlayHandler} />
      );
      break;
    case 'ACCESS CODE':
      context = <AccessCode visible={visible} changeHandler={overlayHandler} />;
      break;
    case 'CREATE UNIT':
      context = <CreateUnit visible={visible} changeHandler={overlayHandler} />;
      break;
    case 'SUBMIT DOCUMENT':
      context = (
        <SubmitDocument visible={visible} changeHandler={overlayHandler} />
      );
      break;
    case 'SUBMIT PAPER':
      context = (
        <SubmitPaper visible={visible} changeHandler={overlayHandler} />
      );
      break;
    default:
  }
  return (
    <div className="Overlay">
      <div
        className={classNames('OverlayBackground', {
          Show: visible,
          Hide: !visible,
        })}
        onClick={() => overlayHandler()}
      ></div>
      <div
        className={classNames('Container', {
          Show: visible,
          Hide: !visible,
        })}
      >
        {context}
      </div>
    </div>
  );
};
export default Overlay;
