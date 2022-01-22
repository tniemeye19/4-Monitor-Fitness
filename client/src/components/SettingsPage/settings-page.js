import React from 'react';
import './settings-page-style.scss';
import './settings-page-theme.scss';

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

const SettingsPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  const logout = () => {
    Auth.logout();
  }

  const onStatisticsClick = (e) => {
    
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
              <Button colorScheme='teal' onClick={onStatisticsClick}>Statistics</Button>
              <h3>What other things do we want here after login?</h3>
            </div>
            ) :
            ( 
            <div>
              <h2>Please login or signup to have access to this conent.</h2>
            </div>
            )}
          </DrawerBody>

          <DrawerFooter>
            {Auth.loggedIn() ? (
              <Button colorScheme='red' variant='outline' mr={3} onClick={onClose && logout}>
                Logout
              </Button>
            ) : null }

          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default SettingsPage;