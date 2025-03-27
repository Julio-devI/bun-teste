import './styles.css';

const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const resultsContainer = document.getElementById('resultsContainer');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorMessage = document.getElementById('errorMessage');

searchButton.addEventListener('click', async () => {
    const keyword = searchInput.value.trim();

    if (!keyword) {
        errorMessage.textContent = 'Please enter a search keyword';
        errorMessage.style.display = 'block';
        return;
    }

    // Reset previous state
    resultsContainer.innerHTML = '';
    errorMessage.style.display = 'none';
    loadingSpinner.style.display = 'block';

    try {
        // Usa caminho relativo com proxy
        const response = await fetch(`/api/scrape?keyword=${encodeURIComponent(keyword)}`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const products = await response.json();

        // Hide loading spinner
        loadingSpinner.style.display = 'none';

        // No results handling
        if (products.length === 0) {
            errorMessage.textContent = 'No products found';
            errorMessage.style.display = 'block';
            return;
        }

        // Render products
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

            productCard.innerHTML = `
                <img 
                    src="${product.imageUrl}" 
                    alt="${product.title}" 
                    class="product-image"
                >
                <h3 class="product-title">${product.title}</h3>
                <div class="product-rating">
                    <span>★ ${product.rating || 'N/A'} (${product.reviews} reviews)</span>
                </div>
            `;

            resultsContainer.appendChild(productCard);
        });

    } catch (error) {
        console.error('Error:', error);
        loadingSpinner.style.display = 'none';
        errorMessage.textContent = 'Failed to fetch products. Please try again.';
        errorMessage.style.display = 'block';
    }
});