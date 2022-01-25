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

import { GrFan } from 'react-icons/gr';

import Auth from '../../utils/auth';
import { useNavigate } from 'react-router-dom';

const UserDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const navigate = useNavigate();

  const logout = () => {
    onClose();
    Auth.logout();
  }

  const onWorkoutsBtnClick = () => {
    navigate('/workout')
    onClose();
  }

  return (
    <>
      <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
        <GrFan />
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
              <h3>What other things do we want here after login?</h3>
            </div>
            ) :
            ( 
            <div>
              <h2>Your fitness journey is only a few clicks away! Please login to see what you're missing out on!</h2>
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