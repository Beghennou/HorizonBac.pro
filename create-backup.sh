#!/bin/bash

# Nom du fichier de sauvegarde
BACKUP_FILE="backup.tar.gz"

echo "Création de l'archive de sauvegarde : $BACKUP_FILE..."

# Créer une archive .tar.gz
# --exclude-from='.gitignore' : Utilise le fichier .gitignore pour exclure les fichiers et dossiers inutiles
# -czvf : c=créer, z=compresser (gzip), v=verbeux (montre les fichiers), f=fichier
tar --exclude-from='.gitignore' -czvf "$BACKUP_FILE" .

echo "----------------------------------------------------"
echo "Sauvegarde terminée !"
echo "Le fichier '$BACKUP_FILE' a été créé à la racine de votre projet."
echo "Vous pouvez maintenant le télécharger depuis l'explorateur de fichiers."
echo "----------------------------------------------------"
