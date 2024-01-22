document.addEventListener("DOMContentLoaded", () => {
  //FETCH ALL USERS
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((users) => {
      // Log the users
      console.log(users);

      // Populate the user select box
      const userSelect = document.getElementById("select-user");
      users.forEach((user) => {
        const option = document.createElement("option");
        option.value = user.id;
        option.textContent = user.username;
        userSelect.appendChild(option);
      });
      userSelect.value = 1;
      // Fetch selected user details
      const centerDiv = document.querySelector(".center");
      const defaultUser = users[0];

      // Create and append elements to .center div
      const username = document.createElement("p");
      username.textContent = defaultUser.name;
      centerDiv.appendChild(username);

      const website = document.createElement("p");
      website.textContent = defaultUser.website;
      centerDiv.appendChild(website);

      const catchPhrase = document.createElement("p");
      catchPhrase.textContent = defaultUser.company.catchPhrase;
      centerDiv.appendChild(catchPhrase);

      const city = document.createElement("p");
      city.textContent = defaultUser.address.city;
      centerDiv.appendChild(city);

      userSelect.addEventListener("change", () => {
        const selectedUserId = parseInt(userSelect.value);
        const selectedUser = users.find((user) => user.id === selectedUserId);

        username.textContent = selectedUser.name;
        website.textContent = selectedUser.website;
        catchPhrase.textContent = selectedUser.company.catchPhrase;
        city.textContent = selectedUser.address.city;
      });
      getUserPosts();
      userSelect.addEventListener("change", getUserPosts);
    });

  //FETCH USERS POST
  function getUserPosts() {
    const userId = document.getElementById("select-user").value;
    console.log(userId);

    // Fetch user's posts
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then((response) => response.json())
      .then((posts) => {
          // Populate the post list
        console.log(posts);
        const postList = document.getElementById("postList");
        postList.innerHTML = ""; // Clear previous posts
        posts.forEach((post) => {
          const listItem = document.createElement("div");
          listItem.textContent = post.body; // + post.title
          postList.appendChild(listItem);
        });

        // Set default selected post (post with ID 1)
        getPostComments(posts[0].id);
      });
  }
  //FETCH POST COMMENTS
  function getPostComments(postId) {
    // Fetch post comments
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
      .then((response) => response.json())
      .then((comments) => {
        // Populate the comment list
        console.log(comments);
        const commentList = document.getElementById("commentList");
        commentList.innerHTML = ""; // Clear previous comments
        comments.forEach((comment) => {
          const listItem = document.createElement("div");
          listItem.textContent = comment.body; //comment.name +
          commentList.appendChild(listItem);
        });
      });
  }
});
