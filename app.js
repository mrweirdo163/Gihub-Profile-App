const APIURL = 'https://api.github.com/users/';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');


async function getUser(username) {
    const resp = await fetch(APIURL + username);
    const respData = await resp.json();

    createUserCard(respData);

    getRepos(username);
}

async function getRepos(username) {
    const resp = await fetch(APIURL + username + '/repos');
    const respData = await resp.json();

    addReposToCard(respData);
}


function createUserCard(user) {

    const cardHTML = `
        <div class="card">
            <div>
                <img class="avt" src="${user.avatar_url}" alt="${user.name}" />
            </div>

            <div class="info">
                <h2 class="username">${user.name}</h2>
                <p class="bio">${user.bio}</p>

                <ul class="links">
                    <li>${user.followers}<strong>followers</strong></li>
                    <li>${user.following}<strong>following</strong></li>
                    <li>${user.public_repos}<strong>repos</strong></li>
                </ul>

                <div id="repos"></div>
            </div>
        </div>
    `

    main.innerHTML = cardHTML;
}

function addReposToCard(repos) {
    const reposEl = document.getElementById('repos')

    repos
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 10)
        .forEach(repo => {
        const repoEl = document.createElement('a');
        repoEl.classList.add('repo');

        repoEl.href = repo.html_url;
        repoEl.target = "_blank";
        repoEl.innerText = repo.name;

        reposEl.appendChild(repoEl);
    })
}

form.addEventListener('submit', e => {
    e.preventDefault();

    const username = search.value;

    if(username) {
        getUser(username);

        search.value = '';
    }
})