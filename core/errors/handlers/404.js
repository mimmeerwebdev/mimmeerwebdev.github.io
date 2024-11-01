// 404.js

function handle404() {
  // Choose a random 404 error page
  const errorFiles = ['unicorn.txt', 'blackhole.txt']; // List of error files
  const randomErrorFile = errorFiles[Math.floor(Math.random() * errorFiles.length)];
  const randomErrorPath = 'core/errors/404/' + randomErrorFile;

  // Fetch the random 404 error page
  fetch(randomErrorPath)
    .then(response => response.text())
    .then(errorContent => {
      // Assuming you have a container element with the ID 'error-content'
      const errorContentElement = document.getElementById('error-content');
      errorContentElement.innerHTML = errorContent;
    })
    .catch(error => {
      // Handle the error if the random 404 page cannot be fetched
      console.error('Error fetching 404 error page:', error);
      const errorContentElement = document.getElementById('error-content');
      errorContentElement.innerHTML = '<h1>404 - Page Not Found</h1><p>An error occurred while fetching the 404 error page.</p>';
    });
}

// Call the handle404 function to trigger the error handling
handle404();
