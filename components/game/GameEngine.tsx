'use client';
import React, { Fragment, useEffect, useRef } from 'react';
import {
  Button,
  Stack,
  VStack
} from '@chakra-ui/react';
import { PageSlideFade } from 'components/shared/animations/page-transitions';
import Header from 'components/shared/header';
import PageLayout from 'components/layouts/pageLayout';
import Link from 'next/link';
import { Unity, useUnityContext } from 'react-unity-webgl';
import { UserAuth } from '../../configs/AuthContext';

const TURQUOISE = '#06b6d4';
const unityContextLocation = 'Unity-WebGl-Build/Build';

export default function GameEngine() {
  const { user, currentuser ,SetGameState } = UserAuth();
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const {
    unityProvider,
    sendMessage,
    loadingProgression,
    isLoaded,
    requestFullscreen 
  } = useUnityContext({
    loaderUrl: `${unityContextLocation}/Monterya_WebBuild.loader.js`,
    dataUrl: `${unityContextLocation}/Monterya_WebBuild.data`,
    frameworkUrl: `${unityContextLocation}/Monterya_WebBuild.framework.js`,
    codeUrl: `${unityContextLocation}/Monterya_WebBuild.wasm`
  });

  useEffect(() => {
    if (isLoaded) {
      // sendMessage('FirbaseCtrl', 'SetUserId', playerinfo);
      sendMessage('#ClientService', 'SetUserId', currentuser.userID);
      SetGameState(true);
    }
  }, [isLoaded, sendMessage, user, SetGameState]);

  const handleClickInside = () => {
    if (isLoaded) {
      // console.log('Clicked inside the game area');
      sendMessage('FirbaseCtrl', 'GainFocus');
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (isLoaded && gameContainerRef.current && !gameContainerRef.current.contains(event.target as Node)) {
        // console.log('Clicked outside the game area');
        sendMessage('FirebaseCtrl', 'LoseFocus');

        const unityCanvas = document.getElementById('unityCanvas') as HTMLCanvasElement;
        if (unityCanvas) {
            unityCanvas.blur();
            document.body.focus();
        } else {
            console.warn('Unity canvas not found');
        }
    }
};

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLoaded]);

  useEffect(() => {
    const gameContainer = gameContainerRef.current;
    if (gameContainer) {
      gameContainer.addEventListener('click', handleClickInside);
    }
    return () => {
      if (gameContainer) {
        gameContainer.removeEventListener('click', handleClickInside);
      }
    };
  }, [isLoaded]);

  function handleClickEnterFullscreen() {
    requestFullscreen(true);
  }


  if (user == null) {
    return (
      <PageLayout title="Open-source" keywords="A list of open source projects">
        <PageSlideFade>
          <VStack align="center" spacing={4}>
            <VStack width={'100%'} align="center">
              <Header underlineColor={TURQUOISE} mt={0} mb={0}>
                Not Authorized
              </Header>
              <Stack spacing={4} pt={2}>
                <Link href="/" passHref>
                  <Button
                    as="a"
                    loadingText="Submitting"
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                      color: 'black'
                    }}
                  >
                    Back To Main
                  </Button>
                </Link>
              </Stack>
            </VStack>
          </VStack>
        </PageSlideFade>
      </PageLayout>
    );
  }

  return (
      <Fragment>
        {!isLoaded && <p>Loading Application... {Math.round(loadingProgression * 100)}%</p>}
        <Unity
          unityProvider={unityProvider}
          style={{ visibility: isLoaded ? 'visible' : 'hidden', width: 1280, height: 720 }}
          tabIndex={1} // Make the div focusable
        />
      <button onClick={handleClickEnterFullscreen}>Enter Fullscreen</button>

      </Fragment>
  );
}