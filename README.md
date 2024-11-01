# Projet Task Managment

Ce projet est une application full-stack utilisant Laravel pour le backend et React pour le frontend, orchestré avec Docker Compose.

## Prérequis

- Docker et Docker Compose installés sur votre machine.

## Installation

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/mintoua/task-management.git
   cd task-management
2. Assurez-vous que les fichiers .env sont bien configurés pour Laravel.

## Demarrage de l'application
1. Exécutez la commande suivante à la racine du projet pour démarrer tous les services :
   ```bash
    docker-compose up --build
    docker-compose exec backend php artisan migrate

Utilisation Accédez à http://localhost:3000 pour utiliser le frontend React.

Le backend Laravel peut être consulté via http://localhost:8000/api.
