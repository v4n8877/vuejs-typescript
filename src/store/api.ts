import axios from 'axios';
import { UserSubmit, UserResponse, ListItem } from './models';

const getToken = localStorage.getItem('USER_TOKEN');

export const callApi = axios.create({
  baseURL: 'http://54.169.183.92',
});

export function setJWT(getToken: string) {
  callApi.defaults.headers.common['Authorization'] = `${getToken}`;
}

export function clearJWT() {
  delete callApi.defaults.headers.common['Authorization'];
}

export async function loginUser(user: UserSubmit): Promise<UserResponse | undefined> {
  try {
    const response =  await callApi.post('/v1/login', user);
    return (response.data as UserResponse);
  } catch (e) {
    return e;
  }
}

export async function getListItem(): Promise<ListItem | undefined> {
  try {
    const response = await callApi.get('/v1/manager/products', {
      "headers": {
        "Authorization": getToken,
      },
    })
    return (response.data as ListItem);
  } catch (e) {
    return e;
  }
}