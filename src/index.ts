import { fromEvent, Observable } from 'rxjs';
import { debounceTime, map, pluck, mergeAll } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { GithubUser } from './interfaces/github-user.interface';
import { GithubUsers } from './interfaces/github-users.interface';

// referencias
const body = document.querySelector('body');
const textInput = document.createElement('input');
textInput.placeholder = 'Type your github user';
const orderList = document.createElement('ol');
body.append(textInput, orderList);

// helpers
const mostrarUsuarios = (usuarios: GithubUser[]) => {
    orderList.innerHTML = '';

    for(const usuario of usuarios) {
        const li = document.createElement('li');
        const img = document.createElement('img');
        img.src = usuario.avatar_url;

        const anchor = document.createElement('a');
        anchor.href = usuario.html_url;
        anchor.text = 'Ver...';
        anchor.target = '_blank';

        li.append(img);
        li.append(usuario.login + ' ');
        li.append(anchor);

        orderList.append(li);
    }
}

// streams
const input$ = fromEvent<KeyboardEvent>(textInput, 'keyup');

input$.pipe(
    debounceTime<KeyboardEvent>(500),
    pluck<KeyboardEvent, string>('target', 'value'),
    map<string, Observable<GithubUsers>>(texto => ajax.getJSON(`https://api.github.com/search/users?q=${texto}`)),
    mergeAll<GithubUsers>(),
    pluck<GithubUsers, GithubUser[]>('items')
).subscribe(mostrarUsuarios)