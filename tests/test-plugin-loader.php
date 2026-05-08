<?php
/**
 * Sample test case.
 * Delete me on init
 *
 * @package ChoctawNation
 */

namespace ChoctawNation\Tests;

use ChoctawNation\LiteVimeo\Plugin_Loader;
use WP_UnitTestCase;

/**
 * Class Test_Plugin_Loader
 */
class Test_Plugin_Loader extends WP_UnitTestCase {
	/**
	 * The image sizes to test
	 *
	 * @var array $sizes
	 */
	private array $sizes;

	/**
	 * Set up the test environment
	 */
	public function set_up() {
		parent::set_up();
		$plugin_loader = new Plugin_Loader( dirname( __DIR__, 1 ) );
		$this->sizes   = $plugin_loader->sizes;
		$plugin_loader->load_plugin();
	}

	/**
	 * Test that the image sizes are registered
	 */
	public function test_image_sizes_are_registered() {
		$registered_sizes = wp_get_additional_image_sizes();
		foreach ( $this->sizes as $handle => $size ) {
			$this->assertTrue( has_image_size( $handle ) );
			$this->assertArrayHasKey( $handle, $registered_sizes );
			$image_size = $registered_sizes[ $handle ];
			$this->assertEquals( $size['width'], $image_size['width'] );
			$this->assertEquals( $size['height'], $image_size['height'] );
		}
	}

	/**
	 * Test that the image size names are registered
	 */
	public function test_image_size_names_are_registered() {
		$sizes          = apply_filters( 'image_size_names_choose', array() );
		$expected_sizes = array_keys( $this->sizes );
		foreach ( $expected_sizes as $size ) {
			$this->assertArrayHasKey( $size, $sizes );
		}

		$this->assertSame( '4K (3840x2160)', $sizes['4k'] );
		$this->assertSame( '1080p (1920x1080)', $sizes['1080p'] );
		$this->assertSame( '720p (1280x720)', $sizes['720p'] );
		$this->assertSame( '480p (854x480)', $sizes['480p'] );
	}

	/**
	 * Test that the image sizes are generated when an image is uploaded
	 */
	public function test_generated_image_sizes_exists() {
		$attachment_id = $this->upload_sample_image();
		$metadata      = wp_get_attachment_metadata( $attachment_id );
		$this->assertArrayHasKey( 'sizes', $metadata );

		$this->assertArrayHasKey( '4k', $metadata['sizes'] );
		$this->assertArrayHasKey( '1080p', $metadata['sizes'] );
		$this->assertArrayHasKey( '720p', $metadata['sizes'] );
		$this->assertArrayHasKey( '480p', $metadata['sizes'] );
	}

	/**
	 * Uploads a sample image to the media library and returns the attachment ID
	 *
	 * @return int The attachment ID of the uploaded image
	 * @throws \Exception If the image upload fails.
	 */
	private function upload_sample_image(): int {
		$filename      = __DIR__ . '/sample-4k-wallpaper.jpg';
		$attachment_id = $this->factory()->attachment->create_upload_object( $filename );
		if ( ! is_int( $attachment_id ) ) {
			throw new \Exception( 'Failed to upload sample image.' );
		}
		return $attachment_id;
	}

	/**
	 * Test that the image sizes are accessible via the block editor REST API
	 */
	public function test_that_image_sizes_are_accessible_via_block_editor_rest() {
		$attachment_id = $this->upload_sample_image();
		$request       = new \WP_REST_Request( 'GET', "/wp/v2/media/{$attachment_id}" );
		$response      = rest_do_request( $request );
		$this->assertEquals( 200, $response->get_status() );
		$data = $response->get_data();
		$this->assertArrayHasKey( 'media_details', $data );
		$this->assertArrayHasKey( 'sizes', $data['media_details'] );
		$sizes = $data['media_details']['sizes'];
		foreach ( array_keys( $this->sizes ) as $size ) {
			$this->assertArrayHasKey( $size, $sizes );
		}
	}
}
