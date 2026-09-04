import React from 'react';
import { connect } from 'react-redux';
import { Wrapper, ModalCard, Message, SubMessage, ActionButton } from './style';
import { rebuyChips } from '../../actions';

interface Props {
  rebuyChips: (amount?: number) => void;
}

const GameOverScreen: React.FC<Props> = ({ rebuyChips }) => {
  return (
    <Wrapper>
      <ModalCard>
        <Message>Out of Chips</Message>
        <SubMessage>Your balance reached $0. Reload to continue playing!</SubMessage>
        <ActionButton onClick={() => rebuyChips(1000)}>
          + $1,000 Chips
        </ActionButton>
      </ModalCard>
    </Wrapper>
  );
};

export default connect(null, { rebuyChips })(GameOverScreen);

