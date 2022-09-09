export const BASE_URL = 'http://127.0.0.1:3001';
export const LOGIN_ENDPOINT = '/api/v1/auth/sign_in';
export const LOGOUT_ENDPOINT = '/api/v1/auth/sign_out';
export const POST_IMAGES_ENDPOINT = '/api/v1/images';
export const IMAGES_INDEX_ENDPOINT = '/api/v1/images';
export const DOMAIN_NAME = 'Essential Photo';

// size of the overlays that appear when hovering over the image modal
// (number is percentage of image width)
export const MODAL_ADVANCE_OVERLAY_WIDTH = .15;

// number of pixels that a swipe must move an image in order to trigger
// loading the next image (number is in pixels)
export const SWIPE_DISTANCE_THRESHOLD = 50;