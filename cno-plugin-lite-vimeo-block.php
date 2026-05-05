<?php
/**
 * Plugin Name:       CNO Lite Vimeo Block
 * Plugin URI:        https://github.com/choctawnation/cno-plugin-lite-vimeo-block
 * Description:       A block that uses lite-vimeo to load Vimeo videos in a lightweight, performant way.
 * Version:           2.0.0
 * Requires at least: 6.7
 * Requires PHP:      8.2
 * Tested up to:      6.9.4
 * Author:            Choctaw Nation of Oklahoma
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       cno-plugin-lite-vimeo-block
 *
 * @package ChoctawNation
 * @subpackage LiteVimeo
 */

use ChoctawNation\LiteVimeo\Plugin_Loader;

if ( ! defined( 'ABSPATH' ) ) {
	die;
}

$cno_autoload_path = __DIR__ . '/vendor/autoload.php';

if ( ! file_exists( $cno_autoload_path ) ) {
	add_action(
		'admin_notices',
		static function () {
			echo '<div class="notice notice-error"><p>Choctaw Plugin Starter is missing required dependencies. Please run Composer install or deploy the plugin with its vendor directory included.</p></div>';
		}
	);

	return;
}

require_once $cno_autoload_path;

$lite_vimeo_plugin = new Plugin_Loader( __DIR__ );
// Plugin Lifecycle Hooks
register_activation_hook( __FILE__, array( $lite_vimeo_plugin, 'activate' ) );

// Static method for uninstall since the plugin can't rely on instance methods.
register_uninstall_hook( __FILE__, array( 'ChoctawNation\LiteVimeo\Plugin_Loader', 'uninstall' ) );

// Load the Plugin
add_action( 'plugins_loaded', array( $lite_vimeo_plugin, 'load_plugin' ) );
