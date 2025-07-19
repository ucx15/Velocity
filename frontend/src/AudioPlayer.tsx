import React, { useEffect, useRef, useState } from 'react';
import './AudioPlayer.css';

interface AudioPlayerProps {
	filename: string;
	title: string;
	artist: string;
	cover?: string;
}

const formatTime = (seconds: number): string => {
	const minutes = Math.floor(seconds / 60);
	const secs = Math.floor(seconds % 60);
	return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
};

const AudioPlayer: React.FC<AudioPlayerProps> = ({ filename, title, artist, cover }: AudioPlayerProps) => {
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [volume, setVolume] = useState(1);
	const [bufferedRanges, setBufferedRanges] = useState<{ start: number; end: number }[]>([]);

	const streamUrl = `http://localhost:5000/api/stream/${filename}`;

	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;

		const updateTime = () => setCurrentTime(audio.currentTime);

		const updateBuffered = () => {
			const ranges = [];
			for (let i = 0; i < audio.buffered.length; i++) {
				ranges.push({
					start: audio.buffered.start(i),
					end: audio.buffered.end(i),
				});
			}
			setBufferedRanges(ranges);
		};

		const setMeta = () => {
			setDuration(audio.duration);
			setCurrentTime(audio.currentTime);
			updateBuffered();
		};

		audio.addEventListener('timeupdate', updateTime);
		audio.addEventListener('progress', updateBuffered);
		audio.addEventListener('loadedmetadata', setMeta);

		return () => {
			audio.removeEventListener('timeupdate', updateTime);
			audio.removeEventListener('progress', updateBuffered);
			audio.removeEventListener('loadedmetadata', setMeta);
		};
	}, []);

	const togglePlay = () => {
		const audio = audioRef.current;
		if (!audio) return;

		if (isPlaying) {
			audio.pause();
		} else {
			audio.play();
		}

		setIsPlaying(!isPlaying);
	};

	const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
		const audio = audioRef.current;
		const time = parseFloat(e.target.value);
		if (audio) {
			audio.currentTime = time;
		}
		setCurrentTime(time);
	};

	const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newVolume = parseFloat(e.target.value);
		const audio = audioRef.current;
		if (audio) {
			audio.volume = newVolume;
		}
		setVolume(newVolume);
	};

	return (


		<>
			<div className="song-info">
				{cover && <img src={cover} alt={title} className="cover-art" />}
				<div>
					<div className="song-title">{title}</div>
					<div className="song-artist">{artist}</div>
				</div>
			</div>

			<div className="custom-player">

				<audio ref={audioRef}>
					<source src={streamUrl} type="audio/mpeg" />
				</audio>

				<div className="controls"></div>
				<audio ref={audioRef}>
					<source src={streamUrl} type="audio/mpeg" />
				</audio>

				<div className="controls">
					<button onClick={togglePlay} className="play-btn">
						{isPlaying ? '⏸️' : '▶️'}
					</button>

					<div className="time">{formatTime(currentTime)}</div>

					<div className="progress-container">
						{/* Buffered Ranges */}
						{duration > 0 &&
							bufferedRanges.map((range, i) => {
								const left = `${(range.start / duration) * 100}%`;
								const width = `${((range.end - range.start) / duration) * 100}%`;
								return (
									<div
										key={i}
										className="buffered"
										style={{ left, width }}
									/>
								);
							})}

						<input
							type="range"
							min="0"
							max={duration || 0}
							value={currentTime}
							onChange={handleSeek}
							className="progress-bar"
						/>
					</div>

					<div className="time">{formatTime(duration)}</div>

					<input
						type="range"
						min="0"
						max="1"
						step="0.01"
						value={volume}
						onChange={handleVolume}
						className="volume-slider"
					/>
				</div>
			</div>
		</>
	);
};

export default AudioPlayer;
