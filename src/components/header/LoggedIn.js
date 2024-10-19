import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { logIn, logOut } from './helpers';

const LogInModal = ({
  showModal,
  setShowModal,
  credentials,
  setCredentials,
  dispatch,
}) => {
  const [mainBody, setMainBody] = useState(true);
  const handleLogin = async () => {
    const resp = await logIn(credentials, dispatch, setMainBody);
    if (resp === 'close') {
      handleCancel();
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setCredentials({ username: '', password: '' });
    setMainBody(true);
  };
  return (
    <Modal show={showModal}>
      {mainBody ? (
        <>
          <Modal.Header>Log In to Make Changes</Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='enter your username'
                  value={credentials.username}
                  onChange={(e) =>
                    setCredentials({ ...credentials, username: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='enter your password'
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleLogin}>Log In</Button>
            <Button variant='secondary' onClick={handleCancel}>
              Cancel
            </Button>
          </Modal.Footer>
        </>
      ) : (
        <>
          <Modal.Header>Invalid Credentials</Modal.Header>
          <Modal.Body>
            Credentials of name: `${credentials.username}` and password: `$
            {credentials.password}` are incorrect
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setMainBody(true)}>Try Again</Button>
            <Button variant='secondary' onClick={handleCancel}>
              Cancel
            </Button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
};

const LoggedIn = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.data.loggedIn);
  const [showModal, setShowModal] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleLogIn = () => {
    setShowModal(true);
  };

  const handleLogOut = () => {
    logOut(dispatch);
  };

  return (
    <>
      {loggedIn ? (
        <div>
          Welcom John
          <Button variant='light' size='sm' onClick={handleLogOut}>
            Log Out
          </Button>
        </div>
      ) : (
        <div>
          <Button variant='light' size='sm' onClick={handleLogIn}>
            Log In
          </Button>
        </div>
      )}
      <LogInModal
        showModal={showModal}
        setShowModal={setShowModal}
        credentials={credentials}
        setCredentials={setCredentials}
        dispatch={dispatch}
      />
    </>
  );
};
export default LoggedIn;
