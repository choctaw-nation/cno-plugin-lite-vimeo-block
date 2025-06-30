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
					enableTracking?: boolean;
					start?: string;
					videoPlay?: string;
					videoTitle?: string;
					customPlaceholder?: string;
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
	enableTracking: boolean;
	videoStartAt: number;
}

export interface BlockAttributes
	extends Omit< LiteVimeoAttributes, [ 'enableTracking' ] > {
	align: string;
	disableTracking: boolean;
}
