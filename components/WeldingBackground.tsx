
import React, { useEffect, useRef } from 'react';

const WeldingBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', resize);
    resize();

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      color: string;
      size: number;
      glowColor: string;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        // Velocidade variada para faíscas pesadas e leves
        const power = Math.random() > 0.8 ? 15 : 8;
        this.vx = (Math.random() - 0.5) * power; 
        this.vy = (Math.random() - 0.8) * power;
        this.maxLife = Math.random() * 50 + 30;
        this.life = this.maxLife;
        this.size = Math.random() * 2.5 + 0.5;
        
        // Cores de metal incandescente
        const colors = [
          { main: '#ffffff', glow: '#3b82f6' }, // Plasma Branco/Azul
          { main: '#3b82f6', glow: '#1d4ed8' }, // Azul Solda
          { main: '#fbbf24', glow: '#f59e0b' }, // Faísca Amarela
          { main: '#f97316', glow: '#ea580c' }  // Faísca Laranja
        ];
        const selected = colors[Math.floor(Math.random() * colors.length)];
        this.color = selected.main;
        this.glowColor = selected.glow;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.3; // Gravidade mais forte para efeito realista
        this.vx *= 0.99; // Atrito do ar
        this.life--;
        this.size *= 0.97; 
      }

      draw(ctx: CanvasRenderingContext2D) {
        const opacity = this.life / this.maxLife;
        ctx.save();
        ctx.globalAlpha = opacity;
        
        // Brilho intenso da faísca
        ctx.shadowBlur = 12;
        ctx.shadowColor = this.glowColor;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
      }
    }

    const animate = () => {
      // Background com motion blur mais denso
      ctx.fillStyle = 'rgba(2, 6, 23, 0.2)';
      ctx.fillRect(0, 0, width, height);

      // Ponto de soldagem principal (Lado direito superior/médio)
      if (Math.random() > 0.82) {
        const spawnX = width * (0.55 + Math.random() * 0.35);
        const spawnY = height * (0.25 + Math.random() * 0.45);
        
        // Flash de luz azul rápido (arco voltaico)
        if (Math.random() > 0.95) {
          ctx.save();
          const gradient = ctx.createRadialGradient(spawnX, spawnY, 0, spawnX, spawnY, 150);
          gradient.addColorStop(0, 'rgba(59, 130, 246, 0.15)');
          gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, width, height);
          ctx.restore();
        }

        for(let i = 0; i < 6; i++) {
          particles.push(new Particle(spawnX, spawnY));
        }
      }

      // Partículas extras para garantir movimento sobre a área do QR Code
      if (Math.random() > 0.95) {
        particles.push(new Particle(width * 0.6, height * 0.8));
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw(ctx);
        if (p.life <= 0 || p.size < 0.2) particles.splice(i, 1);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-20"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default WeldingBackground;
