export interface LiteVimeoBlockAttributes {
	isUnlisted: boolean;
	useCustomThumbnail: boolean;
	customThumbnailURL?: string;
	videoID: string;
	videoTitle: string;
	loop: boolean;
	disableTracking: boolean;
	videoStartAt: number;
	autoPlay: boolean;
	autoplayThreshold: number;
	buttonColor: string;
	autoplayMuted: boolean;
	playerControls: boolean;
	gradientOpacity: number;
}

declare module '*.scss';
declare module '*.css';

export interface LiteVimeoContext {
	videoId: string;
	isUnlisted: boolean;
	hash?: string;
	loop: boolean;
	enableTracking: boolean;
	videoStartAt: number;
	autoPlay: boolean;
	autoplayThreshold: number;
	autoplayMuted: boolean;
	showControls: boolean;
	videoTitle: string;
	useCustomThumbnail: boolean;
	customThumbnailURL: string;
	iframeLoaded: boolean;
	posterUrlWebp: string;
	posterUrlJpeg: string;
	iframeSrc: string | null;
	playAriaLabel: string;
}

export interface UnlistedLiteVimeoContext extends LiteVimeoContext {
	hash: string;
	isUnlisted: true;
	useCustomThumbnail: true;
	customThumbnailURL: string;
}
