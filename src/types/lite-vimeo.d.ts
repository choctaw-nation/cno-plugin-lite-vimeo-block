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
