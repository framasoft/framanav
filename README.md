framanav2013
============

Barre de navigation commune aux sites du réseau 

Installation
--------------------
1) Créer le fichier config/site.js contenant au moins une ligne 
```JavaScript
	f$_config = 'local';
```
Prendre modèle sur config/config.js pour connaître les paramètres à personnalisables


2) Se placer en ligne de commande dans le dossier du *site*, importer les fichiers du dépôt et rendre le fichier cron.sh exécutable
```bash
	cd /home/site/www
	git clone https://github.com/framasoft/framanav2013.git nav
	chmod 744 nav/cron.sh
```

3) a) Ajouter le script nav.js dans le `<head>` du site où la nav est requise :
```HTML
	<script src="/nav/nav.js" id="nav_js" type="text/javascript"></script>
```
**ne pas oublier id="nav_js"**

Dans certain cas, le CMS utilisé compresse à la volée le javascript, il faut alors utiliser ce code là: 
```HTML
<script type="text/javascript">
var script = document.createElement('script');
    script.type = "text/javascript";
    script.id="nav_js";
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

