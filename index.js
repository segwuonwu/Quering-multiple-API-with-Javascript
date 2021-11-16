fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => {
        return response.json();
    })
    .then((data) => {
        appendData(data);
    })
    .catch((err) => {
        console.log('ERROR: ' + err);
    });

const appendData = ((data) => {
    const tableContainer = document.getElementById("users");
    data.forEach(user => {
        let tr = document.createElement("tr");
        let td = document.createElement("td");

        tr.classList.add('names');
        td.innerHTML = user.name;
        td.classList.add('item');
        td.dataset.userId = user.id;
        td.addEventListener('click', (event) => getPosts(event));
        tr.appendChild(td);
        tableContainer.appendChild(tr);
    })
});

const getPosts = ((event) => {
    const userId = event.target.dataset.userId;
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then(response => response.json())
        .then(json => displayPosts(json, event.target))
});

const displayPosts = ((posts, target) => {
    const postsList = target.childNodes[1];

    clearPosts();

    if (postsList) {
        postsList.style.display = 'block';
    } else {
        let postContainer = document.createElement("div");

        posts.forEach(post => {
            let item = document.createElement("span");
            item.classList.add('post');
            let title = document.createElement("strong");
            let body = document.createElement("p");

            title.innerHTML = post.title;
            body.innerHTML = post.body;

            item.appendChild(title);
            item.appendChild(body);
            postContainer.appendChild(item);
        })

        target.appendChild(postContainer);
    }

});

const clearPosts = (() => {
    let users = document.querySelectorAll('.item div');
    for (let i = 0; i < users.length; i++) {
        if (users[i]) {
            users[i].style.display = 'none';
        }
    }
});
