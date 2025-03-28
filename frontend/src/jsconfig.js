import './styles.css';

const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const resultsContainer = document.getElementById('resultsContainer');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorMessage = document.getElementById('errorMessage');

// Configurações do servidor
const SERVER_URL = 'http://localhost:3000'; // Mesma porta do seu Express
const API_ENDPOINT = '/scrape'; // Endpoint do seu servidor

searchButton.addEventListener('click', async () => {
    const keyword = searchInput.value.trim();

    if (!keyword) {
        showError('Por favor, digite um termo de busca');
        return;
    }

    resetSearchState();
    showLoading();

    try {
        const products = await fetchProducts(keyword);

        if (products.length === 0) {
            showError('Nenhum produto encontrado');
            return;
        }

        renderProducts(products);
    } catch (error) {
        console.error('Erro:', error);
        showError('Falha ao buscar produtos. Tente novamente.');
    } finally {
        hideLoading();
    }
});

async function fetchProducts(keyword) {
    const response = await fetch(`${SERVER_URL}${API_ENDPOINT}?keyword=${encodeURIComponent(keyword)}`);

    console.log(response);

    if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
    }

    return await response.json();
}

function renderProducts(products) {
    resultsContainer.innerHTML = products.map(product => `
        <div class="product-card">
            <img 
                src="${product.imageUrl || 'https://via.placeholder.com/150'}" 
                alt="${product.title}" 
                class="product-image"
                onerror="this.src='https://via.placeholder.com/150'"
            >
            <h3 class="product-title">${product.title || 'Sem título disponível'}</h3>
            <div class="product-info">
                <div class="product-rating">
                    ${product.rating ? `★ ${product.rating.toFixed(1)}` : 'Sem avaliação'}
                </div>
                <div class="product-reviews">
                    (${product.reviews || 0} avaliações)
                </div>
            </div>
        </div>
    `).join('');
}

// Funções utilitárias
function resetSearchState() {
    resultsContainer.innerHTML = '';
    errorMessage.style.display = 'none';
}

function showLoading() {
    loadingSpinner.style.display = 'block';
}

function hideLoading() {
    loadingSpinner.style.display = 'none';
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}