# cno-plugin-lite-vimeo-block

This block forks the [lite-vimeo](https://github.com/choctaw-nation/lite-vimeo) JS and updates it to render correctly within the Block Editor (Gutenberg) and on save.

## Changelog

### v1.1.0

-   Added: Supports Autoplay for use as a Background video!
    -   Note: setting "Autoplay" to `true` automatically loads vimeo in, mutes the video and turns off controls.
-   Fixed: VideoStartAt bug has been fixed
-   Fixed: Alternate video title bug has been fixed
-   Removed: Unused dependency has been removed

### v1.0.2

-   Fixed: lite-vimeo is now only enqueued when the block is present.

### v1.0.1

-   Fixed: Added missing `blocks-manifest.php` file

### v1.0.0

-   Init!
