import React, { useState } from 'react';
import './settings-page-style.scss';
import './settings-page-theme.scss';

import Login from '../Login/login';
import Signup from '../Signup/signup';

import {
    Button,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure
} from '@chakra-ui/react';

import { HamburgerIcon } from '@chakra-ui/icons';

import Auth from '../../utils/auth';

const SettingsPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [disableLoginBtn, setDisableLoginBtn] = useState(false);
  const [disableSignupBtn, setDisableSignupBtn] = useState(false);

  const onLoginClick = () => {
      setShowSignupForm(false);
      setShowLoginForm(true);
      setDisableLoginBtn(true);
      setDisableSignupBtn(false);
    }

  const onSignupClick = () => {
      setShowLoginForm(false);
      setShowSignupForm(true);   
      setDisableSignupBtn(true); 
      setDisableLoginBtn(false);
    }

  return (
    <>
      <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
        <HamburgerIcon color='black' />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>4-Monitor-Fitness</DrawerHeader>

          <DrawerBody>
          {Auth.loggedIn() ? 
            ( 
            <div>
              <Button colorScheme='red' onClick={Auth.logout}>Logout</Button>
              <h3>What other things do we want here after login?</h3>
            </div>
            ) :
            ( <div>
                <div className='formBtns'>
                  <Button className='loginBtn' colorScheme='green' disabled={disableLoginBtn} onClick={onLoginClick} size='xs'>Login</Button>
                  <Button className='signupBtn' colorScheme='yellow' disabled={disableSignupBtn} onClick={onSignupClick} size='xs'>Signup</Button>
                </div>
                { showLoginForm ? <Login /> : null }
                { showSignupForm ? <Signup /> : null }
              </div> )}
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default SettingsPage;