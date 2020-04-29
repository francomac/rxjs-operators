import { asyncScheduler } from 'rxjs';

// setTimeout(() => {}, 3000)
// setInterval(() => {}, 3000)

const saludar = () => console.log('hola mundo');
const saludar2 = persona => console.log(`hola mundo, soy ${persona.nombre}`);

asyncScheduler.schedule( saludar2, 2000, {nombre:'franco'});

const subs = asyncScheduler.schedule( function(state) {
    console.log('state', state);

    this.schedule(state + 1, 1000);
}, 3000, 0)

// setTimeout( () => {
//     subs.unsubscribe();
// }, 6000)

asyncScheduler.schedule( () => subs.unsubscribe(), 6000)