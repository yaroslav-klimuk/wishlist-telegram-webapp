My girlfriend and I were arguing about where to keep a wishlist with gift ideas for each other. I suggested notion because I really like it, but my girlfriend wanted to do it in a telegram chat. One day I thought "why choose?" and wrote telegram [bot](https://github.com/yaroslav-klimuk/telegram-notion-bot/tree/main) + this webapp. <br>

The application requires a telegram bot (link above). <br>
The application runs in the telegram bot and allows you to fill in the fields containing information about the gift and then sends it to telegram chat and notion database. For each user its own database. <br>
Also you need to set the following environment variables: 

* `REACT_APP_SERVER_URL` = URL where your bot is located
* `REACT_APP_USERNAME1` / `REACT_APP_USERNAME2` = Telegram usernames

More info you can find in bot [repository](https://github.com/yaroslav-klimuk/telegram-notion-bot/tree/main).

<img width="515" alt="Screenshot 2023-05-08 at 00 11 27" src="https://user-images.githubusercontent.com/70700647/236704942-226283a9-8c6f-4fa4-80c5-55012fed8ec7.png">
