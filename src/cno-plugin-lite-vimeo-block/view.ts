import { store, getContext, getElement } from '@wordpress/interactivity';
import { LiteVimeoContext } from '../types/lite-vimeo';
import { addPrefetch } from './interactivity/addPrefetch';
import { buildIframeSrc } from './interactivity/buildIframeSrc';
import { loadImagePlaceholder } from './interactivity/loadImagePlaceholder';
import { initIntersectionObserver } from './interactivity/initIntersectionObserver';

interface LiteVimeoState {
	preconnected: boolean;
}

export const { state, actions } = store( 'cno-lite-vimeo', {
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
			vimeoOrigins.forEach( ( url ) => addPrefetch( 'preconnect', url ) );
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
				if ( ! state.preconnected ) {
					addPrefetch( 'preconnect', 'https://i.vimeocdn.com/' );
					state.preconnected = true;
				}
				await loadImagePlaceholder( context );
			}

			if ( context.autoPlay && ref ) {
				initIntersectionObserver( context, ref );
			}
		},
	},
} );
