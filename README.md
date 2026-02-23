Production-Ready Multi-Container Application Deployment
System: Ubuntu (WSL 2) | Security: UFW & Non-Root User | Orchestration: Docker Compose

🏗️ 1. Project Architecture
This project implements a secure 3-tier architecture:

Nginx Reverse Proxy: Acts as the entry point, routing external traffic to the correct services.

Frontend Service: An Nginx-based web server serving a custom HTML interaction form.

Database (MySQL): A persistent storage layer for application data.

Custom Network: All containers communicate via a dedicated bridge network (bhai_network) for isolation.

🛠️ 2. Part 1: Linux System Setup & Security
I configured the environment using Linux security best practices:

User Management: Created a dedicated devopsuser with sudo privileges.

Firewall (UFW): Locked down the system, allowing only essential ports (22 for SSH, 80 for HTTP, 443 for HTTPS).

Docker Installation: Installed Docker and Docker Compose V2, added the user to the docker group, and enabled the service on boot.

Key Commands:

Bash
sudo adduser devopsuser
sudo usermod -aG sudo devopsuser
sudo ufw allow 22,80,443/tcp && sudo ufw enable
sudo apt update && sudo apt install docker.io docker-compose-v2 -y
sudo usermod -aG docker devopsuser
sudo systemctl enable docker --now
🌿 3. Part 2: Git & GitHub Workflow
Followed a professional Git branching strategy:

Branches: main (production), develop (integration), and feature/ branches for development.

History: Minimum of 10 meaningful commits with clear messages.

Versioning: Created a version tag v1.0 to mark the first stable release.

🐳 4. Part 3 & 5: Multi-Container Setup & Production Best Practices
I designed the deployment to be stable and secure by following Part 5 requirements.

Deployment Command:

Bash
docker compose up -d
Best Practices Implemented:

No "Latest" Tags: Used specific versions (e.g., mysql:8.0.36) to prevent breaking changes.

Credential Security: All passwords and database names are stored in a .env file, not hardcoded.

Data Persistence: Used Named Volumes (db_data) so that database records remain safe even if containers are deleted.

Healthchecks: Configured the database to perform a self-check before the frontend/proxy attempts to connect.

🌐 5. Part 4: Networking & Debugging
To ensure the system is reachable and debuggable, I used the following:

Port Checking: Used docker ps to verify mapping between host and container ports.

Network Inspection: Used docker network inspect to verify container IP addresses.

Localhost vs 0.0.0.0: - localhost (127.0.0.1) limits access to the internal machine only.

0.0.0.0 allows the container to listen on all network interfaces, making it accessible externally.

📊 6. Part 6: Monitoring & Maintenance
Proper monitoring ensures high availability and resource management.

Resource Tracking: Used docker stats to monitor real-time CPU and Memory consumption.

Log Management: Used docker compose logs -f --tail 50 to debug services efficiently.

🚨 Memory Exhaustion (OOM) Explanation:
When a container hits its memory limit (e.g., 512MB), the Linux OOM Killer terminates the process to prevent a total system crash. The container status will show Exit Code 137. Our restart: always policy ensures the container attempts to recover automatically.

🚀 Challenges Faced
WSL Integration: Faced issues with docker-compose (with dash). Solved it by using the modern docker compose (space) command via WSL 2 integration.

Environment Variables: Initially, the database didn't pick up the .env variables. Fixed by ensuring the .env file was in the same directory as the docker-compose.yml.

Resource Cleanup: Used docker system prune -af to clear unused images and build cache, keeping the disk space optimized.

url http://localhost:8080/
