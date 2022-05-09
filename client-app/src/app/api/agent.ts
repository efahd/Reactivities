import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";
import { Activity } from "../models/activity";
import { store } from "../stores/store";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api'
// Add <T> as in Type. 
const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.response.use(async response => {

    await sleep(1000);
    return response;
}, (error: AxiosError) => {
    const {data, status, config} = error.response!;

    switch (status) {
        case 400: 

            // pass the data to toast method if data type is 'string'
            if (typeof data === 'string') {
                toast.error(data);
            }
            // Check to see if config.method equal to get
            // And check data.errors properties has the 'id' property
            if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
                // We're gonna pass this data to the /not-found component
                history.push('/not-found');
            }

            //check data if it contains the error objects.
            if (data.errors) {
                // store error objects inside modalStateErrors as an Array.
                const modalStateErrors = [];

                // Check to see if we have data errors by looking a specific [key] inside. 
                // [key] is a object property access syntax
                for (const key in data.errors) {
                    if (data.errors[key]){
                        // pass the key
                        modalStateErrors.push(data.errors[key])
                    }
                }
                // throw back to the component
                // flat method is too flatten the array, so we get the list of string.
                throw modalStateErrors.flat();                
            }
            break;
        case 401:
            toast.error('unauthorized');
            break;
        case 404:
            toast.error('not-found');
            history.push('/not-found');
            break;
        case 500:
            store.commonStore.setServerError(data);
            history.push('/server-error');
            break;
    }
    return Promise.reject(error);
})

const request = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

// return void from activities
const activities = {
    list: () => request.get<Activity[]>('/activities'),
    details: (id: string) => request.get<Activity>(`/activities/${id}`),
    create: (activity: Activity) => request.post<void>('/activities', activity),
    update: (activity: Activity) => axios.put<void>(`/activities/${activity.id}`, activity),
    delete: (id: string) => axios.delete<void>(`/activities/${id}`)
}

const agents = {
    activities
}

export default agents;
