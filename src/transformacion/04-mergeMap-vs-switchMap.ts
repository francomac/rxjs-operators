import { fromEvent, interval } from 'rxjs';
import { mergeMap, switchMap } from 'rxjs/operators';


const click$ = fromEvent(document, 'click');
const interval$ = interval(500);

click$.pipe(
    switchMap( () => interval$)
).subscribe(console.log)