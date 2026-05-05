import { useBlockProps } from '@wordpress/block-editor';

/**
 * Type declaration for the v1 <lite-vimeo> custom element used in JSX.
 */
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

/**
 * v1 attribute shape (matches main-branch block.json).
 */
interface V1Attributes {
	isUnlisted: boolean;
	customThumbnailURL: string;
	videoID: string;
	videoTitle: string;
	loop: boolean;
	disableTracking: boolean;
	videoStartAt: number;
	autoPlay: boolean;
	playerControls: boolean;
}

/**
 * Block deprecation for v1 — preserves the exact save() output produced by
 * the main-branch (lite-vimeo custom element) so that existing content
 * continues to parse without "invalid block" errors and can be automatically
 * migrated to the v2 Interactivity-API markup.
 */
const v1 = {
	/**
	 * v1 attribute definitions (copied verbatim from the v1 block.json).
	 * Gutenberg uses these to deserialise attributes from saved HTML.
	 */
	attributes: {
		isUnlisted: {
			type: 'boolean',
			default: false,
		},
		customThumbnailURL: {
			type: 'string',
			default: '',
		},
		videoID: {
			type: 'string',
			default: '',
		},
		videoTitle: {
			type: 'string',
			default: 'Video',
		},
		loop: {
			type: 'boolean',
			default: false,
		},
		disableTracking: {
			type: 'boolean',
			default: false,
		},
		videoStartAt: {
			type: 'number',
			default: '',
		},
		autoPlay: {
			type: 'boolean',
			default: false,
		},
		playerControls: {
			type: 'boolean',
			default: false,
		},
	},

	/**
	 * Migrate v1 attributes to v2.
	 * All existing attributes are kept; new v2 attributes are initialised with
	 * sensible defaults derived from v1 values where possible.
	 */
	migrate( attributes: V1Attributes ) {
		const { isUnlisted, customThumbnailURL } = attributes;
		return {
			...attributes,
			useCustomThumbnail:
				isUnlisted && customThumbnailURL !== '' ? true : false,
			autoplayThreshold: 75,
			autoplayMuted: true,
			buttonColor: '#62afed',
			gradientOpacity: 0.15,
		};
	},

	/**
	 * v1 save() — must produce byte-for-byte identical HTML to what the
	 * main-branch block generated.  Do not modernise or refactor this output.
	 */
	save( { attributes }: { attributes: V1Attributes } ) {
		const {
			videoID,
			disableTracking,
			loop,
			isUnlisted,
			videoTitle,
			customThumbnailURL,
			autoPlay,
			videoStartAt,
			playerControls,
		} = attributes;

		// Inline v1 parseArgs logic to remain independent of the current utils.
		const parsedVideoID = videoID;
		const parsedVideoStartAt = videoStartAt || 0;
		const parsedLoop = loop ? ( true as const ) : undefined;
		const parsedCustomThumbnailURL =
			isUnlisted && customThumbnailURL !== ''
				? customThumbnailURL
				: undefined;
		const enableTracking =
			false === disableTracking ? ( true as const ) : undefined;
		const showControls =
			true === playerControls ? ( true as const ) : undefined;

		return ! parsedVideoID ? null : (
			<div
				{ ...useBlockProps.save( {
					style: { aspectRatio: '16 / 9', width: '100%' },
				} ) }
			>
				<lite-vimeo
					videoid={ parsedVideoID }
					loop={ parsedLoop }
					customPlaceholder={ parsedCustomThumbnailURL }
					start={ `${ parsedVideoStartAt }s` }
					videoTitle={ videoTitle }
					unlisted={ isUnlisted }
					enableTracking={ enableTracking ? 'true' : undefined }
					autoload={ true === autoPlay ? 'true' : undefined }
					autoplay={ true === autoPlay ? 'true' : undefined }
					showControls={ showControls ? 'true' : undefined }
				/>
			</div>
		);
	},
};

export default [ v1 ];
