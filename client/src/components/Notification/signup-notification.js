import React from 'react';
import './notification-style.scss';

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Heading
} from '@chakra-ui/react'
import { GiWeightLiftingUp } from 'react-icons/gi';

import store from '../../utils/store';

function SignupNotification() {
const [isOpen, setIsOpen] = React.useState(false)
  const onClose = () => setIsOpen(false)
  const cancelRef = React.useRef()

  const unsubscribe = store.subscribe(() => {
      console.log('State after dispatch: ', store.getState())
      if (store.getState().signup_notification.value === true) {
          setIsOpen(true);
      }
  })

  const closeUserDrawer = () => {
    onClose(true);
    window.location.assign('/statistics');
  }

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay className="signup-alert-dialog-container">
          <AlertDialogContent className='signup-alert-dialog-content'>
            <AlertDialogHeader className='signup-alert-dialog-header' fontSize='lg' fontWeight='bold'>
              <Heading size='xl'>Congratulations</Heading>
            </AlertDialogHeader>

            <AlertDialogBody>
              <p>Thank you for signing up with 4 Monitor Fitness.</p>
              <br />
              <p>Taking the first step towards developing a healthier lifestyle is never easy, and you just did it!</p>
              <br />
              <p>Now let's go create some PR's!</p>
            </AlertDialogBody>

            <AlertDialogFooter className="signup-alert-dialog-footer">
              <Button className="signup-alert-dialog-button" colorScheme='green' onClick={closeUserDrawer} ml={3}>
                <GiWeightLiftingUp> Get Started!</GiWeightLiftingUp>
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default SignupNotification;