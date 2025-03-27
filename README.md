# Amazon Product Scraper with Bun

## Description
This project is an Amazon product scraper that uses Bun, Express, Axios, and JSDOM to extract product information based on a keyword search.

## Prerequisites
- Bun
- Compatible Node.js version

## Installation
1. Clone the repository
2. Run `bun install`

## Running the Project
Start the server:
```bash
bun run index.ts
```

Make a GET request to:
`http://localhost:3000/api/scrape?keyword=your_search_keyword`

## Features
- Product title extraction
- Star rating retrieval
- Number of reviews
- Product image URL

## Usage Example
```bash
# Example request
curl "http://localhost:3000/api/scrape?keyword=smartphone"
```

## Project Structure
- `index.ts`: Main server and scraping logic
- `package.json`: Project dependencies and scripts
- `README.md`: Project documentation

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

## Disclaimer
This project is for educational purposes only. Always ensure you have the right to scrape data from websites.

## License
[Add your license information here]