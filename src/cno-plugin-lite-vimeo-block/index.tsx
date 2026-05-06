import { type BlockConfiguration, registerBlockType } from '@wordpress/blocks';
import { video } from '@wordpress/icons';
import { useBlockProps } from '@wordpress/block-editor';
import './style.scss';

/**
 * Internal dependencies
 */
import block from './block.json';
import { parseArgs } from '../utils';
import Edit from './Edit';
import {
	LiteVimeoBlockAttributes,
	LiteVimeoContext,
} from '../types/lite-vimeo';
import { INTERACTIVITY_STORE } from './consts';
import deprecated from './deprecated';

registerBlockType( block.name, {
	icon: video,
	edit: Edit,
	deprecated,
	save: ( { attributes }: { attributes: LiteVimeoBlockAttributes } ) => {
		const {
			videoID,
			videoHash,
			enableTracking,
			loop,
			isUnlisted,
			autoPlay,
			videoStartAt,
			videoTitle,
			customThumbnailURL,
			showControls,
		} = parseArgs( attributes );

		if ( ! videoID ) {
			return null;
		}

		const context = {
			videoId: videoID,
			isUnlisted,
			hash: videoHash,
			loop: !! loop,
			enableTracking: !! enableTracking,
			videoStartAt: videoStartAt || 0,
			autoPlay,
			autoplayThreshold: attributes.autoplayThreshold,
			autoplayMuted: attributes.autoplayMuted,
			showControls: !! showControls,
			videoTitle,
			useCustomThumbnail: attributes.useCustomThumbnail,
			customThumbnailURL: customThumbnailURL || '',
			iframeLoaded: false,
			posterUrlWebp: '',
			posterUrlJpeg: '',
			iframeSrc: null,
			playAriaLabel: `Play ${ videoTitle || 'Video' }`,
		} as LiteVimeoContext;

		const blockProps = useBlockProps.save( {
			'data-wp-interactive': INTERACTIVITY_STORE,
			'data-wp-context': JSON.stringify( context ),
			'data-wp-init': 'callbacks.init',
			'data-wp-on--pointerover': 'actions.warmConnections',
			'data-wp-run---autoPlayOnScroll': 'callbacks.playOnScrollIntoView',
		} );

		return (
			<div { ...blockProps }>
				<div
					className="lv-frame"
					style={
						{
							'--gradientOpacity': attributes.gradientOpacity,
						} as React.CSSProperties
					}
					data-wp-on--click="actions.addIframe"
					data-wp-class--lvo-activated="context.iframeLoaded"
					data-wp-class--lv-custom-thumb="context.useCustomThumbnail"
				>
					<picture data-wp-bind--hidden="context.iframeLoaded">
						<source
							type="image/webp"
							data-wp-bind--srcset="context.posterUrlWebp"
						/>
						<source
							type="image/jpeg"
							data-wp-bind--srcset="context.posterUrlJpeg"
						/>
						{ /* eslint-disable jsx-a11y/alt-text -- IGNORE: alt is being set via data binding in the save context. */ }
						<img
							className="lv-fallback-placeholder"
							referrerPolicy="origin"
							width={ 1100 }
							height={ 619 }
							decoding="async"
							loading="lazy"
							data-wp-bind--src="context.posterUrlJpeg"
							data-wp-bind--aria-label="context.playAriaLabel"
							data-wp-bind--alt="context.playAriaLabel"
						/>
						{ /* eslint-enable jsx-a11y/alt-text -- IGNORE: alt is being set via data binding in the save context. */ }
					</picture>

					<button
						className="lvo-playbtn"
						type="button"
						style={
							{
								'--button-hover-color': attributes.buttonColor,
							} as React.CSSProperties
						}
						aria-label={ `Play: ${ videoTitle }` }
						data-wp-bind--aria-label="context.playAriaLabel"
						data-wp-bind--hidden="context.iframeLoaded"
					/>
					<iframe
						data-wp-bind--hidden="!context.iframeLoaded"
						className="lv-iframe"
						allow="accelerometer; autoplay; encrypted-media; gyroscope"
						allowFullScreen
						data-wp-bind--src="context.iframeSrc"
						data-wp-bind--muted="context.autoplayMuted"
						title={ videoTitle }
					/>
				</div>
			</div>
		);
	},
} as unknown as BlockConfiguration );
