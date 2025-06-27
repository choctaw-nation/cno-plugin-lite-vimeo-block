/**
 * Handles the properties for the lite-vimeo component
 */
export default class BaseElement extends HTMLElement {
	/**
	 * The Shadow DOM Root
	 *
	 */
	shadowRoot: ShadowRoot;

	/**
	 * Whether the iframe has been loaded
	 */
	iframeLoaded: boolean = false;

	/**
	 * The `div#frame` of the shadowDOM that the iframe will be inserted into
	 *
	 */
	domRefFrame: HTMLDivElement;

	/**
	 * The `img` elements of the shadowDOM that will be used as placeholders
	 */
	domRefImg: {
		fallback: HTMLImageElement;
		webp: HTMLSourceElement;
		jpeg: HTMLSourceElement;
	};

	/**
	 * The play button element
	 */
	domRefPlayButton: HTMLButtonElement;

	/**
	 * The private hash for unlisted videos
	 */
	hash: string | undefined = undefined;

	/**
	 * Whether the Vimeo assets have been preconnected
	 *
	 */
	static preconnected: boolean = false;

	constructor() {
		super();
	}

	static get observedAttributes() {
		return [ 'videoid' ];
	}

	get isUnlisted() {
		return this.hasAttribute( 'unlisted' );
	}

	get enableTracking() {
		return this.hasAttribute( 'enabletracking' );
	}

	get hasCustomPlaceholder() {
		return this.hasAttribute( 'customplaceholder' );
	}

	get customPlaceholder() {
		return this.getAttribute( 'customplaceholder' ) || '';
	}

	get videoId() {
		const videoId = this.getAttribute( 'videoid' );
		if ( ! videoId ) {
			return '';
		}
		if ( this.isUnlisted ) {
			const [ vimeoId, privateHash ] = videoId.split( '/' );
			this.hash = privateHash;
			return vimeoId;
		}
		return videoId;
	}

	get loop() {
		return this.hasAttribute( 'loop' );
	}

	/**
	 * Set the video ID
	 * @param {string} id
	 */
	set videoId( id: string ) {
		this.setAttribute( 'videoid', id );
	}

	get videoPlay() {
		return this.getAttribute( 'videoplay' ) || 'Play';
	}

	/**
	 * Alters the "Play" button text
	 * @param {string} name
	 */
	set videoPlay( name: string ) {
		this.setAttribute( 'videoplay', name );
	}

	/**
	 * Get the title of the video
	 * @returns {string} the video title or "Video"
	 */
	get videoTitle(): string {
		return this.getAttribute( 'videotitle' ) || 'Video';
	}

	/**
	 * Set the title of the video
	 *
	 * @param {string} title the title of the video
	 */
	set videoTitle( title: string ) {
		this.setAttribute( 'videotitle', title );
	}

	/**
	 * Get the start time of the video
	 * @returns {string} the start time or "0s"
	 */
	get videoStartAt(): string | null {
		return this.getAttribute( 'start' );
	}

	/**
	 * Set the start time of the video
	 * @param {string} time the start time of the video
	 */
	set videoStartAt( time: string ) {
		this.setAttribute( 'start', time );
	}

	/**
	 * Get the autoLoad property
	 * @returns {boolean} the autoLoad property
	 */
	get autoLoad(): boolean {
		return this.hasAttribute( 'autoload' );
	}

	/**
	 * Alters the autoLoad property
	 *
	 * @param {boolean} value
	 */
	set autoLoad( value: boolean ) {
		if ( value ) {
			this.setAttribute( 'autoload', '' );
		} else {
			this.removeAttribute( 'autoload' );
		}
	}

	/**
	 * Get the autoPlay property
	 *
	 * @returns {boolean} the autoPlay property
	 */
	get autoPlay(): boolean {
		return this.hasAttribute( 'autoplay' );
	}

	/**
	 * Alters the autoPlay property
	 *
	 * @param {boolean} value
	 */
	set autoPlay( value: boolean ) {
		if ( value ) {
			this.setAttribute( 'autoplay', 'autoplay' );
		} else {
			this.removeAttribute( 'autoplay' );
		}
	}
}
