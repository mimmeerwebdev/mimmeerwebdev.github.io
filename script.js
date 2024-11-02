async function fetchTutorial(tutorial, page) {
  try {
    const mainDocElement = document.getElementById('maindoc');

    // Construct the file paths
    const filePath = `tutorials/${tutorial}/page${page}.txt`;
    const metadataPath = `tutorials/${tutorial}/metadata.txt`;

    // Fetch metadata first
    const response = await fetch(metadataPath);
    if (!response.ok) {
      throw new Error(`Failed to fetch metadata: ${response.status}`);
    }
    const metadataText = await response.text();
    const metadata = JSON.parse(metadataText);

    // Update title
    document.querySelector('title').textContent = metadata.title;

    // Fetch tutorial content
    const contentResponse = await fetch(filePath);
    if (!contentResponse.ok) {
      throw new Error(`Failed to fetch tutorial content: ${contentResponse.status}`);
    }
    const text = await response.text();

    // Display content
    mainDocElement.innerHTML = text;

    // Add progress bar and page number
    const progressBar = document.getElementById('page-indicator');
    progressBar.max = metadata.pages;
    progressBar.value = page + 1; // Adjust for 0-based indexing

    const pageNumber = document.getElementById('page-number');
    pageNumber.textContent = `Page ${page + 1} of ${metadata.pages}`;
    mainDocElement.appendChild(pageNumber);
  } catch (error) {
    console.error('Error fetching tutorial:', error);
    // Handle errors (e.g., display a generic error message or redirect to a 404 page)
  } finally {
    // Fetch navigation and footer content (assuming these are always needed)
    fetch(navPath)
      .then(response => response.text())
      .then(navHTML => {
        const headerElement = document.querySelector('header');
        headerElement.innerHTML = navHTML;
      })
      .catch(error => {
        console.error('Error fetching navigation:', error);
      });

    fetch(footPath)
      .then(response => response.text())
      .then(footHTML => {
        const footerElement = document.querySelector('footer');
        footerElement.innerHTML = footHTML;
      })
      .catch(error => {
        console.error('Error fetching footer:', error);
      });
  }
}

// Get tutorial and page from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const tutorial = urlParams.get('tutorial');
const page = parseInt(urlParams.get('page'));

// Call the fetch function
fetchTutorial(tutorial, page);
