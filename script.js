const urlParams = new URLSearchParams(window.location.search);
const tutorial = urlParams.get('tutorial');
const page = urlParams.get('page');
const page2 = parseInt(page);
const mainDocElement = document.getElementById('maindoc');

// Construct the file paths
const filePath = `tutorials/${tutorial}/page${page}.txt`;
const metadataPath = `tutorials/${tutorial}/metadata.txt`;
const navPath = `core/nav.html`;
const footPath = `core/foot.html`;

// Fetch the metadata file first
fetch(metadataPath)
  .then(response => response.text())
  .then(metadataText => {
    // Parse the metadata
    const metadata = JSON.parse(metadataText);
    const title = metadata.title;
    const length = metadata.length;
    const pages = metadata.pages; // Access the "pages" property
  })
  .catch(error => {
    // Handle errors fetching metadata
    console.error('Error fetching metadata:', error);
    // Display an error message or redirect to a 404 page
  });

    // Update the title
    document.querySelector('title').textContent = title;

    // Fetch the tutorial content
    fetch(filePath)
      .then(response => response.text())
      .then(text => {
        // Display the remaining lines as content within the target element
        mainDocElement.innerHTML = text;

        // Add a progress bar or page number indicator
        const progressBar = document.getElementById('page-indicator');
        progressBar.max = pages;
        progressBar.value = page2 + 1; // Adjust for 0-based indexing

        const pageNumber = document.getElementById('page-number');
        const pageFix = page2 + 1;
        pageNumber.innerHTML = `Page ` + pageFix + ` of ${pages}`;
        mainDocElement.appendChild(pageNumber);
      })
      .catch(error => {
        // Handle 404 errors here
        const errorFiles = ['unicorn.txt', 'blackhole.txt', 'digital.txt', 'stock.txt']; // List of error files
        const randomErrorFile = errorFiles[Math.floor(Math.random() * errorFiles.length)];
        const randomErrorPath = 'core/errors/404/' + randomErrorFile;

        fetch(randomErrorPath)
          .then(response => response.text())
          .then(errorContent => {
            mainDocElement.innerHTML = errorContent;
          })
          .catch(error => {
            console.error('Error fetching 404 error page:', error);
            mainDocElement.innerHTML = '<h1>404 - Page Not Found</h1><p>This is a missing page, one most fought after... JUST KIDDING! It&apos;s a 404 page.</p>';
          });
      });
  )

// Fetch the navigation content
fetch(navPath)
  .then(response => response.text())
  .then(navHTML => {
    const headerElement = document.querySelector('header');
    headerElement.innerHTML = navHTML;
  })
  .catch(error => {
    console.error('Error fetching navigation:', error);
  });

// Fetch the footer content
fetch(footPath)
  .then(response => response.text())
  .then(footHTML => {
    const footerElement = document.querySelector('footer');
    footerElement.innerHTML = footHTML;
  })
  .catch(error => {
    console.error('Error fetching footer:', error);
  });
