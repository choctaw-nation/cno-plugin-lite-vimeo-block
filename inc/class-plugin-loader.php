<?php
/**
 * Plugin Loader
 *
 * @package ChoctawNation
 * @subpackage LiteVimeo
 */

namespace ChoctawNation\LiteVimeo;

/** Inits the Plugin */
class Plugin_Loader {
	/**
	 * The directory path of the plugin
	 *
	 * @var string $dir_path
	 */
	private string $dir_path;

	/**
	 * Constructor
	 *
	 * @param string $dir_path The directory path of the plugin
	 */
	public function __construct( string $dir_path ) {
		$this->dir_path = $dir_path;
	}

	/**
	 * Initializes the Plugin
	 *
	 * @return void
	 */
	public function activate(): void {
		// nothing to do here
	}

	/**
	 * Handles Plugin Deactivation
	 * (this is a callback function for the `register_deactivation_hook` function)
	 *
	 * @return void
	 */
	public function deactivate(): void {
		// nothing to do here
	}

	/**
	 * Handles Plugin Uninstallation
	 * (this is a callback function for the `register_uninstall_hook` function)
	 */
	public static function uninstall(): void {
		// nothing to do here
	}

	/**
	 * Loads the Plugin
	 */
	public function load_plugin(): void {
		add_action( 'init', array( $this, 'register_block' ) );
		add_action( 'after_setup_theme', array( $this, 'add_image_sizes' ) );
	}

	/**
	 * Register Gutenberg Block
	 */
	public function register_block() {
		$blocks_path = $this->dir_path;
		/**
		 * Registers the block(s) metadata from the `blocks-manifest.php` and registers the block type(s)
		 * based on the registered block metadata.
		 * Added in WordPress 6.8 to simplify the block metadata registration process added in WordPress 6.7.
		 *
		 * @see https://make.wordpress.org/core/2025/03/13/more-efficient-block-type-registration-in-6-8/
		 */
		if ( function_exists( 'wp_register_block_types_from_metadata_collection' ) ) {
			wp_register_block_types_from_metadata_collection( $blocks_path . '/build', $blocks_path . '/build/blocks-manifest.php' );
			return;
		}

		/**
		 * Registers the block(s) metadata from the `blocks-manifest.php` file.
		 * Added to WordPress 6.7 to improve the performance of block type registration.
		 *
		 * @see https://make.wordpress.org/core/2024/10/17/new-block-type-registration-apis-to-improve-performance-in-wordpress-6-7/
		 */
		if ( function_exists( 'wp_register_block_metadata_collection' ) ) {
			wp_register_block_metadata_collection( $blocks_path . '/build', $blocks_path . '/build/blocks-manifest.php' );
		}
		/**
		 * Registers the block type(s) in the `blocks-manifest.php` file.
		 *
		 * @see https://developer.wordpress.org/reference/functions/register_block_type/
		 */
		$manifest_data = require $blocks_path . '/build/blocks-manifest.php';
		foreach ( array_keys( $manifest_data ) as $block_type ) {
			register_block_type( $blocks_path . "/build/{$block_type}" );
		}
	}

	/**
	 * Adds custom image sizes for the plugin
	 */
	public function add_image_sizes(): void {
		$sizes = array(
			'4k'    => array(
				'width'  => 3840,
				'height' => 2160,
			),
			'1080p' => array(
				'width'  => 1920,
				'height' => 1080,
			),
			'720p'  => array(
				'width'  => 1280,
				'height' => 720,
			),
			'480p'  => array(
				'width'  => 854,
				'height' => 480,
			),
		);
		foreach ( $sizes as $handle => $size ) {
			add_image_size( $handle, $size['width'], $size['height'] );
		}
	}
}