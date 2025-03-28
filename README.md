# Amazon Product Scraper with Bun

## Description
This project is an Amazon product scraper that uses Bun, Express, Axios, and JSDOM to extract product information based on a keyword search.

## Prerequisites
- Bun
- Compatible Node.js version

## Installation
1. Clone the repository
2. Run `bun install`
3. Run `npm install`

## Running the Project
Start the server:
```bash
bun run index.ts
```

Make a GET request to:
`http://localhost:3000/scrape?keyword=your_search_keyword`

## Features
- Product title extraction
- Star rating retrieval
- Number of reviews
- Product image URL

## Usage Example
```bash
# Example request
curl "http://localhost:3000/scrape?keyword=smartphone"
```

## Project Structure
- `index.ts`: Main server and scraping logic
- `package.json`: Project dependencies and scripts
- `README.md`: Project documentation
- `src` : Frontend directory
- `assets` : Project assets
- `js` : Project javascript

## Important Considerations
- Use responsibly
- Respect Amazon's terms of service
- Web scraping may be against the site's robots.txt
- Implement rate limiting in production
- Selectors might change, requiring periodic updates

## Potential Improvements
- Add error handling
- Implement request throttling
- Create more robust parsing mechanisms
- Add support for multiple page scraping
- Time limit between requisitions
- security and validation 
- pagination for return n elements 

## Disclaimer
The biggest challenges for me were the integration of the frontend with the backend using Vite because it was the first time I used Bun since I work more in other technologies, making requests to Amazon and not being blocked was one of the initial concerns as well, but given the nature of the test this difficulty was easily resolved.

## License
[Add your license information here]