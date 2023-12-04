import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { users } from "src/app/dashboard/pages/users/models";

export const authActions = createActionGroup({
    source: 'Auth',
    events: {
        'Set Auth Users': props<{ data: users}>(),
        'Reset State': emptyProps()
    }
})