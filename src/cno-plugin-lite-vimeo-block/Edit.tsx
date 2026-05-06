import { useBlockProps } from '@wordpress/block-editor';
import { useState, useEffect } from '@wordpress/element';
import { parseArgs } from '../utils';
import BlockControls from './components/BlockControls';
import Placeholder from './components/Placeholder';
import VideoPoster from './components/VideoPoster';
import { LiteVimeoBlockAttributes } from '../types/lite-vimeo';

export default function Edit( props ) {
	const { videoID, videoHash, videoTitle, customThumbnailURL, videoStartAt } =
		parseArgs( props.attributes as LiteVimeoBlockAttributes );
	const [ isPlaying, setIsPlaying ] = useState( false );
	const [ wrapperClassName, setWrapperClassName ] = useState( 'lv-frame' );
	const [ iframeSource, setIframeSource ] = useState< string | undefined >(
		undefined
	);

	useEffect( () => {
		if ( ! props.isSelected && isPlaying ) {
			setIsPlaying( false );
		}
	}, [ props.isSelected, isPlaying ] );

	useEffect( () => {
		if ( isPlaying ) {
			setWrapperClassName( 'lv-frame lvo-activated' );
			if ( videoID ) {
				const params = new URLSearchParams( {
					autoplay: '1',
					dnt: '1',
					hd: '1',
					autohide: '1',
					controls: '1',
					muted: '0',
				} );
				if ( videoHash ) {
					params.set( 'h', videoHash );
				}
				if ( props.attributes.loop ) {
					params.set( 'loop', '1' );
					params.set( 'muted', '1' );
				}
				const path = `/video/${ videoID }?${ params.toString() }`;
				const srcUrl = new URL( path, 'https://player.vimeo.com/' );
				if ( videoStartAt ) {
					srcUrl.hash = `t=${ videoStartAt }`;
				}
				setIframeSource( srcUrl.toString() );
			}
		} else {
			setWrapperClassName( 'lv-frame' );
			setIframeSource( undefined );
		}
	}, [ isPlaying, videoID, videoHash, videoStartAt, props.attributes.loop ] );
	const blockProps = useBlockProps();
	return (
		<>
			<BlockControls { ...props } />
			<div { ...blockProps }>
				{ videoID ? (
					<div
						className={ wrapperClassName }
						style={
							{
								'--gradient-opacity':
									props.attributes.gradientOpacity,
							} as React.CSSProperties
						}
					>
						{ ! isPlaying && (
							<>
								<VideoPoster
									useCustomThumbnail={
										props.attributes.useCustomThumbnail
									}
									customThumbnailURL={ customThumbnailURL }
									videoTitle={ videoTitle }
									context={ {
										isUnlisted: props.attributes.isUnlisted,
										videoId: videoID,
										posterUrlWebp:
											props.attributes.posterUrlWebp,
										posterUrlJpeg:
											props.attributes.posterUrlJpeg,
									} }
								/>
								<button
									type="button"
									onClick={ () => setIsPlaying( true ) }
									className="lvo-playbtn"
									style={
										{
											'--button-hover-color':
												props.attributes.buttonColor,
										} as React.CSSProperties
									}
									aria-label={ `Play: ${ videoTitle }` }
								/>
							</>
						) }
						<iframe
							className="lv-iframe"
							title={ videoTitle }
							src={ iframeSource }
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
