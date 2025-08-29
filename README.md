Please see https://github.com/Frebbers/GameTogether-Backend for REST based backend.

## Starting the project

### Requirements
- Docker is the only recommended way to start this project. Please make sure it is installed.

### Steps
1. Clone project or make sure it is up to date
    - `git clone https://github.com/Frebbers/GameTogether-FrontEnd`
    - `git submodule update --init --recursive`
2. Add a smtp password to .env to allow sending emails
3. `docker compose up frontend -d --build`

Website can then be accessed on http://localhost:443/

### Good tips
- Check status of containers with `docker ps`
- Turn off the project with `docker compose down`
- Rebuild the project after making changes with `docker compose down && docker compose up frontend -d --build`

