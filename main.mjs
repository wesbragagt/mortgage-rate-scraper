import axios from 'axios'
import * as cheerio from 'cheerio'
import { TelegramClient } from './telegram.mjs';

async function main() {
  try {
    const now = new Date();
    const telegramToken = process.env.TElEGRAM_BOT_TOKEN;
    // Fetch the webpage content
    const response = await axios.get('https://www.mortgagenewsdaily.com/mbs');
    const html = response.data;

    // Load the HTML content into Cheerio
    const $ = cheerio.load(html);

    // Find the rates table
    const ratesTable = $('.w-ratessidebar table');

    // Extract and store the rates
    const rates = [];
    ratesTable.find('tr').each((index, element) => {
      const productElement = $(element).find('td.rate-product');
      const rateElement = $(element).find('td.rate');

      if (productElement.length && rateElement.length) {
        const product = productElement.text().trim();
        const rate = rateElement.text().trim();
        rates.push({ Product: product, Rate: rate });
      }
    });

    // Print the extracted rates in a dataframe-like structure
    console.log('Mortgage Rates:');
    console.table(rates);
    console.log(`Extracted from ${response.config.url} on ${now.toLocaleString()}`)

    if(telegramToken){
      console.log('Sending message to Telegram');
      const telegramClient = new TelegramClient(telegramToken);
      const chatId = await telegramClient.getChatId();

      const message = `Mortgage Rates:\n${rates.map(rate => `${rate.Product}: ${rate.Rate}`).join('\n')}\n\nExtracted from ${response.config.url} on ${now.toLocaleString()}`;

      await telegramClient.sendMessage(chatId, message);
      console.log(`Message sent to Telegram at ${now.toLocaleString()}`);
    }
  } catch (error) {
    console.error('Error scraping mortgage rates:', error);
    process.exit(1);
  }
}
main();
