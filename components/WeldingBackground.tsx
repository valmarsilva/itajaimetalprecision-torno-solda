
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

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        // Velocidade mais explosiva para parecer solda real
        this.vx = (Math.random() - 0.5) * 12; 
        this.vy = (Math.random() - 0.7) * 15;
        this.maxLife = Math.random() * 40 + 20;
        this.life = this.maxLife;
        this.size = Math.random() * 3 + 1;
        
        // Cores de plasma e metal incandescente
        const colors = ['#3b82f6', '#60a5fa', '#ffffff', '#fbbf24', '#f59e0b', '#00d4ff'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.25; // Gravidade
        this.life--;
        this.size *= 0.96; 
      }

      draw(ctx: CanvasRenderingContext2D) {
        const opacity = this.life / this.maxLife;
        ctx.save();
        ctx.globalAlpha = opacity;
        
        // Efeito de brilho (Bloom)
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
      }
    }

    const animate = () => {
      // Limpeza suave para rastro de movimento
      ctx.fillStyle = 'rgba(2, 6, 23, 0.15)';
      ctx.fillRect(0, 0, width, height);

      // Faíscas mais frequentes
      if (Math.random() > 0.85) {
        // Surge em pontos aleatórios da metade direita (onde geralmente está a "usinagem")
        const spawnX = width * (0.6 + Math.random() * 0.3);
        const spawnY = height * (0.2 + Math.random() * 0.4);
        
        // Explosão de luz momentânea
        ctx.save();
        ctx.beginPath();
        ctx.arc(spawnX, spawnY, 20, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
        ctx.fill();
        ctx.restore();

        for(let i = 0; i < 8; i++) {
          particles.push(new Particle(spawnX, spawnY));
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw(ctx);
        if (p.life <= 0 || p.size < 0.1) particles.splice(i, 1);
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
