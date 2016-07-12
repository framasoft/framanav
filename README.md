[![](https://framagit.org/assets/favicon-075eba76312e8421991a0c1f89a89ee81678bcde72319dd3e8047e2a47cd3a42.ico)](https://framagit.org)

![English:](https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Flag_of_the_United_Kingdom.svg/20px-Flag_of_the_United_Kingdom.svg.png) **Framasoft uses GitLab** for the development of its free softwares. Our Github repositories are only mirrors.
If you want to work with us, **fork us on [framagit.org](https://framagit.org)**. (no registration needed, you can sign in with your Github account)

![Français :](https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/20px-Flag_of_France.svg.png) **Framasoft utilise GitLab** pour le développement de ses logiciels libres. Nos dépôts Github ne sont que des miroirs.
Si vous souhaitez travailler avec nous, **forkez-nous sur [framagit.org](https://framagit.org)**. (l'inscription n'est pas nécessaire, vous pouvez vous connecter avec votre compte Github)
* * *

Framanav
========

Barre de navigation commune aux sites du réseau

Installation
--------------------
1) Voir à la fin du fichier `nav.js` pour connaître les paramètres personnalisables à définir selon le site

2) Se placer en ligne de commande dans le dossier du *site* et importer les fichiers du dépôt
```bash
    cd /home/site/www
    git clone https://framagit.org/framasoft/framanav.git nav
```

3) a) Ajouter le script `nav.js` sous le `<body>` du site, là où la nav est requise :
```HTML
    <script src="/nav/nav.js" type="text/javascript"></script>
```

Dans certain cas, le CMS utilisé compresse à la volée le javascript, il faut alors utiliser ce code là :
```HTML
<script type="text/javascript">
var script = document.createElement('script');
    script.type = "text/javascript";
    script.src="/nav/nav.js";
    document.getElementsByTagName('head')[0].appendChild(script);
</script>
```

On peut zapper l'étape 2 en utilisant la nav d'un autre site configurée pour autoriser les requêtes Ajax cross-domain.
```HTML
    <script src="https://framasoft.org/nav/nav.js" type="text/javascript"></script>
```

   b) Ajouter jquery.min.js et bootstrap.min.js avant si nécessaire pour le bon fonctionnement du site
```HTML
    <script src="/nav/lib/jquery/jquery.min.js" type="text/javascript"></script>
    <script src="/nav/lib/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
```
pour utiliser ces versions de jQuery ou Bootstrap avec la nav, mettre dans le fichier de config :
```JavaScript
    l$ = {
      js: { j$: 'html', b$: 'html' }
    }
```

Si jQuery existe déjà sur le site dans une version antérieure à la 1.9.1 et qu'il y a de nombreuses incompatibilités,
mettre dans le fichier de config :
```JavaScript
    l$ = {
      js: { j$: 'noConflict' }
    }
```

Note : A priori, il ne devrait plus être nécessaire de préciser ces variables si la fonction `i$jQuery` joue bien son rôle de détection.

Note2 : pour désactiver les messages d'alerte, les fenêtre modale et le macaron :
```JavaScript
    l$ = {
      mute: true
    }
```

Tester/Configurer
--------------------
### Config.js
Par défaut, la nav charge la config globale `c$` à la fin du fichier `nav.js` puis importe les ajustements selon le site sur lequel on se trouve `l$` dans le fichier `config.js`.

Il est possible de tester le bon fonctionnement d'une nouvelle config en production  (notamment si on ajoute/modifie lourdement des scripts ou fonctions personnalisés) sans aucune incidence sur l'expérience des utilisateurs.
En ajoutant « Framatech » à l'UserAgent de son navigateur, la nav charge la section `agent` du fichier `config.js`.

La fonction i$() sert à détecter sur quelle page, domaine, sous-domaine, etc on se trouve pour affiner la config.

La fonction i$Lang('en') sert à détecter si la page qu'on visite est en anglais
(l'internationnalisation de la nav se fait en fonction de la langue officielle de la page pas en fonction des paramètre de navigation).

### Tests
De même, lorsqu'on modifie le cœur de la nav, une série de pages d'exemple dans le dossier `test` permettent de vérifier grossièrement que rien ne sera cassé.

### Débuggage
Dans la console doit apparaître sur chaque site : `✔ config.js`, `✔ jQuery`, `✔ Bootstrap` et éventuellement `✔ video.js`.

À la ligne config, il y a un `☀` si la nav est appelé juste après le body (chargement rapide) ou un `☁` sinon (chargement plus lent).
Ensuite, se suivent 3 numéros de version : celui de la nav, celui de jQuery fourni par la nav et celui de jQuery trouvé dans le code html de la page.

La ligne jQuery, indique le mode utilisé (noConflict ou pas), la version utilisée, et le mode de chargement (direct en HTML ou via une requête AJAX).
La ligne Bootstrap indique le mode chargement.

Il est possible d'obtenir des informations détaillées en consultant manuellement le contenu des variables :

 * n${} = variables globales de la nav
 * d${} = données localisées (texte, liens, icônes, couleurs, etc)
 * h${} = code html utile généré
 * c${} = config complète du site
 * l${} = config ajustée du site par rapport à la config globale

Mises à jour planifiées
--------------------
Editer le crontab de l'utilisateur :
```bash
    (sudo) crontab -u site -e
```
Et ajouter une ligne à la fin
```
    00 4 * * * /home/site/www/nav/update.sh
```
Note : comme on utilise salt pour déployer les mises à jour, normalement ce n'est plus nécessaire.