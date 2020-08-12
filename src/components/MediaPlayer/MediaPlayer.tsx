import React from 'react';

import ReactPlayer from 'react-player';
import { usePlayer } from '@hooks/usePlayer';
import styles from './MediaPlayer.module.css';

const DEMO_MUSIC_LINK = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

const MediaPlayer = () => {
  const [state, action, ref] = usePlayer(DEMO_MUSIC_LINK);

  return (
    <>
      <ReactPlayer
        ref={ref}
        url={state.url}
        playing={state.playing}
        volume={state.volume}
        muted={state.muted}
        played={state.played}
        loaded={state.loaded}
        duration={state.duration}
        onReady={() => console.log('onReady')}
        onStart={() => console.log('onStart')}
        onPlay={action.handlePlay}
        onPause={action.handlePause}
        onProgress={action.handleProgress}
        onSeek={() => alert('onSeek')}
        style={{ display: 'none' }}
      />
      <div>
        <button onClick={action.handlePlay}>Play</button>
        <button onClick={action.handlePause}>Pause</button>
      </div>
      <input
        type="range"
        min={0}
        max={0.999999}
        step="any"
        value={state.played}
        onMouseDown={action.handleSeekMouseDown}
        onChange={action.handleSeekChange}
        onMouseUp={action.handleSeekMouseUp}
      />
      <div>
        <h3 className={styles.nowPlaying}>{state.playing ? 'NOW PLAYING' : "LET'S PLAY"}</h3>
      </div>
      <div>
        <p style={{ fontWeight: 'lighter' }}>{state.url}</p>
      </div>
    </>
  );
};

export { MediaPlayer };
