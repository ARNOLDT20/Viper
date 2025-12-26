

# 🌟 VIPER MD 🚀

[![VIPER MD](https://raw.githubusercontent.com/ARNOLDT20/Viper/main/media/lucky.svg)](https://whatsapp.com/channel/0029Vb6H6jF9hXEzZFlD6F3d)


📈 **GitHub Stats**:  
![GitHub Stats](https://github-readme-stats.vercel.app/api?username=ARNOLDT20&show_icons=true&theme=github_dark)

🏆 **Trophies**:  
![Trophies](https://github-profile-trophy.vercel.app/?username=ARNOLDT20&theme=monokai)
# VIPER MD

VIPER MD is a WhatsApp automation bot built with Baileys. It provides moderation tools, auto-replies, media utilities, group management and admin commands for self-hosted WhatsApp bot instances.

---

<p align="center">
	<img src="media/lucky.svg" alt="VIPER Logo" width="160" />
</p>

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE) [![Made with Node.js](https://img.shields.io/badge/Node.js-%3E%3D16-brightgreen)](https://nodejs.org/) [![Heroku](https://www.herokucdn.com/deploy/button.svg)](https://dashboard.heroku.com/new?template=https://github.com/ARNOLDT20/Viper)

VIPER MD helps manage WhatsApp groups and provides a rich toolkit for automation, moderation and media handling.

## Highlights

- Clean moderation: anti-delete, anti-link and warn/kick workflows
- Auto-replies and quick commands for better UX
- Media tools: image/video ↔ sticker conversion, upload shortcuts
- Group utilities: welcome/goodbye, antimention, admin-only controls
- Owner utilities: broadcast, restart, set name/picture

## Screenshot

_Add screenshots here (`media/` or a hosted URL)._

## Requirements

- Node.js 16+ (LTS recommended)
- ffmpeg installed and on PATH (for media/sticker conversion)
- Git (to clone)

## Quick Start

Clone and install dependencies:

```bash
git clone https://github.com/ARNOLDT20/Viper.git
cd Viper
npm install
```

Create your environment file (see `set.example.env`) and start the bot locally:

```bash
cp set.example.env .env
# edit .env with your values
node index.js
```

## Configuration

The bot reads configuration from `set.js` and environment variables. Example environment keys you should set (see `set.example.env`):

- `SESSION_ID` – your WhatsApp session string
- `OWNER_NUMBER` – owner phone number, e.g. `255627417402`
- `PREFIX` – command prefix (default `.`)
- `PUBLIC_MODE` – `true`/`false` for public command mode

## Deployment (Heroku)

1. Click the **Deploy to Heroku** button above.
2. In Heroku app settings add config vars (see `set.example.env`).
3. Add an ffmpeg buildpack if the runtime doesn't provide it:

```
https://github.com/jonathanong/heroku-buildpack-ffmpeg-latest
```

4. Deploy and check logs: `heroku logs --tail`

## Commands (examples)

- `.menu` — show commands
- `.owner` — contact owner info
- `.alive` / `.uptime` — bot status
- `.antimention on|off` — toggle mention protection
- `.ytdl <url>` — download YouTube video

Full command list is available in the `plugins/` folder.

## Contributing

Contributions, issues and feature requests are welcome — please open an issue or a PR. When contributing, follow the project's code style and include tests where appropriate.

If you modify commands or add persistent settings, please update `set.example.env` accordingly.

## Example env (`set.example.env`)

See the repository file `set.example.env` for a starter template.

## License

This project is licensed under the MIT License — see the `LICENSE` file.

---

Maintainer: ARNOLDT20 / T20_starboy — https://github.com/ARNOLDT20


## Key Features
- Anti-delete & anti-link tools
- Auto-replies and quick commands
- Media conversion (image/video/sticker)
- Group welcome/goodbye and mention protection
- Owner/admin utilities (broadcast, restart, set name/picture)

## Requirements
- Node.js 16 or newer
- ffmpeg (for media/sticker conversions)
- Git

## Quick Start
1. Clone the repo:

```bash
git clone https://github.com/ARNOLDT20/Viper.git
cd Viper
npm install
```

2. Configure your environment:
- Create a `set.env` or export environment variables required by the project (for example `SESSION_ID`, `OWNER_NUMBER`, `PREFIX`). Check `set.js` for exact variable names used by this codebase.

3. Run the bot locally:

```bash
node index.js
```

## Deployment

### Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://dashboard.heroku.com/new?template=https://github.com/ARNOLDT20/Viper)

Steps to deploy on Heroku:

1. Click the **Deploy to Heroku** button above or open the Heroku Dashboard and choose **New > Create new app**.
2. Connect your GitHub account and select the `ARNOLDT20/Viper` repository.
3. In the **Settings > Config Vars** add required variables (examples):
	- `SESSION_ID`
	- `OWNER_NUMBER`
	- `PREFIX`
	- any other keys used by `set.js`
4. Ensure a Node.js `start` script exists in `package.json` (default: `node index.js`).
5. Add an ffmpeg buildpack if your Heroku stack does not include ffmpeg, for example:

```text
https://github.com/jonathanong/heroku-buildpack-ffmpeg-latest
```

6. Deploy and monitor logs for any runtime errors.

Other hosts: this project can also run on other Node.js hosts; ensure required env vars and `ffmpeg` are available.

## Contributing
Contributions are welcome. Please open issues or pull requests with clear descriptions and tests where appropriate.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

---

Maintainer: ARNOLDT20 / T20_starboy — https://github.com/ARNOLDT20
