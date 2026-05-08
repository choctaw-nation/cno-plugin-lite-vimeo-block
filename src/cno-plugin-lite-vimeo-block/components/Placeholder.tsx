export default function Placeholder() {
	return (
		<div
			style={ {
				aspectRatio: '16/9',
				border: '2px solid red',
				backgroundColor: 'rgba( 255, 0, 0, 0.5 )',
				alignContent: 'center',
			} }
		>
			<p style={ { textAlign: 'center', fontSize: 40 } }>
				CNO Lite Vimeo Block
			</p>
			<p style={ { textAlign: 'center', fontSize: 20 } }>
				Video ID is required.
			</p>
		</div>
	);
}
