<div align="center">

# Frontend Template

<a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License</a>.

---

French version of this : [README.fr.md](README.fr.md)
<a href="README.fr.md"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/1200px-Flag_of_France.svg.png" width="20" height="15" alt="French version"></a>

---

### **Description**

This React frontend template not only boasts a robust security framework but also upholds GDPR compliance and ensures accessibility for visually impaired users. It seamlessly integrates with the specified backend, providing a reliable foundation for your web development needs.

---

[Installation and Execution](#installation) •
[Documentation](#documentation) •
[Contributions](#contributions)

</div>


## Main Features

- Highly secure with two token authentication
- Easy to add features
- RGPD compliant
- Accessible for visually impaired users

## Table of Contents

- [Installation](#installation)
  - [Pre-requisites](#pre-requisites)
  - [Running the project](#running-the-project)
- [Documentation](#documentation)
  - [Folder structure](#folder-structure)
- [Contributions](#contributions)
  - [Authors](#authors)
  - [Version control](#version-control)

# Installation
<sup>[(Back to top)](#table-of-contents)</sup>

## Pre-requisites
<sup>[(Back to top)](#table-of-contents)</sup>

You need Node.js installed on your machine.

This frontend can be use with this [backend](https://github.com/alexdeloire/backend_template).

## Running the project
<sup>[(Back to top)](#table-of-contents)</sup>

To run the project, execute the following command:

```bash
npm start
```

# Documentation
<sup>[(Back to top)](#table-of-contents)</sup>

Comments provided throughout the code. Feel free to contact me for any questions.


## Folder structure
<sup>[(Back to top)](#table-of-contents)</sup>

The project is structured as follows:
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
<sup>[(Back to top)](#table-of-contents)</sup>

## Authors
<sup>[(Back to top)](#table-of-contents)</sup>

- [**Alexandre Deloire**](https://github.com/alexdeloire)
- [**Remi Jorge**](https://github.com/RemiJorge)

## Version control
<sup>[(Back to top)](#table-of-contents)</sup>

Git is used for version control.