Nom du projet:
Piano Virtuel

Description du projet:

Un piano virtuel qui permet aux utilisateurs ,débutants comme passionnés, de jouer au piano avec un accès à 5 octaves (adaptés pour les professionnelles). L'utilisateur a le choix de choisir le type de son du piano(Grand Piano/Strings/Electric), de mettre en marche le métronome (le métronome aide les pianistes à garder le rythme du morceau qu'ils jouent) et aussi d'utiliser la pédale sustain(présente dans la majorité des pianos) qui étire le son de chaque note jouée pour donner un effet plus harmonieux à la pièce musicale jouée. 

Toutes ces fonctionnalités peuvent être activées soit par click de souris ou par les touches du clavier.

Ce projet contient aussi une partie en bas de page qui contient la possibilité d'enregistrer un son à travers le micro du PC et de le lire après enregistrement pour permettre à l'utilisateur de jouer au piano au même temps avec la lecture de l'enregistrement, et une section permettant à l'utilisateur de faire le choix entre 3 chonsons très connues jouées avec des pianos et de les entendre.

Technologies utilisées:

-HTML5 – structure de la page

-CSS3 – mise en forme et responsive design

-JavaScript – logique du piano, sons, événements clavier, enregistrements

-API Web Audio / Audio() – lecture des sons

-API MediaRecorder + getUserMedia() – enregistrement via micro

-GitHub Pages – hébergement du projet

Fonctionnalités principales:

Nouveautés explorées:

Manipuler l’API MediaRecorder pour enregistrer du son via le micro.

Utiliser navigator.mediaDevices.getUserMedia() pour demander l’accès audio.

Gérer la création dynamique de boutons et de balises audio en JavaScript.

Utiliser des événements clavier pour contrôler des éléments interactifs.

Mettre en place un métronome synchronisé grâce à setInterval().

Découverte de la fonction CSS calc(), qui m’a permis d’aligner avec précision les touches noires du piano.

Apprentissage du positionnement relatif des éléments en CSS et de l’importance de leur parent pour un alignement correct.

Mise en place d’un mapping clavier → notes, nécessitant la découverte d’une table de correspondance JavaScript pour jouer au piano via les touches.

Gestion du sustain grâce à un tableau collectant les audios actifs.

Manipulation du DOM dynamique pour créer des boutons Lecture/Stop pour chaque enregistrement

Difficultés rencontrées:

Gestion des permissions du microphone et fonctionnement de getUserMedia()

L’enregistrement audio capturant aussi les bruits externes, ce qui complique l’utilisation

Problèmes d’alignement des touches noires avec les touches blanches

Les touches noires avaient un espacement important et ne correspondaient pas aux touches noires dans un vrai piano

Comprendre comment faire jouer le piano avec les touches du clavier (liaison touche → note)

Associer les notes au type de son et à l’octave choisie, ce qui créait au départ plus de 360 cas possibles

Mise en place correcte du sustain et gestion de la durée des notes

Gestion dynamique de la liste d’enregistrements (lecture, arrêt, création de boutons)

Solutions apportées:

Tests et lecture de la documentation de l’API getUserMedia() et MediaRecorder, gestion des erreurs (try/catch) et affichage d’un message en cas de refus du micro.

Utilisation de MediaRecorder avec récupération uniquement de la piste audio fournie par le micro ; compréhension que le navigateur capture la source brute du micro et adaptation du code pour gérer ce comportement

Correction du positionnement des touches noires :
(découverte du fait qu’elles n’étaient pas liées à la classe des touches blanches/repositionnement en les rendant relatives à l’ensemble du clavier/utilisation de la fonction CSS calc() pour ajuster précisément l’espacement)

Mise en place d’une table de correspondance (mapping) entre touches du clavier et notes (manNote), permettant de jouer au clavier

Création d’un modèle logique pour les fichiers audio, permettant de :(éviter les 360 cas manuels,organiser les sons par catégorie (type + octave + note),générer automatiquement le bon chemin audio via une fonction dédiée (getCheminAudio() / découverte))

Création dynamique de boutons Lecture et Stop pour chaque enregistrement, utilisation d’un Blob audio, et ajout automatique des éléments dans le DOM.

Utilisation d’un tableau notesEnSustain[] pour gérer la pédale sustain/Amélioration du métronome grâce à setInterval()
