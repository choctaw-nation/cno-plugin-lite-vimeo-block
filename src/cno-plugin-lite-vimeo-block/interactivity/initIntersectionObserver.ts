import { LiteVimeoContext } from '../../types/lite-vimeo';
import { buildIframeSrc } from './buildIframeSrc';
import { actions } from '../view';

export function initIntersectionObserver(
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
