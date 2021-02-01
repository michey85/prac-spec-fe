const ROOT_URL = "https://prac.alexp007.ru";

// Apartments urls
export const URL_ALL_APPS = ROOT_URL + "/api/apartments/all";
export const URL_ADD_AP = ROOT_URL + "/api/apartments";
export const getAppUrl = id => ROOT_URL + `/api/apartments/${id}`;
export const getImgUploadUrl = id => ROOT_URL + `/api/apartments/${id}/image`;
export const URL_ALL_BY_USER = ROOT_URL + `/api/apartments`;

// Users urls
export const URL_NEW_USER = ROOT_URL + "/auth/register";
export const URL_UPDATE_USER = ROOT_URL + "/auth/update";
export const URL_LOGIN = ROOT_URL + "/auth/login";
export const URL_LOGOUT = ROOT_URL + "/auth/logout";
