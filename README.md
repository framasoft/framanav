[![](https://git.framasoft.org/assets/logo-black-f52905a40830b30aa287f784b537c823.png)](https://git.framasoft.org)

![English:](https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Flag_of_the_United_Kingdom.svg/20px-Flag_of_the_United_Kingdom.svg.png) **Framasoft uses GitLab** for the development of its free softwares. Our Github repositories are only mirrors.
If you want to work with us, **fork us on [git.framasoft.org](https://git.framasoft.org)**. (no registration needed, you can sign in with your Github account)

![Français :](https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/20px-Flag_of_France.svg.png) **Framasoft utilise GitLab** pour le développement de ses logiciels libres. Nos dépôts Github ne sont que des mirroirs.
Si vous souhaitez travailler avec nous, **forkez-nous sur [git.framasoft.org](https://git.framasoft.org)**. (l'inscription n'est pas nécessaire, vous pouvez vous connecter avec votre compte Github)
* * *

Framanav
========

Barre de navigation commune aux sites du réseau

Installation
--------------------
1) Créer le fichier config/site.js contenant au moins une ligne
```JavaScript
    f$_config = 'local';
```
Prendre modèle sur config/config.js pour connaître les paramètres à personnalisables


2) Se placer en ligne de commande dans le dossier du *site* et importer les fichiers du dépôt
```bash
    cd /home/site/www
    git clone https://git.framasoft.org/framasoft/framanav.git nav
```

3) a) Ajouter le script nav.js en haut du `<body>` du site où la nav est requise :
```HTML
    <script src="/nav/nav.js" type="text/javascript"></script>
```

Dans certain cas, le CMS utilisé compresse à la volée le javascript, il faut alors utiliser ce code là :
```HTML
<script type="text/javascript">
var script = document.createElement('script');
    script.type = "text/javascript";
    script.src="/nav/nav.js";
    document.getElementsByTagName('head')[0].appendChild(script);
</script>
```

   b) Ajouter jquery.min.js et bootstrap.min.js avant si nécessaire pour le bon fonctionnement du site
```HTML
    <script src="/nav/lib/jquery/jquery.min.js" type="text/javascript"></script>
    <script src="/nav/lib/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
```
pour utiliser ces versions de jQuery ou Bootstrap avec la nav, mettre dans le fichier de config :
```JavaScript
    f$_jquery = 'html';
    f$_bootstrap_js = 'html';
```

Si jQuery existe déjà sur le site dans une version antérieure à la 1.10.2 et qu'il y a de nombreuses incompatibilités,
mettre dans le fichier de config :
```JavaScript
    f$_jquery = 'fQuery';
```

Note : pour désactiver les éléments de la nav (message d'alerte, fenêtres modales, nav, macaron),
mais profiter tout de même des CSS de bootstrap et de jQuery on peut ajouter ce paramètre au fichier de config :
```JavaScript
    f$_not_in_frame = false;
```

Mises à jour planifiées
--------------------
Editer le crontab de l'utilisateur :
```bash
    (sudo) crontab -u site -e
```
Et ajouter une ligne à la fin
```
    00 4 * * * /home/site/www/nav/cron.sh
```

