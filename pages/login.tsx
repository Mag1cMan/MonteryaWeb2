import {
    HStack,
    VStack,
  } from '@chakra-ui/react';
import { PageSlideFade } from 'components/shared/animations/page-transitions';
import Header from 'components/shared/header';
import PageLayout from 'components/layouts/pageLayout';

const TURQUOISE = '#06b6d4';
import LoginCard from 'components/authentication/LoginCard';


const authentication =() =>{

    return(
        <PageLayout title="Open-source" keywords="A list of open source projects">
      <PageSlideFade>
      <VStack align="center" spacing={4}>
          <HStack justifyContent={'space-between'} width={'100%'}>
            <Header underlineColor={TURQUOISE} mt={0} mb={0}>
              Login
            </Header>
            <HStack>
              
             
            </HStack>
          </HStack>
          
            <LoginCard/>
        </VStack>
 
      </PageSlideFade>
    </PageLayout>
    )
}


export default authentication;