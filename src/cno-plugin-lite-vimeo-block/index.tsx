import {
	type BlockAttributes,
	type BlockConfiguration,
	registerBlockType,
} from '@wordpress/blocks';
import { video } from '@wordpress/icons';
import { useBlockProps } from '@wordpress/block-editor';
import './style.scss';

/**
 * Internal dependencies
 */
import block from './block.json';
import { parseArgs } from '../utils';
import Edit from './Edit';
import VideoPoster from './components/VideoPoster';

registerBlockType( block.name, {
	icon: video,
	edit: Edit,
	save: ( { attributes }: { attributes: BlockAttributes } ) => {
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
			showControls: !! showControls,
			videoTitle,
			customThumbnailURL: customThumbnailURL || '',
			iframeLoaded: false,
			posterUrlWebp: '',
			posterUrlJpeg: '',
			iframeSrc: null,
			playAriaLabel: `Play: ${ videoTitle }`,
		};
		const blockProps = useBlockProps.save( {} );

		return (
			<div
				{ ...blockProps }
				data-wp-interactive="cno-lite-vimeo"
				data-wp-context={ JSON.stringify( context ) }
				data-wp-init="callbacks.init"
				data-wp-on--pointerover="actions.warmConnections"
			>
				<div
					className={ `lv-frame${
						customThumbnailURL ? ' lv-custom-thumb' : ''
					}` }
					data-wp-on--click="actions.addIframe"
					data-wp-class--lvo-activated="context.iframeLoaded"
				>
					<VideoPoster
						context={ context }
						scope="save"
						customThumbnailURL={ customThumbnailURL }
						videoTitle={ videoTitle }
					/>

					<button
						className="lvo-playbtn"
						aria-label={ `Play: ${ videoTitle }` }
						data-wp-bind--aria-label="context.playAriaLabel"
					/>
					<iframe
						className="lv-iframe"
						allow="accelerometer; autoplay; encrypted-media; gyroscope"
						allowFullScreen
						data-wp-bind--src="context.iframeSrc"
						data-wp-bind--muted="context.autoPlay"
						title={ videoTitle }
					/>
				</div>
			</div>
		);
	},
} as unknown as BlockConfiguration );
