import React from 'react';
import './user-drawer-style.scss';

import {
    Button,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Heading,
    useDisclosure
} from '@chakra-ui/react';

import { ImMenu } from 'react-icons/im';

import Auth from '../../utils/auth';
import { useNavigate } from 'react-router-dom';

const UserDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const navigate = useNavigate();
  let username = '';

  if (Auth.loggedIn()) {
    username = Auth.getProfile().data.username;
  }

  const logout = (e) => {
    
    onClose();
    e.preventDefault();
    Auth.logout();
  }

  const onWorkoutsBtnClick = () => {
    navigate('/userworkouts')
    onClose();
  }

  const onAnalyticsBtnClick = () => {
    navigate('/analytics')
    onClose();
  }

  const onUserAnalyticsBtnClick = () => {
    navigate('/analytics/user')
    onClose();
  }

  return (
    <>
      <Button ref={btnRef} colorScheme="green" className="drawer-btn" onClick={onOpen}>
        <ImMenu className="close-btn-icon" /> 4 Monitor Fitness 
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent className="drawer-content">
          <DrawerCloseButton />
          <DrawerHeader>
            <Heading color="#023480" fontSize="3xl" fontWeight="bold">4 Monitor Fitness</Heading>
            {Auth.loggedIn() ? (
              <p>Logged in as {username}</p>
            ) : null}
          </DrawerHeader>

          <DrawerBody>
          {Auth.loggedIn() ? 
            ( 
            <div>
              <Button className="drawer-btn nD-btn" colorScheme='teal' onClick={onWorkoutsBtnClick} size='lg'>My Workouts</Button>
              <Button className="drawer-btn nD-btn" colorScheme='green' onClick={onAnalyticsBtnClick} size='lg'>Analytics</Button>
              <Button className="drawer-btn nD-btn" colorScheme='yellow' onClick={onUserAnalyticsBtnClick} size='lg'>My Analytics</Button>
            </div>
            ) :
            ( 
            <div>
              <h2>
                  Your fitness journey is only a few clicks away!
                <br />
                  Please login to find out what you're missing!
              </h2>
            </div>
            )}
          </DrawerBody>

          <DrawerFooter>
            {Auth.loggedIn() ? (
              <Button colorScheme='red' variant='outline' mr={3} onClick={logout}>
                Logout
              </Button>
            ) : null }

          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default UserDrawer;