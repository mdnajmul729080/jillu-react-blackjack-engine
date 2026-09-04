import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import CombinedRootState from '../../types/CombinedRootState';
import SerializedPlayer from '../../types/SerializedPlayer';
import HandOutcome from '../../types/HandOutcome';
import {
  OverlayContainer,
  ConfettiCanvas,
  BannerWrapper,
  BannerCard,
  TitleText,
  WinAmountText,
  StarIcon,
} from './style';

interface Props {
  activePlayer: SerializedPlayer | null;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  shape: 'rect' | 'circle' | 'star';
  alpha: number;
  decay: number;
  wobble: number;
  wobbleSpeed: number;
}

const COLORS = [
  '#f59e0b', // gold
  '#ffd700', // yellow gold
  '#10b981', // emerald green
  '#3b82f6', // sapphire blue
  '#ec4899', // hot pink
  '#8b5cf6', // royal purple
  '#ef4444', // crimson red
  '#ffffff', // diamond white
];

const playWinSound = (isBlackjack: boolean) => {
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    const notes = isBlackjack
      ? [523.25, 659.25, 783.99, 1046.5, 1318.51] // C5, E5, G5, C6, E6
      : [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6

    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + index * 0.1);

      gain.gain.setValueAtTime(0.001, now + index * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.18, now + index * 0.1 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.1 + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + index * 0.1);
      osc.stop(now + index * 0.1 + 0.5);
    });
  } catch {
    // Audio may be blocked by autoplay policies
  }
};

const CelebrationOverlay: React.FC<Props> = ({ activePlayer }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const isWinner = activePlayer?.handOutcome === HandOutcome.Winner;
  const isBlackjack =
    activePlayer?.handValue === 21 && activePlayer?.hand.length === 2;
  const betSize = activePlayer?.betSize || 0;
  const winAmount = isBlackjack ? Math.floor(betSize * 1.5) : betSize;

  useEffect(() => {
    if (isWinner && betSize > 0) {
      setIsVisible(true);
      playWinSound(isBlackjack);
    } else {
      setIsVisible(false);
    }
  }, [isWinner, betSize, isBlackjack]);

  useEffect(() => {
    if (!isVisible) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const particles: Particle[] = [];

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    resizeCanvas();

    const createParticle = (
      originX: number,
      originY: number,
      angle: number,
      speedSpread: number,
    ): Particle => {
      const speed = Math.random() * speedSpread + 6;
      const vx = Math.cos(angle) * speed + (Math.random() - 0.5) * 4;
      const vy = Math.sin(angle) * speed - (Math.random() * 6 + 4);
      const shapes: Array<'rect' | 'circle' | 'star'> = [
        'rect',
        'rect',
        'circle',
        'star',
      ];

      return {
        x: originX,
        y: originY,
        vx,
        vy,
        width: Math.random() * 8 + 6,
        height: Math.random() * 12 + 8,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 8,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        alpha: 1,
        decay: Math.random() * 0.006 + 0.004,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.1 + 0.05,
      };
    };

    const count = isBlackjack ? 140 : 100;
    // Left Cannon
    for (let i = 0; i < count / 2; i += 1) {
      const angle = -Math.PI / 4 + (Math.random() - 0.5) * 0.5;
      particles.push(createParticle(canvas.width * 0.1, canvas.height * 0.8, angle, 14));
    }
    // Right Cannon
    for (let i = 0; i < count / 2; i += 1) {
      const angle = (-3 * Math.PI) / 4 + (Math.random() - 0.5) * 0.5;
      particles.push(createParticle(canvas.width * 0.9, canvas.height * 0.8, angle, 14));
    }
    // Top fireworks shower
    for (let i = 0; i < count / 3; i += 1) {
      const angle = Math.PI / 2 + (Math.random() - 0.5) * 1.5;
      particles.push(createParticle(canvas.width * 0.5, canvas.height * 0.3, angle, 8));
    }

    const drawStar = (
      cx: number,
      cy: number,
      spikes: number,
      outerRadius: number,
      innerRadius: number,
    ) => {
      let rot = (Math.PI / 2) * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i += 1) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
      ctx.fill();
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let activeParticles = 0;

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];

        if (p.alpha <= 0) continue;

        activeParticles += 1;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.28; // gravity
        p.vx *= 0.985; // friction
        p.rotation += p.rotationSpeed;
        p.wobble += p.wobbleSpeed;
        p.alpha -= p.decay;

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.scale(Math.cos(p.wobble), 1);

        if (p.shape === 'rect') {
          ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
        } else if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.width / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === 'star') {
          drawStar(0, 0, 5, p.width, p.width / 2);
        }

        ctx.restore();
      }

      if (activeParticles > 0) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isVisible, isBlackjack]);

  if (!isVisible) {
    return null;
  }

  return (
    <OverlayContainer id="celebration-overlay">
      <ConfettiCanvas ref={canvasRef} />
      <BannerWrapper id="win-banner">
        <BannerCard isBlackjack={isBlackjack}>
          <TitleText isBlackjack={isBlackjack}>
            <StarIcon>✨</StarIcon>
            {isBlackjack ? 'BLACKJACK!' : 'YOU WON!'}
            <StarIcon>✨</StarIcon>
          </TitleText>
          <WinAmountText>
            <span>+${winAmount}</span>
            <span>Chips</span>
          </WinAmountText>
        </BannerCard>
      </BannerWrapper>
    </OverlayContainer>
  );
};

const mapStateToProps = (state: CombinedRootState) => ({
  activePlayer: state.player.activePlayer,
});

export default connect(mapStateToProps)(CelebrationOverlay);
