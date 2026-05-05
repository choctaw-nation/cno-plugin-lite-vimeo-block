import type { BlockAttribute } from '@wordpress/blocks';
import { parseArgs } from '../utils';
import BlockControls from './BlockControls';
import { useBlockProps } from '@wordpress/block-editor';
import Placeholder from './components/Placeholder';
import VideoPoster from './components/VideoPoster';
import { useState, useEffect } from '@wordpress/element';

export default function Edit( props ) {
	const { videoID, videoTitle, customThumbnailURL } = parseArgs(
		props.attributes as BlockAttribute
	);
	const [ isPlaying, setIsPlaying ] = useState( false );
	const [ wrapperClassName, setWrapperClassName ] = useState( 'lv-frame' );
	const [ iframeSource, setIframeSource ] = useState< string | undefined >(
		undefined
	);
	useEffect( () => {
		if ( videoID ) {
			setIframeSource(
				`https://player.vimeo.com/video/${ videoID }?autoplay=0&dnt=1`
			);
		}
		if ( isPlaying ) {
			setWrapperClassName( 'lv-frame lvo-activated' );
			if ( videoID ) {
				setIframeSource(
					`https://player.vimeo.com/video/${ videoID }?autoplay=1&dnt=1`
				);
			}
		} else {
			setWrapperClassName( 'lv-frame' );
			if ( videoID ) {
				setIframeSource(
					`https://player.vimeo.com/video/${ videoID }?autoplay=0&dnt=1`
				);
			}
		}
	}, [ isPlaying, videoID ] );

	const blockProps = useBlockProps();
	return (
		<>
			<BlockControls { ...props } />
			<div { ...blockProps }>
				{ videoID ? (
					<div className={ wrapperClassName }>
						{ ! isPlaying && (
							<>
								<VideoPoster
									customThumbnailURL={ customThumbnailURL }
									videoTitle={ videoTitle }
									context={ {
										videoId: videoID,
										playAriaLabel: `Play: ${ videoTitle }`,
									} }
									scope="editor"
								/>
								<button
									onClick={ () => setIsPlaying( true ) }
									className="lvo-playbtn"
									aria-label={ `Play: ${ videoTitle }` }
								/>
							</>
						) }
						<iframe
							className="lv-iframe"
							title={ videoTitle }
							src={ iframeSource }
							// style={ {
							// 	pointerEvents: ! props.isSelected
							// 		? 'none'
							// 		: undefined,
							// } }
							allowFullScreen
						/>
					</div>
				) : (
					<Placeholder />
				) }
			</div>
		</>
	);
}
