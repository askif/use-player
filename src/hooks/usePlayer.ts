import React, { LegacyRef, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';

export interface PlayerState {
  url: string;
  playing: boolean;
  volume: number;
  muted: boolean;
  played: number;
  loaded: number;
  duration: number;
  seeking: boolean;
}

export interface PlayerAction {
  handlePlay: () => void;
  handlePause: () => void;
  handleProgress: ({ played }: { played: number }) => void;
  handlePlayPause: () => void;
  handleSeekMouseDown: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
  handleSeekChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSeekMouseUp: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
}

const usePlayer = (src: string): [PlayerState, PlayerAction, LegacyRef<ReactPlayer> | null] => {
  const ref = useRef(null);

  const [state, setState] = useState<PlayerState>({
    url: null,
    playing: false,
    volume: 0.1,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    seeking: false,
  });

  useEffect(() => {
    console.log('src link:', src);

    const setURL = () => {
      setState({ ...state, url: src });
    };
    setURL();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  const handlePlay = () => {
    console.log('handlePlay: ', state.playing);

    setState({ ...state, playing: true });
  };

  const handlePause = () => {
    console.log('handlePause: ', state.playing);

    setState({ ...state, playing: false });
  };

  const handleProgress = ({ played }) => {
    console.log('handleProgress:', played);

    // update slider only when seeking is false
    if (!state.seeking) {
      setState({ ...state, played: played });
    }
  };

  const handlePlayPause = () => {
    console.log('handlePlayPause: ', state.playing);

    setState({ ...state, playing: !state.playing });
  };

  const handleSeekMouseDown = () => {
    console.log('seek mouse down');

    setState({ ...state, seeking: true });
  };

  const handleSeekChange = (e) => {
    console.log('seek change');

    setState({ ...state, played: parseFloat(e.target.value) });
  };

  const handleSeekMouseUp = (e) => {
    console.log('seek mouse up');

    setState({ ...state, seeking: false });
    ref.current.player.seekTo(parseFloat(e.target.value));
  };

  const action: PlayerAction = {
    handlePlay: handlePlay,
    handlePause: handlePause,
    handleProgress: handleProgress,
    handlePlayPause: handlePlayPause,
    handleSeekMouseDown: handleSeekMouseDown,
    handleSeekChange: handleSeekChange,
    handleSeekMouseUp: handleSeekMouseUp,
  };

  return [state, action, ref];
};

export { usePlayer };
