import styled from 'styled-components';

export const StyledHeader = styled.header`
  background: linear-gradient(180deg, #1f2937 0%, #111827 100%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  text-transform: uppercase;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 1.4rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  z-index: 10;
`;

export const Title = styled.h1`
  color: #f1f5f9;
  letter-spacing: 2px;
  font-size: 1.5rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin: 0;

  span {
    color: #f59e0b;
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

export const ResetButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  color: #cbd5e1;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  padding: 0.4rem 0.8rem;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  letter-spacing: 0.5px;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    color: #fff;
  }

  &:active {
    transform: scale(0.96);
  }
`;

