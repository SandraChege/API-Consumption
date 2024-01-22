document.addEventListener('DOMContentLoaded', () => {
    //FETCH ALL USERS
fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((users) => {
    // Log the users array
    console.log(users);

    // Populate the user select box
    const userSelect = document.getElementById("select-user");
    users.forEach((user) => {
      const option = document.createElement("option");
      option.value = user.id;
      option.textContent = user.username;
      userSelect.appendChild(option);
    });

    // Set default selected user (user with ID 1)
    userSelect.value = 1;

    // Display default user's details
    const centerDiv = document.querySelector(".center");
    const defaultUser = users[0]; // Assuming you want to display the details of the first user by default

    // Create and append elements to .center div
    const image = document.createElement("img");
    image.src = ""; // Set the image source based on user data (e.g., user.profileImageURL)
    image.alt = "User Image";
    centerDiv.appendChild(image);

    const nameParagraph = document.createElement("p");
    nameParagraph.textContent = "Name: " + defaultUser.name;
    centerDiv.appendChild(nameParagraph);

    const websiteParagraph = document.createElement("p");
    websiteParagraph.textContent = "Website: " + defaultUser.website;
    centerDiv.appendChild(websiteParagraph);

    const catchphraseParagraph = document.createElement("p");
    catchphraseParagraph.textContent = "Catchphrase: " + defaultUser.company.catchPhrase;
    centerDiv.appendChild(catchphraseParagraph);

    const cityParagraph = document.createElement("p");
    cityParagraph.textContent = "City: " + defaultUser.address.city;
    centerDiv.appendChild(cityParagraph);

    // Event listener for user select change
    userSelect.addEventListener("change", function () {
      const selectedUserId = parseInt(userSelect.value);
      const selectedUser = users.find((user) => user.id === selectedUserId);

      // Update .center div with selected user's details
      image.src = ""; // Set the image source based on selected user data (e.g., selectedUser.profileImageURL)
      nameParagraph.textContent = "Name: " + selectedUser.name;
      websiteParagraph.textContent = "Website: " + selectedUser.website;
      catchphraseParagraph.textContent = "Catchphrase: " + selectedUser.company.catchPhrase;
      cityParagraph.textContent = "City: " + selectedUser.address.city;
    });
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
          const postList = document.getElementById("postList");
          postList.innerHTML = ""; // Clear previous posts
          posts.forEach((post) => {
            const listItem = document.createElement("div");
            listItem.textContent = post.title;
            postList.appendChild(listItem);
          });

          // Set default selected post (post with ID 1)
          getPostComments(posts[0].id);
        });
    }
    //FETCH COMMENTS BY POST
    function getPostComments(postId) {
      // Fetch post comments
      fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
        .then((response) => response.json())
        .then((comments) => {
          // Populate the comment list
          const commentList = document.getElementById("commentList");
          commentList.innerHTML = ""; // Clear previous comments
          comments.forEach((comment) => {
            const listItem = document.createElement("div");
            listItem.textContent = comment.body;
            commentList.appendChild(listItem);
          });
        });
    }
});