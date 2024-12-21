export class TelegramClient {
  constructor(token) {
    this.token = token;
  }

  async getChatId() {
    const token = this.token;
    const url = `https://api.telegram.org/bot${token}/getUpdates`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to get chat id: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.result[0].message.chat.id) {
      console.log(JSON.stringify(data));
      throw new Error('Failed to get chat id');
    }

    return data.result[0].message.chat.id;
  }

  async sendMessage(chatId, message) {
    const token = this.token;
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const data = { chat_id: chatId, text: message };
    const response = await fetch(url, { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } });

    if (!response.ok) {
      throw new Error(`Failed to send message: ${response.statusText}`);
    }

    return response.json();
  }
}
