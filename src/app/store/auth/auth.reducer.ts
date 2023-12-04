import { users } from "src/app/dashboard/pages/users/models";
import { createReducer, on } from "@ngrx/store";
import { authActions } from "./auth.actions";

export interface State {
    authUser: users | null;
}

const initialState: State = {
    authUser: null,
}
export const authFeatureKey = 'auth';

export const reducer = createReducer(initialState, 
    on(authActions.setAuthUsers, (state, {data})=>({...state, authUser: data})),
    on(authActions.resetState, ()=> initialState))