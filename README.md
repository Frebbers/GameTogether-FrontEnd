How to run the project:

### Requirements
- Docker/Docker Compose installed
- .NET 9 installed (8 burde også være fint)

### Steps
1. Clone project
    - `git clone https://github.com/Frebbers/GameTogether-FrontEnd --recurse-submodules`
2. Run script to generate certificates
    - **Windows:** `./generate-certs.ps1`
    - **MacOS/Linux:** `bash generate-certs.sh`
3. `docker compose up -d --build`

Website can then be accessed on https://localhost/

### Good tips
- Check status of containers with `docker ps`
- Turn off the project with `docker compose down`
