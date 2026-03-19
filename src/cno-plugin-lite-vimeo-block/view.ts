import { store, getContext, getElement } from '@wordpress/interactivity';

interface LiteVimeoContext {
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

interface LiteVimeoState {
	preconnected: boolean;
}

function addPrefetch(
	kind: 'preload' | 'preconnect',
	url: string,
	as: string | null = null
) {
	const linkElem = document.createElement( 'link' );
	linkElem.rel = kind;
	linkElem.href = url;
	if ( as ) {
		linkElem.as = as;
	}
	linkElem.crossOrigin = 'true';
	document.head.append( linkElem );
}

function buildIframeSrc( context: LiteVimeoContext ): string {
	const {
		videoId,
		isUnlisted,
		hash,
		loop,
		enableTracking,
		autoPlay,
		showControls,
		videoStartAt,
	} = context;

	let params = 'hd=1&autohide=1&autoplay=1';
	params += loop ? '&loop=1' : '';
	params += enableTracking ? '' : '&dnt=1';
	params += autoPlay ? '&muted=1' : '';

	let controls = true;
	if ( autoPlay ) {
		controls = false;
		if ( showControls ) {
			controls = true;
		}
	}
	params += false === controls ? '&controls=0' : '';

	const path = `/video/${ videoId }${
		isUnlisted ? `?h=${ hash }&${ params }` : `?${ params }`
	}`;
	const srcUrl = new URL( path, 'https://player.vimeo.com/' );
	if ( videoStartAt ) {
		srcUrl.hash = `t=${ videoStartAt }`;
	}
	return srcUrl.toString();
}

async function loadImagePlaceholder( context: LiteVimeoContext ) {
	if ( ! state.preconnected ) {
		addPrefetch( 'preconnect', 'https://i.vimeocdn.com/' );
		state.preconnected = true;
	}

	try {
		const apiUrl = `https://vimeo.com/api/v2/video/${ context.videoId }.json`;
		const apiResponse = ( await ( await fetch( apiUrl ) ).json() )[ 0 ];
		const tnLarge = apiResponse.thumbnail_large as string;
		const imgId = tnLarge
			.slice( tnLarge.lastIndexOf( '/' ) + 1 )
			.split( '_' )[ 0 ];

		context.posterUrlWebp = `https://i.vimeocdn.com/video/${ imgId }.webp?mw=1100&mh=619&q=70`;
		context.posterUrlJpeg = `https://i.vimeocdn.com/video/${ imgId }.jpg?mw=1100&mh=619&q=70`;
	} catch ( err ) {
		// eslint-disable-next-line no-console
		console.error( 'Lite Vimeo: Failed to load thumbnail', err );
	}
}

function initIntersectionObserver(
	context: LiteVimeoContext,
	ref: HTMLElement
) {
	if (
		! ( 'IntersectionObserver' in window ) ||
		! ( 'IntersectionObserverEntry' in window )
	) {
		return;
	}

	const intersectionObserver = new IntersectionObserver(
		( entries, observer ) => {
			entries.forEach( ( entry ) => {
				if ( entry.isIntersecting && ! context.iframeLoaded ) {
					actions.warmConnections();
					context.iframeSrc = buildIframeSrc( context );
					context.iframeLoaded = true;
					observer.unobserve( ref );
				}
			} );
		},
		{ root: null, rootMargin: '0px', threshold: 0 }
	);

	intersectionObserver.observe( ref );
}

const { state, actions } = store< { state: LiteVimeoState } >(
	'cno-lite-vimeo',
	{
		state: {
			preconnected: false,
		} as LiteVimeoState,

		actions: {
			warmConnections() {
				if ( state.preconnected ) {
					return;
				}
				const vimeoOrigins = [
					'https://f.vimeocdn.com',
					'https://player.vimeo.com',
					'https://i.vimeocdn.com',
				];
				vimeoOrigins.forEach( ( url ) =>
					addPrefetch( 'preconnect', url )
				);
				state.preconnected = true;
			},

			addIframe() {
				const context = getContext< LiteVimeoContext >();
				if ( context.iframeLoaded ) {
					return;
				}
				context.iframeSrc = buildIframeSrc( context );
				context.iframeLoaded = true;
			},
		},

		callbacks: {
			async init() {
				const context = getContext< LiteVimeoContext >();
				const { ref } = getElement();

				if ( ! context.isUnlisted && ! context.customThumbnailURL ) {
					await loadImagePlaceholder( context );
				}

				if ( context.autoPlay && ref ) {
					initIntersectionObserver( context, ref );
				}
			},
		},
	}
);
