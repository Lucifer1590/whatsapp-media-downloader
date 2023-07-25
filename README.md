
# WhatsApp Media Downloader

## Overview

WhatsApp Media Downloader is a  project that allows users to download media files from a logged-in WhatsApp account using `whatsapp-web.js`. It provides a simple and automated way to save all media files sent to a specific WhatsApp account in a designated folder.

## Prerequisites

Before using this project, ensure you have the following installed on your system:

- Docker
- Docker Compose
- Node.js (if you want to run the JS file outside of Docker)

## Installation

To set up and run this project in local, follow the steps below:

1- Clone this repository to your local machine:

```git clone https://github.com/Lucifer1590/whatsapp-media-downloader.git```

```cd whatsapp-media-downloader```

2- Run Docker command

```docker compose up -d```

3- To scan the qr code check logs 

``` docker compose logs -f```


### Here is the docker compose file if you dont want to download whole repo 
```
version: '3'
services:
  wadownload:
    image: ghcr.io/lucifer1590/whatsapp-media-downloader:master
    container_name: whatsapp-media-downloader
    volumes:
      - ./media:/home/node/app/media  # Replace the host directory path with the desired media files location
      - ./session:/home/node/app/session  # Replace the host directory path with the desired session location
    restart: unless-stopped
    init: true
    cap_add:
      - SYS_ADMIN
```

As seen your session is stored in /session and all the downloaded media is stored in /media it needs SYS_ADMIN privilages because its running puppeteer under the hood for interacting with whatsapp web 
## Disclaimer

This project is for educational purposes only. The developers are not responsible for any misuse or illegal activities conducted with this software. Use it at your own risk.
## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to create a pull request.

## Acknowledgments

Special thanks to whatsapp-web.js for making it possible to interact with WhatsApp Web programmatically.
