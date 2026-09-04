import styled from 'styled-components';

export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  z-index: 999;
  padding: 2rem;
`;

export const ModalCard = styled.div`
  background: linear-gradient(145deg, #1f2937, #111827);
  border: 2px solid #e11d48;
  border-radius: 16px;
  padding: 2.4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8);
  max-width: 320px;
  width: 100%;
`;

export const Message = styled.h2`
  text-transform: uppercase;
  color: #fb7185;
  letter-spacing: 2px;
  font-size: 2.4rem;
  font-weight: 800;
  margin-bottom: 0.8rem;
`;

export const SubMessage = styled.p`
  color: #94a3b8;
  font-size: 1.4rem;
  margin-bottom: 2rem;
`;

export const ActionButton = styled.button`
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 1.2rem 2.4rem;
  font-size: 1.6rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(16, 185, 129, 0.6);
  }

  &:active {
    transform: translateY(0);
  }
`;

