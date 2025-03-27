import express from 'express';
import axios from 'axios';
import { JSDOM } from 'jsdom';

const app = express();
const PORT = 3000;

app.get('/api/scrape', async (req, res) => {
    const keyword = req.query.keyword as string;

    if (!keyword) {
        return res.status(400).json({ error: 'keyword is necessary' });
    }

    try {
        const headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7'
        };

        const response = await axios.get(`https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`, { headers });

        // Usar JSDOM para analisar o HTML
        const dom = new JSDOM(response.data);
        const document = dom.window.document;

        // Extrair informações dos produtos
        const products = Array.from(document.querySelectorAll('.s-result-item'))
            .filter(item => item.querySelector('.s-image') && item.querySelector('.a-size-base'))
            .map(item => {
                const titleElement = item.querySelector('h2 a .a-text-normal');
                const ratingElement = item.querySelector('.a-icon-star-small .a-icon-alt');
                const reviewsElement = item.querySelector('.a-size-base.s-underline-text');
                const imageElement = item.querySelector('.s-image');

                return {
                    title: titleElement ? titleElement.textContent.trim() : 'Título não disponível',
                    rating: ratingElement ? parseFloat(ratingElement.textContent.split(' ')[0]) : null,
                    reviews: reviewsElement ? parseInt(reviewsElement.textContent.replace(/\./g, '')) : 0,
                    imageUrl: imageElement ? imageElement.getAttribute('src') : null
                };
            });

        res.json(products);
    } catch (error) {
        console.error('Erro durante o scraping:', error);
        res.status(500).json({ error: 'Scraping error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost: ${PORT}`);
});

export default app;