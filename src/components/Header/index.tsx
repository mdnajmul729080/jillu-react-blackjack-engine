import React from 'react';
import { connect } from 'react-redux';
import { StyledHeader, Title, HeaderActions, ResetButton } from './style';
import { resetGame } from '../../actions';

interface Props {
  resetGame: (startingChips?: number) => void;
}

const Header: React.FC<Props> = ({ resetGame }) => {
  return (
    <StyledHeader>
      <Title>
        <span>♠</span> Blackjack
      </Title>
      <HeaderActions>
        <ResetButton onClick={() => resetGame(2000)} title="Reset game bankroll to $2,000">
          Reset $2K
        </ResetButton>
      </HeaderActions>
    </StyledHeader>
  );
};

export default connect(null, { resetGame })(Header);

