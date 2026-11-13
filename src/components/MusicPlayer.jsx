import React, { useReducer, useEffect } from 'react';
import { musicReducer, initialMusicState, MUSIC_ACTIONS } from '../reducers/musicReducer';

export function MusicPlayer() {
  const [state, dispatch] = useReducer(musicReducer, initialMusicState);
  const track = state.tracks[state.currentTrackIndex];

  useEffect(() => {
    let interval = null;
    if (state.isPlaying && state.progress < track.duration) {
      interval = setInterval(() => {
        dispatch({ type: MUSIC_ACTIONS.SET_PROGRESS, payload: state.progress + 1 });
      }, 1000);
    } else if (state.progress >= track.duration) {
      if (state.repeat) {
        dispatch({ type: MUSIC_ACTIONS.SET_PROGRESS, payload: 0 });
      } else {
        dispatch({ type: MUSIC_ACTIONS.NEXT });
      }
    }
    return () => clearInterval(interval);
  }, [state.isPlaying, state.progress, track.duration, state.repeat]);

  const formatTime = (sec) => `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`;

  return (
    <div className="lab-card">
      <h2 className="lab-card__title">ІНДИВІДУАЛЬНЕ / Музичний плеєр</h2>
      
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '250px' }}>
          <div className="player-display">
            <h3 style={{ margin: '0 0 10px', color: 'var(--color-white)' }}>{track.title}</h3>
            <p style={{ margin: 0, color: 'var(--color-muted)' }}>{track.artist}</p>
            
            <div className="progress-container">
              <div className="progress-bar" style={{ width: `${(state.progress / track.duration) * 100}%` }}></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
              <span>{formatTime(state.progress)}</span>
              <span>{formatTime(track.duration)}</span>
            </div>

            <div className="player-controls">
              <button className="btn" onClick={() => dispatch({ type: MUSIC_ACTIONS.PREV })}>⏮</button>
              <button className="btn" onClick={() => dispatch({ type: state.isPlaying ? MUSIC_ACTIONS.PAUSE : MUSIC_ACTIONS.PLAY })}>
                {state.isPlaying ? '⏸' : '▶'}
              </button>
              <button className="btn" onClick={() => dispatch({ type: MUSIC_ACTIONS.NEXT })}>⏭</button>
            </div>

            <div className="player-extras">
              <button className={`btn ${state.repeat ? 'btn--active' : ''}`} onClick={() => dispatch({ type: MUSIC_ACTIONS.TOGGLE_REPEAT })}>🔁</button>
              <input type="range" min="0" max="100" value={state.volume} onChange={e => dispatch({ type: MUSIC_ACTIONS.SET_VOLUME, payload: +e.target.value })} style={{ width: '80px' }} />
            </div>
          </div>
        </div>

        <div style={{ flex: 1, minWidth: '250px' }}>
          <h4 style={{ marginTop: 0, color: 'var(--color-muted)' }}>Плейлист:</h4>
          {state.tracks.map((t, idx) => (
            <div key={t.id} className={`list-item ${idx === state.currentTrackIndex ? 'active-track' : ''}`} onClick={() => dispatch({ type: MUSIC_ACTIONS.SELECT_TRACK, payload: idx })}>
              <span>{t.title}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px' }}>{formatTime(t.duration)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
