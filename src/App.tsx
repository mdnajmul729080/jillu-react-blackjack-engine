import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import 'fontsource-lato';
import styled, { createGlobalStyle } from 'styled-components';
import ChipTray from './components/ChipTray';
import CombinedRootState from './types/CombinedRootState';
import Header from './components/Header';
import Table from './components/Table';
import GameOverScreen from './components/GameOverScreen';
import CelebrationOverlay from './components/CelebrationOverlay';
import SerializedPlayer from './types/SerializedPlayer';
import { startGame } from './actions';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  html {
    font-size: 62.5%;
    font-family: "Lato";
    text-rendering: optimizeLegibility;
  }

  body {
    line-height: 1.7;
    background-color: #000;
  }

  
  @media only screen and (min-width: 405px) {
    html {
      font-size: 80%;
    }
  }
`;

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  margin: 0 auto;
  background-color: #186737;
  position: relative;
  overflow: hidden;

  @media only screen and (min-width: 405px) {
    max-width: 40rem;
    margin: 0 auto;
  }
`;

interface Props {
  activePlayer: SerializedPlayer | null;
  startGame: () => void;
}

const App: React.FC<Props> = ({ activePlayer, startGame }) => {
  useEffect(() => {
    if (!activePlayer) {
      startGame();
    }
  }, [activePlayer, startGame]);

  const isPlayerBankrupt =
    activePlayer !== null &&
    activePlayer.stack < 1 &&
    activePlayer.betSize === 0;

  return (
    <AppWrapper>
      {/* @ts-ignore */}
      <GlobalStyle />
      <CelebrationOverlay />
      <Header />
      <Table />
      <ChipTray />
      {isPlayerBankrupt && <GameOverScreen />}
    </AppWrapper>
  );
};

const mapStateToProps = (state: CombinedRootState) => ({
  activePlayer: state.player.activePlayer,
});

export default connect(mapStateToProps, { startGame })(App);

