import React from 'react';
import './user-drawer-style.scss';
import './user-drawer-theme.scss';

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

import { ImMenu } from 'react-icons/im';

import Auth from '../../utils/auth';
import { useNavigate } from 'react-router-dom';

const UserDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const navigate = useNavigate();

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
      <Button ref={btnRef} colorScheme="green" className="drawer-button" onClick={onOpen}>
        <ImMenu />
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
          <DrawerHeader>4 Monitor Fitness</DrawerHeader>

          <DrawerBody>
          {Auth.loggedIn() ? 
            ( 
            <div>
              <Button colorScheme='teal' onClick={onWorkoutsBtnClick}>My Workouts</Button>
              <Button colorScheme='green' onClick={onAnalyticsBtnClick}>Analytics</Button>
              <Button colorScheme='yellow' onClick={onUserAnalyticsBtnClick}>My Analytics</Button>
            </div>
            ) :
            ( 
            <div>
              <h2>Your fitness journey is only a few clicks away!
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