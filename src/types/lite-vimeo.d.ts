declare global {
	namespace JSX {
		interface IntrinsicElements {
			'lite-vimeo': React.DetailedHTMLProps<
				React.HTMLAttributes< HTMLElement > & {
					videoid?: string;
					autoload?: boolean | string;
					autoplay?: boolean | string;
					loop?: boolean | string;
					isUnlisted?: boolean | string;
					enableTracking?: boolean;
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
	autoload: boolean;
	autoplay: true | undefined;
	loop: true | undefined;
	enableTracking: boolean;
}
export interface BlockAttributes extends LiteVimeoAttributes {
	align: string;
}
