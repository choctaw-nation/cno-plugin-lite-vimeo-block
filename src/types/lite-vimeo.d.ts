export interface LiteVimeoAttributes {
	isUnlisted: boolean;
	customThumbnailURL: string | undefined;
	videoID: string;
	videoHash: string;
	videoTitle: string;
	loop: true | undefined;
	enableTracking?: boolean;
	videoStartAt: number;
	autoPlay: boolean;
	showControls?: boolean;
	autoload?: boolean;
}

declare module '*.scss';
declare module '*.css';

export interface LiteVimeoContext {
	videoId: string;
	isUnlisted: boolean;
	hash: string;
	loop: boolean;
	enableTracking: boolean;
	videoStartAt: number;
	autoPlay: boolean;
	showControls: boolean;
	videoTitle: string;
	customThumbnailURL: string;
	iframeLoaded: boolean;
	posterUrlWebp: string;
	posterUrlJpeg: string;
	iframeSrc: string | null;
	playAriaLabel: string;
}
