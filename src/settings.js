export const BASE_URL = 'http://127.0.0.1:3001';
export const LOGIN_ENDPOINT = '/api/v1/auth/sign_in';
export const LOGOUT_ENDPOINT = '/api/v1/auth/sign_out';
export const POST_IMAGES_ENDPOINT = '/api/v1/images';
export const UPDATE_IMAGE_ENDPOINT = '/api/v1/images';
export const IMAGES_INDEX_ENDPOINT_PUBLIC_IMAGES_ONLY = '/api/v1/images';
export const IMAGES_INDEX_ENDPOINT_ALL_IMAGES = '/api/v1/images?include_private=true'
export const DOMAIN_NAME = 'Essential Photo';

// size of the overlays that appear when hovering over the ShowImage component
// (number is percentage of image width)
export const SHOW_IMAGE_OVERLAY_WIDTH = .15;

// number of pixels that a swipe must move an image in order to trigger
// loading the next image (number is in pixels)
export const SWIPE_DISTANCE_THRESHOLD = 50;

export const VALID_UPLOAD_FILE_TYPES = ['image/jpeg', 'image/png'];
