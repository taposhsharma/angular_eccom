import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import * as MyActions from './app.actions';

@Injectable()
export class MyEffects {
  // Example effect
  // @Effect()
  // someEffect$ = this.actions$.pipe(
  //   ofType(MyActions.someAsyncAction),
  //   mergeMap(() =>
  //     this.myService.someAsyncMethod().pipe(
  //       map(data => MyActions.someAsyncActionSuccess({ data })),
  //       catchError(error => of(MyActions.someAsyncActionFailure({ error })))
  //     )
  //   )
  // );

  constructor(private actions$: Actions) {}
}
