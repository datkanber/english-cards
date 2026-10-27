import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Matter from 'matter-js';

import { Screen } from '@/components/common/Screen';
import { AppText } from '@/components/ui/AppText';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const BALL_SIZE = 90;
const FLOOR_HEIGHT = 150;
const FLOOR_Y = screenHeight - FLOOR_HEIGHT;

export function HomeScreen() {
  const [running, setRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  
  const [ballData, setBallData] = useState({ x: screenWidth / 2, y: 100, angle: 0 });

  const engineRef = useRef<Matter.Engine | null>(null);
  const ballRef = useRef<Matter.Body | null>(null);
  const requestRef = useRef<number>(0);

  const setupWorld = () => {
    let engine = Matter.Engine.create({ enableSleeping: false });
    engineRef.current = engine;
    
    // Gravity scale
    engine.gravity.y = 1.0;

    const ball = Matter.Bodies.circle(screenWidth / 2, 100, BALL_SIZE / 2, {
      restitution: 0.8, // Bounciness
      frictionAir: 0.01,
      density: 0.005,
      label: 'ball',
    });
    ballRef.current = ball;

    const floor = Matter.Bodies.rectangle(
      screenWidth / 2,
      FLOOR_Y + FLOOR_HEIGHT / 2,
      screenWidth,
      FLOOR_HEIGHT,
      { isStatic: true, label: 'floor' }
    );

    // Add invisible walls
    const leftWall = Matter.Bodies.rectangle(-25, screenHeight / 2, 50, screenHeight, { isStatic: true });
    const rightWall = Matter.Bodies.rectangle(screenWidth + 25, screenHeight / 2, 50, screenHeight, { isStatic: true });
    const ceiling = Matter.Bodies.rectangle(screenWidth / 2, -100, screenWidth, 50, { isStatic: true });

    Matter.World.add(engine.world, [ball, floor, leftWall, rightWall, ceiling]);

    // Detect collision with floor
    Matter.Events.on(engine, 'collisionStart', (event) => {
      const pairs = event.pairs;
      for (let i = 0; i < pairs.length; i++) {
        const bodyA = pairs[i]?.bodyA?.label;
        const bodyB = pairs[i]?.bodyB?.label;
        
        if ((bodyA === 'floor' && bodyB === 'ball') || (bodyA === 'ball' && bodyB === 'floor')) {
          setRunning(false);
        }
      }
    });
  };

  const gameLoop = () => {
    if (engineRef.current && ballRef.current) {
      Matter.Engine.update(engineRef.current, 1000 / 60);
      setBallData({
        x: ballRef.current.position.x,
        y: ballRef.current.position.y,
        angle: ballRef.current.angle,
      });
    }
    requestRef.current = requestAnimationFrame(gameLoop);
  };

  const startGame = () => {
    setupWorld();
    setScore(0);
    setRunning(true);
  };

  useEffect(() => {
    if (running) {
      requestRef.current = requestAnimationFrame(gameLoop);
    } else {
      cancelAnimationFrame(requestRef.current);
      if (score > 0) {
        setHighScore((prev) => Math.max(prev, score));
      }
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [running, score]);

  const handleTap = () => {
    if (!running || !ballRef.current) return;
    
    setScore((s) => {
      const newScore = s + 1;
      // Increase gravity slightly as score goes up
      if (engineRef.current) {
         engineRef.current.gravity.y = Math.min(2.5, 1.0 + newScore * 0.05);
      }
      return newScore;
    });
    
    // Clear velocity for snappy tap
    Matter.Body.setVelocity(ballRef.current, { x: 0, y: 0 });

    // Apply force upwards
    Matter.Body.applyForce(ballRef.current, ballRef.current.position, {
      x: (Math.random() - 0.5) * 0.05,
      y: -0.15,
    });
    // Add random spin
    Matter.Body.setAngularVelocity(ballRef.current, (Math.random() - 0.5) * 0.5);
  };

  return (
    <Screen testID="home-screen" style={styles.container}>
      <View style={styles.header}>
        <AppText variant="title" style={styles.title}>
          Keep It Up (Physics)
        </AppText>
        <AppText color="muted" style={styles.subtitle}>
          High Score: {highScore}
        </AppText>
      </View>

      <View style={styles.scoreContainer}>
        <AppText style={styles.scoreText}>{score}</AppText>
      </View>

      <TouchableWithoutFeedback onPress={handleTap}>
        <View style={styles.gameArea}>
          {/* Floor */}
          <View style={styles.floor} />

          {/* Ball */}
          {(running || engineRef.current) && (
            <View
              style={[
                styles.pokeball,
                {
                  position: 'absolute',
                  left: ballData.x - BALL_SIZE / 2,
                  top: ballData.y - BALL_SIZE / 2,
                  transform: [{ rotate: `${ballData.angle}rad` }],
                },
              ]}
            >
              <View style={styles.pokeballTop} />
              <View style={styles.pokeballBottom} />
              <View style={styles.pokeballLine} />
              <View style={styles.pokeballCenterBorder}>
                <View style={styles.pokeballCenterButton} />
              </View>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>

      {!running && (
        <View style={styles.overlay}>
          {engineRef.current && <AppText variant="heading" style={styles.gameOverText}>GAME OVER!</AppText>}
          <TouchableOpacity style={styles.startButton} onPress={startGame} activeOpacity={0.8}>
            <AppText style={styles.startButtonText}>{engineRef.current ? 'PLAY AGAIN' : 'START GAME'}</AppText>
          </TouchableOpacity>
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#87CEEB' },
  header: { paddingTop: 60, alignItems: 'center', zIndex: 10 },
  title: { fontSize: 32, fontWeight: '900', color: '#fff', textShadowColor: 'rgba(0, 0, 0, 0.3)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 3 },
  subtitle: { fontSize: 18, marginTop: 5, color: '#fff', fontWeight: 'bold' },
  scoreContainer: { position: 'absolute', top: '35%', left: 0, right: 0, alignItems: 'center', zIndex: 1, pointerEvents: 'none' },
  scoreText: { fontSize: 140, fontWeight: 'bold', color: 'rgba(255,255,255,0.4)' },
  overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', zIndex: 20, backgroundColor: 'rgba(0,0,0,0.4)' },
  gameOverText: { fontSize: 40, color: '#ff3333', fontWeight: 'bold', marginBottom: 30, textShadowColor: '#fff', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 2 },
  startButton: { backgroundColor: '#ff0000', paddingHorizontal: 40, paddingVertical: 18, borderRadius: 40, borderWidth: 4, borderColor: '#fff', elevation: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5 },
  startButtonText: { color: '#fff', fontSize: 22, fontWeight: '900', letterSpacing: 1 },
  gameArea: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 5 },
  floor: { position: 'absolute', top: FLOOR_Y, left: 0, right: 0, height: FLOOR_HEIGHT, backgroundColor: '#7cfc00', borderTopWidth: 10, borderColor: '#228b22' },
  pokeball: { width: BALL_SIZE, height: BALL_SIZE, borderRadius: BALL_SIZE / 2, borderWidth: 5, borderColor: '#222', overflow: 'hidden', backgroundColor: '#fff', elevation: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.4, shadowRadius: 8 },
  pokeballTop: { height: '50%', backgroundColor: '#ee1515', borderBottomWidth: 2.5, borderColor: '#222' },
  pokeballBottom: { height: '50%', backgroundColor: '#f0f0f0', borderTopWidth: 2.5, borderColor: '#222' },
  pokeballLine: { position: 'absolute', top: '50%', left: 0, right: 0, height: 8, backgroundColor: '#222', marginTop: -4, zIndex: 1 },
  pokeballCenterBorder: { position: 'absolute', top: '50%', left: '50%', width: BALL_SIZE * 0.3, height: BALL_SIZE * 0.3, backgroundColor: '#f0f0f0', borderRadius: BALL_SIZE * 0.15, borderWidth: 4, borderColor: '#222', marginLeft: -(BALL_SIZE * 0.15), marginTop: -(BALL_SIZE * 0.15), zIndex: 2, justifyContent: 'center', alignItems: 'center' },
  pokeballCenterButton: { width: BALL_SIZE * 0.12, height: BALL_SIZE * 0.12, backgroundColor: '#fff', borderRadius: BALL_SIZE * 0.06, borderWidth: 2, borderColor: '#222' },
});
