<?php
// This file is generated. Do not modify it manually.
return array(
	'cno-plugin-lite-vimeo-block' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'cno-lite-vimeo/cno-plugin-lite-vimeo-block',
		'version' => '0.1.0',
		'title' => 'CNO Lite Vimeo Block',
		'category' => 'embed',
		'icon' => 'video-alt3',
		'description' => 'A block that uses lite-vimeo ',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'align' => true,
			'dimensions' => array(
				'minHeight' => true
			),
			'customClassName' => true,
			'spacing' => array(
				'margin' => array(
					'top',
					'bottom'
				)
			)
		),
		'attributes' => array(
			'isUnlisted' => array(
				'type' => 'boolean',
				'default' => false
			),
			'customThumbnailURL' => array(
				'type' => 'string',
				'default' => ''
			),
			'videoID' => array(
				'type' => 'string',
				'default' => '',
				'required' => true
			),
			'videoTitle' => array(
				'type' => 'string',
				'default' => ''
			),
			'autoload' => array(
				'type' => 'boolean',
				'default' => false
			),
			'autoplay' => array(
				'type' => 'boolean',
				'default' => false
			),
			'loop' => array(
				'type' => 'boolean',
				'default' => false
			),
			'enableTracking' => array(
				'type' => 'boolean',
				'default' => true
			)
		),
		'script' => 'file:./script.js',
		'editorScript' => 'file:./index.js'
	)
);
