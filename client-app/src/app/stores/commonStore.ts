import { makeAutoObservable } from "mobx";
import { serverError } from "../models/serverError";

export default class commonStore {
    error: serverError | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    // Use setServerError = (error: serverError) => {} , so we don't have any binding issues in our class
    setServerError = (error: serverError) => {
        this.error = error;
    }
}