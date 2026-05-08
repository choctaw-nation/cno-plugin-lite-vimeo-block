import {
	store,
	getContext,
	getElement,
	useState,
	useEffect,
} from '@wordpress/interactivity';
import {
	LiteVimeoContext,
	UnlistedLiteVimeoContext,
} from '../types/lite-vimeo';
import { buildIframeSrc } from './interactivity/buildIframeSrc';
import { fetchVimeoPoster } from './interactivity/fetchVimeoPoster';
import { INTERACTIVITY_STORE } from './consts';

interface LiteVimeoState {
	preconnected: boolean;
}

export const { state, actions, callbacks } = store( INTERACTIVITY_STORE, {
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
				callbacks.addPrefetch( 'preconnect', url )
			);
			state.preconnected = true;
		},

		addIframe() {
			const context = getContext<
				LiteVimeoContext | UnlistedLiteVimeoContext
			>();
			if ( context.iframeLoaded ) {
				return;
			}
			context.iframeSrc = buildIframeSrc( context );
			context.iframeLoaded = true;
		},
	},

	callbacks: {
		async init() {
			const context = getContext<
				LiteVimeoContext | UnlistedLiteVimeoContext
			>();

			if ( ! context.useCustomThumbnail ) {
				await fetchVimeoPoster( context );
				if ( ! state.preconnected ) {
					actions.warmConnections();
				}
			} else {
				context.posterUrlJpeg = context.customThumbnailURL;
			}
		},
		playOnScrollIntoView() {
			const context = getContext<
				LiteVimeoContext | UnlistedLiteVimeoContext
			>();
			if ( ! context.autoPlay ) {
				return;
			}
			/* eslint-disable react-hooks/rules-of-hooks */
			const [ inView, setInView ] = useState( false );

			useEffect( () => {
				if (
					! ( 'IntersectionObserver' in window ) ||
					! ( 'IntersectionObserverEntry' in window )
				) {
					return;
				}
				const observer = new IntersectionObserver(
					( [ entry ] ) => {
						setInView( entry.isIntersecting );
					},
					{
						root: null,
						rootMargin: '0px',
						threshold: context.autoplayThreshold / 100,
					}
				);
				const { ref } = getElement();
				observer.observe( ref );
				return () => ref && observer.unobserve( ref );
			}, [ context.autoplayThreshold ] );

			useEffect( () => {
				if ( inView && ! context.iframeLoaded ) {
					actions.warmConnections();
					actions.addIframe();
				}
			}, [ inView, context.iframeLoaded ] );
		},
		addPrefetch(
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
		},
	},
} );
