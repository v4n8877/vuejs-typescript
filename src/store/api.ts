import axios from 'axios';
import { UserSubmit, UserResponse, ListItem, Item } from './models';

const getToken = localStorage.getItem('USER_TOKEN');

export const callApi = axios.create({
  baseURL: 'http://54.169.183.92',
});

export function setJWT() {
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
    const response = await callApi.get('/v1/manager/products');
    return (response.data as ListItem);
  } catch (e) {
    return e;
  }
}

export async function updateItem(item: Item): Promise<ListItem | undefined> {
  delete item.link;
  const formData = new FormData();
  // tslint:disable-next-line:forin
  for (const key in item) {
    if (item.hasOwnProperty(key)) {
      formData.append(key, item[key]);
    }
  }
  try {
    const response = await callApi.put(`/v1/manager/products/${item.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return (response.data as ListItem);
  } catch (e) {
    return e;
  }
}

export async function deleteItem(item: Item): Promise<ListItem | undefined> {
  try {
    const response = await callApi.delete(`/v1/manager/products/${item.id}`);
    return (response.data as ListItem);
  } catch (e) {
    return e;
  }
}

export async function addItem(item: Item): Promise<ListItem | undefined> {
  delete item.link;
  const formData = new FormData();
  // tslint:disable-next-line:forin
  for (const key in item) {
    if (item.hasOwnProperty(key)) {
      formData.append(key, item[key]);
    }
  }
  try {
    const response = await callApi.post(`/v1/manager/products`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return (response.data as ListItem);
  } catch (e) {
    return e;
  }
}

export async function getDetail(item: Item): Promise<ListItem | undefined> {
  try {
    const response = await callApi.get(`/v1/manager/products/${item}`);
    return (response.data as ListItem);
  } catch (e) {
    return e;
  }
}
