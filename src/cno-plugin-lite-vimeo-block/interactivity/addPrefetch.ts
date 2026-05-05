export function addPrefetch(
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
