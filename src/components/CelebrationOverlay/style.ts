import styled, { keyframes } from 'styled-components';

const bounceIn = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.3) rotate(-6deg);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.1) rotate(2deg);
  }
  70% {
    transform: translate(-50%, -50%) scale(0.95) rotate(-1deg);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1) rotate(0deg);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const pulseGlow = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(241, 196, 15, 0.6), 0 0 40px rgba(46, 213, 115, 0.4), inset 0 0 15px rgba(255, 255, 255, 0.5);
  }
  50% {
    box-shadow: 0 0 35px rgba(241, 196, 15, 0.9), 0 0 60px rgba(46, 213, 115, 0.7), inset 0 0 25px rgba(255, 255, 255, 0.8);
  }
`;

const floatStars = keyframes`
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-8px) rotate(15deg);
  }
`;

export const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1000;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ConfettiCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

export const BannerWrapper = styled.div`
  position: absolute;
  top: 48%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${bounceIn} 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  z-index: 1001;
`;

export const BannerCard = styled.div<{ isBlackjack?: boolean }>`
  background: ${({ isBlackjack }) =>
    isBlackjack
      ? 'linear-gradient(135deg, #111827 0%, #1e1b4b 50%, #311042 100%)'
      : 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)'};
  border: 3px solid ${({ isBlackjack }) => (isBlackjack ? '#f59e0b' : '#10b981')};
  border-radius: 20px;
  padding: 1.6rem 2.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  animation: ${pulseGlow} 2s infinite ease-in-out;
  position: relative;
  backdrop-filter: blur(10px);
  min-width: 260px;
`;

export const TitleText = styled.h2<{ isBlackjack?: boolean }>`
  font-family: 'Lato', sans-serif;
  font-size: ${({ isBlackjack }) => (isBlackjack ? '2.8rem' : '2.4rem')};
  font-weight: 900;
  letter-spacing: 0.15rem;
  text-transform: uppercase;
  margin: 0;
  background: linear-gradient(
    90deg,
    #ffd700 0%,
    #ffffff 25%,
    #f59e0b 50%,
    #ffffff 75%,
    #ffd700 100%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${shimmer} 2.5s linear infinite;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.6));
`;

export const WinAmountText = styled.div`
  font-family: 'Lato', sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: #a7f3d0;
  margin-top: 0.4rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const StarIcon = styled.span`
  display: inline-block;
  font-size: 2rem;
  animation: ${floatStars} 1.5s ease-in-out infinite;
`;
