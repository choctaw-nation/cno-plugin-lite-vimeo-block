declare global {
	namespace JSX {
		interface IntrinsicElements {
			'lite-vimeo': React.DetailedHTMLProps<
				React.HTMLAttributes< HTMLElement > & {
					videoid?: string;
					autoload?: boolean | string;
					autoplay?: boolean | string;
					loop?: boolean | string;
					unlisted?: boolean | string;
					enableTracking?: string;
					start?: string;
					videoPlay?: string;
					videoTitle?: string;
					customPlaceholder?: string;
					showControls?: boolean | string;
				},
				HTMLElement
			>;
		}
	}
}

export interface LiteVimeoAttributes {
	isUnlisted: boolean;
	customThumbnailURL: string | undefined;
	videoID: string;
	videoTitle: string;
	loop: true | undefined;
	enableTracking?: boolean;
	videoStartAt: number;
	autoPlay: boolean;
	showControls?: boolean;
	autoload?: boolean;
}
