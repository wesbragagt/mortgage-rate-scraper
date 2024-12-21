## Getting Started

1. Clone the repository
2. Add .env file in the root directory with the following content:

```
TElEGRAM_BOT_TOKEN=your_telegram_bot_token
```

3. Build the docker image

```
./build.sh
```

4. Run the docker container

```
docker run --env-file .env --rm -it mortgage-rate node main.mjs
```
