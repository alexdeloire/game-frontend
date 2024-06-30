<div align="center">

# Template Frontend

<a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/"><img alt="Licence Creative Commons" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png" /></a><br />Ce(tte) œuvre est mise à disposition selon les termes de la <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">Licence Creative Commons Attribution - Pas d&#39;Utilisation Commerciale - Pas de Modification 4.0 International</a>.

---

Version anglaise de ce document : [README.md](README.md)
<a href="README.md"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg/1280px-Flag_of_the_United_Kingdom_%283-5%29.svg.png" width="20" height="15" alt="English version"></a>

---

### **Description**

Ce modèle frontend React non seulement offre un cadre de sécurité robuste, mais garantit également la conformité au RGPD et assure l'accessibilité aux utilisateurs malvoyants. Il s'intègre parfaitement au backend spécifié, offrant une base fiable pour vos besoins en développement web.

---

[Installation et Exécution](#installation) •
[Documentation](#documentation) •
[Contributions](#contributions)

</div>


## Fonctionnalités

- Très sécurisé avec une double authentification par jeton*
- Facile à ajouter des fonctionnalités
- Conforme au RGPD
- Accessible aux utilisateurs malvoyants


## Table des matières

- [Installation](#installation)
  - [Prérequis](#prérequis)
  - [Lancement](#lancement)
- [Documentation](#documentation)
  - [Structure du projet](#structure-du-projet)
- [Contributions](#contributions)
  - [Auteurs](#auteurs)
  - [Contrôle des versions](#contrôle-des-versions)

# Installation
<sup>[(Retour en haut)](#table-des-matières)</sup>

## Prérequis
<sup>[(Retour en haut)](#table-des-matières)</sup>

Il est nécessaire d'avoir installé Node.js sur votre machine.

Ce frontend peut être utilisé avec ce [backend](https://github.com/alexdeloire/backend_template).

## Lancement
<sup>[(Retour en haut)](#table-des-matières)</sup>

Pour lancer le projet, exécutez la commande suivante :

```bash
npm start
```

# Documentation
<sup>[(Retour en haut)](#table-des-matières)</sup>

Commentaires fournis tout au long du code. N'hésitez pas à me contacter pour toute question.

## Structure du projet
<sup>[(Retour en haut)](#table-des-matières)</sup>

Voici la structure du projet :

```bash
.
├── LICENSE.txt
├── package.json
├── package-lock.json
├── README.fr.md
├── README.md
└── src
    ├── api
    │   └── axios.js
    ├── App.js
    ├── components
    │   ├── Layout.js
    │   ├── Missing.js
    │   ├── NavBar.js
    │   ├── PersistLogin.js
    │   ├── RequireAuth.js
    │   └── Unauthorized.js
    ├── context
    │   └── AuthProvider.js
    ├── hooks
    │   ├── useAuth.js
    │   ├── useAxiosPrivate.js
    │   ├── useLogout.js
    │   └── useRefreshToken.js
    ├── index.css
    ├── index.js
    ├── styles
    │   ├── admin.css
    │   ├── festival-info.css
    │   └── poste-referent.css
    └── views
        ├── Admin.js
        ├── ChangePassword.js
        ├── ItemList.js
        ├── Home.js
        ├── UserContent.js
        ├── LinkPage.js
        ├── Login.js
        ├── Profile.js
        ├── Register.js
        ├── RGPD.js
        └── UsersSearch.js
```

# Contributions
<sup>[(Retour en haut)](#table-des-matières)</sup>

## Auteurs
<sup>[(Retour en haut)](#table-des-matières)</sup>

- [**Alexandre Deloire**](https://github.com/alexdeloire)
- [**Remi Jorge**](https://github.com/RemiJorge)

## Contrôle des versions
<sup>[(Retour en haut)](#table-des-matières)</sup>

Git est utilisé pour le contrôle des versions.
