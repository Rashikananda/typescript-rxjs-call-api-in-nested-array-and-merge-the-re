// Import stylesheets
import './style.css';
import { fromEvent, merge, of, from } from 'rxjs';
import { map, filter, concatMap, toArray, tap, delay, concatAll, mergeMap,mergeAll } from 'rxjs/operators';
// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>if you dont want concurrent request then you can use concat instead of merge</h1>`;
console.clear();

const data$ = of([{
  familiId: '1',
  familyMemmbers: [
   { id: '1',
     name: 'Tom'
    },
    { id: '2',
     name: 'Peter'
    }
   ]
 },
{
  familiId: '2',
  familyMemmbers: [
   { id: '1',
     name: 'Paul'
    },
    { id: '2',
     name: 'Joe'
    }
   ]
 }])
const q = (x) => {
  // Fake http call 
  const oneSecondSource$ = of(x['id']).pipe(delay(1 * x.id))
  return oneSecondSource$.pipe(map(abs => {
    
    return { ...x, contarct: x['id'] + x['name'] }
  }));
}

const p = (obj) => {
  // mapping each
  return from(obj.familyMemmbers).pipe(mergeMap(q), toArray(), map(a => {
    return { ...obj, familyMemmbers: a }
  }))
}
const example$ = data$.pipe(mergeMap(a => from(a).pipe(map(p))),
  mergeAll(),
  toArray()
);
example$.subscribe(console.log)
