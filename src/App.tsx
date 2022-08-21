import React from 'react';
import { NuiProvider, useNuiEvent } from 'react-fivem-hooks';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { IPhoneSettings } from '@project-error/npwd-types';
import { i18n } from 'i18next';
import { Theme, StyledEngineProvider, Paper } from '@mui/material';
import ThemeSwitchProvider from './ThemeSwitchProvider';
import Header, { HEADER_HEIGHT } from './components/Header';
import Footer from './components/Footer';
import { RecoilRoot } from 'recoil';
import Routes from './Routes';
import { DataSync } from './components/DataSync';
import { NUIEvents } from '../types/Events';

const Container = styled(Paper)`
  flex: 1;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  max-height: 100%;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 1.5rem;
  max-height: calc(100% - 3.5rem - ${HEADER_HEIGHT});
  overflow: auto;
`;

interface AppProps {
  theme: Theme;
  i18n: i18n;
  settings: IPhoneSettings;
}

const App = (props: AppProps) => {
  return (
    <RecoilRoot>
      <DataSync />
      <StyledEngineProvider injectFirst>
        <ThemeSwitchProvider mode={'dark'}>
          <Container square elevation={0}>
            <Header>Racing</Header>
            <Content>
              <Routes />
            </Content>
            <Footer />
          </Container>
        </ThemeSwitchProvider>
      </StyledEngineProvider>
    </RecoilRoot>
  );
};

const WithProviders: React.FC<AppProps> = (props) => (
  <NuiProvider>
    <App {...props} />
  </NuiProvider>
);

export default WithProviders;
