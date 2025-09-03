import React, { useRef, useState, useEffect, useCallback } from 'react';


// Styles
import styles from './AudioPlayer.module.css';

// Utils
import BACKEND_URI from '../../config';

// Props for the AudioPlayer component
interface AudioPlayerProps {
	songID: string;
}


const formatTime = (seconds: number): string => {
	const minutes = Math.floor(seconds / 60);
	const secs = Math.floor(seconds % 60);
	return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
};

const AudioPlayer: React.FC<AudioPlayerProps> = (props : AudioPlayerProps) => {
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [volume, setVolume] = useState(1);
	const [bufferedRanges, setBufferedRanges] = useState<{ start: number; end: number }[]>([]);

	const streamUrl = `${BACKEND_URI}/stream/${props.songID}`;

	const updateBuffered = useCallback(() => {
		const audio = audioRef.current;
		if (!audio) return;

		const ranges: { start: number; end: number }[] = [];
		for (let i = 0; i < audio.buffered.length; i++) {
			ranges.push({
				start: audio.buffered.start(i),
				end: audio.buffered.end(i),
			});
		}
		console.log('Buffered Ranges:', ranges);
		setBufferedRanges(ranges);
	}, []);

	const togglePlay = useCallback(() => {
		const audio = audioRef.current;
		if (!audio) return;

		if (audio.paused) {
			audio.play().catch(console.error);
		} else {
			audio.pause();
		}
	}, []);

	const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const audio = audioRef.current;
		const time = parseFloat(e.target.value);
		if (audio) {
			audio.currentTime = time;
		}
		setCurrentTime(time);
	}, []);

	const handleVolume = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const audio = audioRef.current;
		const newVolume = parseFloat(e.target.value);
		if (audio) {
			audio.volume = newVolume;
		}
		setVolume(newVolume);
	}, []);

	useEffect(() => {
		const audio = audioRef.current;
		if (audio) {
			audio.volume = volume;
		}
	}, [volume]);

	return (
		<div className={styles.AudioPlayer}>
			<audio
				preload='auto'
				ref={audioRef}
				src={streamUrl}
				onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
				onProgress={updateBuffered}
				onLoadedMetadata={() => {
					const audio = audioRef.current;
					if (audio) {
						setDuration(audio.duration);
						setCurrentTime(audio.currentTime);
						updateBuffered();
					}
				}}
				onPlay={() => setIsPlaying(true)}
				onPause={() => setIsPlaying(false)}
			/>

			<div className={styles.controls}>
				<button onClick={togglePlay} className={styles.playBtn} aria-label="Play/Pause">
					{isPlaying ? '⏸️' : '▶️'}
				</button>

				<h3 className={styles.time}>{formatTime(currentTime)}</h3>

				<div className={styles.progressContainer}>
					{duration > 0 &&
						bufferedRanges.map((range, i) => {
							const left = `${(range.start / duration) * 100}%`;
							const width = `${((range.end - range.start) / duration) * 100}%`;
							return (
								<div
									key={i}
									className={styles.buffered}
									style={{ left, width }}
								/>
							);
						})}

					<input
						type="range"
						min="0"
						max={duration || 0}
						step="0.01"
						value={currentTime}
						onChange={handleSeek}
						className={styles.progressBar}
						aria-label="Seek"
					/>
				</div>

				<h3 className={styles.time}>{formatTime(duration)}</h3>

				<input
					type="range"
					min="0"
					max="1"
					step="0.01"
					value={volume}
					onChange={handleVolume}
					className={styles.volumeSlider}
					aria-label="Volume"
				/>
			</div>
		</div>
	);
};

export default AudioPlayer;
