# CNO Plugin: Lite Vimeo Block

This block forks the [lite-vimeo](https://github.com/choctaw-nation/lite-vimeo) JS and updates it to render correctly within the Block Editor (Gutenberg) and on save.

## Changelog

### v2.0.0 - [May 5, 2026]

-   Breaking: Swap shadow-dom based code for @wordpress/interactivity
-   Added: New styles controls
-   Added: Better autoplay controls

### v1.2.3 - [March 18, 2026]

-   Chore: Update packages
-   Chore: Update deploy workflow

### v1.2.2 - [December 10, 2025]

-   Fixed: Block now properly handles `dnt` parameter
-   Chore: Update packages

### v1.2.1

-   Tweak: Added tooling
-   Tweak: Updated CI/CD

### v1.1.1

-   Fixed: Suppressed `console.log` on the lite-vimeo element.

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
