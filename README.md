[![](https://framagit.org/assets/favicon-075eba76312e8421991a0c1f89a89ee81678bcde72319dd3e8047e2a47cd3a42.ico)](https://framagit.org)

![English:](https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Flag_of_the_United_Kingdom.svg/20px-Flag_of_the_United_Kingdom.svg.png) **Framasoft uses GitLab** for the development of its free softwares. Our Github repositories are only mirrors.
If you want to work with us, **fork us on [framagit.org](https://framagit.org)**. (no registration needed, you can sign in with your Github account)

![Français :](https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/20px-Flag_of_France.svg.png) **Framasoft utilise GitLab** pour le développement de ses logiciels libres. Nos dépôts Github ne sont que des miroirs.
Si vous souhaitez travailler avec nous, **forkez-nous sur [framagit.org](https://framagit.org)**. (l'inscription n'est pas nécessaire, vous pouvez vous connecter avec votre compte Github)
* * *

Framanav
========

Barre de navigation commune aux sites du réseau
+ Pied de page
+ Modale de don
+ Modale d’info
+ Bandeau d’info
+ Inscription à la newsletter en optin
+ CSS custom
+ Scripts custom

Installation
--------------------
1) Héberger la nav
```bash
cd /var/www/framasoft.org/
git clone https://framagit.org/framasoft/framanav.git nav
```

2) Configurer le serveur pour autoriser les requête Cross-domain

3) Ajouter le script `nav.js` à la fin du `<body>` du site :
```html
<script src="https://framasoft.org/nav/nav.js"></script>
```

Dans certain cas, le CMS utilisé compresse à la volée le javascript,
il faut alors utiliser ce code là :
```html
<script>
  const s = document.createElement('script');
  s.src="https://framasoft.org/nav/nav.js";
  document.getElementsByTagName('head')[0].appendChild(script);
</script>
```

Tester/Configurer
--------------------
### Config
Par défaut, chaque composant (bandeau, modale, etc) de la nav contient
une methode `siteConfig()` avec les paramètres requis pour un affichage
contextualisé en fonction du site (dans le `switch … case`).

Il est également possible de passer la configuration des composants directement
dans la page où se trouve la nav (exemple dans `app/assets/test/verbose.html`).
Cette config sera prioritaire.

### Tests
De même, lorsqu’on modifie le cœur de la nav, une série de pages d’exemple dans
le dossier `test` permettent de vérifier grossièrement que rien ne sera cassé.

### Débuggage
Il est fortement recommandé d’utiliser l’extension
[VueJS devtools](https://addons.mozilla.org/fr/firefox/addon/vue-js-devtools/)
pour facilement voir l’état des variables de chaque composant.
