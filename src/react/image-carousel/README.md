The image carousel component takes in an array of image URLs.

Layout and positioning:
* The image carousel should be centered on the screen with a maximum size of 600px by 400px.
* Images should shrink to fit within the carousel so that the entire image is visible. Empty parts of the carousel can be filled with black.
* If the screen width is smaller than the image, the carousel should be resized to fit within the available horizontal space.

Navigation:
* Add left/right navigation buttons to allow the user to navigate through the images. The buttons should allow a cycling behavior, i.e. after the last image, the image cycles back to the first.
* Add page buttons at the bottom to directly jump to an image. You may assume there will be fewer than 10 images.

Note: The focus of this question is on functionality, not the styling.

Run: `npx vite src/react/image-carousel/`


