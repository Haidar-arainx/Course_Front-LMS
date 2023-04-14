const currentUser = JSON.parse(localStorage.getItem("gogo_current_user"));
export const user = currentUser?.user;
export const TOKEN = currentUser?.token;
export const DefaultImage =
  "https://spng.pngfind.com/pngs/s/292-2924933_image-result-for-png-file-user-icon-black.png";
export const DEFAULT_COURSE_IAMGE =
  "https://media.istockphoto.com/id/1366428092/photo/webinar-e-learning-skills-business-internet-technology-concepts-training-webinar-e-learning.jpg?b=1&s=170667a&w=0&k=20&c=qjK4h0qt4W_NNG8TmboGw8RDRv8TNzEoFM_JEDZ1Ah0=";
