'use client';
// import React, { Fragment, useCallback, useEffect } from "react";
import {
  Button,
  Stack,
  HStack,
  VStack
} from '@chakra-ui/react';
import { PageSlideFade } from 'components/shared/animations/page-transitions';
import Header from 'components/shared/header';

import PageLayout from 'components/layouts/pageLayout';

const TURQUOISE = '#06b6d4';

import React ,{Fragment, useEffect} from 'react';
import Link from 'next/link';
import { Unity, useUnityContext } from 'react-unity-webgl';
import { UserAuth } from '../../configs/AuthContext';
const unityContextLocation = 'Unity-WebGl-Build/Build';
// type ReactUnityEventParameter = string | number | undefined;

export default function GameEngine() {
  const { user, SetGameState } = UserAuth();
  console.log('Trigger Unity');
  console.log(user);
  if (user == null) {
    return (
      <PageLayout title="Open-source" keywords="A list of open source projects">
      <PageSlideFade>
        <VStack align="center" spacing={4}>
          <VStack width={'100%'} align="center">
            {' '}
            {/* Use VStack instead of HStack */}
            <Header underlineColor={TURQUOISE} mt={0} mb={0}>
              Not Authorized
            </Header>
            <HStack>
              <Stack spacing={4} pt={2}>
                <Link href="/" passHref>
                  <Button
                    as="a" // This makes the Button behave like an <a> tag
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
            </HStack>
          </VStack>
        </VStack>
      </PageSlideFade>
    </PageLayout>

    )
  }

  SetGameState(true);

  const {
    unityProvider,
    sendMessage,
    addEventListener,
    removeEventListener,
    loadingProgression,
    isLoaded
  } = useUnityContext({
    // Replace with what the new path is if show Load Resource Error or GET Error
    loaderUrl: `${unityContextLocation}/monterya0.2.3.loader.js`,
    dataUrl: `${unityContextLocation}/monterya0.2.3.data`,
    frameworkUrl: `${unityContextLocation}/monterya0.2.3.framework.js`,
    codeUrl: `${unityContextLocation}/monterya0.2.3.wasm`
  });

  // 1EYikr0VG8SgxOLrpsk2rmzUmo83
  // tO0iKyLOUkNHMUxHOfiyqozk9EC3

  // function handleClickSpawnEnemies() {
  //   sendMessage("GameController", "SpawnEnemies", 100);
  // }

  // const UNITY_handleSetScore = useCallback((score) => {
  //   console.log("Trigger Game Over")
  // }, []);

  // const UNITY_handleSetScore = useCallback((score) => {
  //   console.log("Trigger Game Over")
  // }, []);

  //  function setCurrentUserSession(){
  //     sendMessage("Client - Communicator", "SetUserId", user.uid);
  //     // You might need to handle some logic to set isLoaded to true
  // }

  if (isLoaded === true) {
    //const jwt = localStorage.getItem('jwt');
    // <------------------ This works! ------------------------>
    sendMessage('Client - Communicator', 'SetUserId', user.uid);
  }

  // Functions to allow Unity Game to send info to React
  useEffect(() => {
    // addEventListener("SetScore", UNITY_handleSetScore);
    // return () => {
    //   removeEventListener("SetScore", UNITY_handleSetScore);
    // };
  }, [addEventListener, removeEventListener, user]);

  // }, [addEventListener, removeEventListener, UNITY_handleSetScore , user]);

  return (
    <div>
      <Fragment>
        {!isLoaded && <p>Loading Application... {Math.round(loadingProgression * 100)}%</p>}
        <Unity
          unityProvider={unityProvider}
          style={{ visibility: isLoaded ? 'visible' : 'hidden', width: 1280, height: 720 }}
        />
        {/* <button className="bg-green-500"  onClick={handleClickSpawnEnemies}>Reload Game</button>
            <button className="bg-red-500" onClick={setCurrentUserSession}>TestGame</button> */}

        <button> </button>
      </Fragment>
    </div>
  );
}
