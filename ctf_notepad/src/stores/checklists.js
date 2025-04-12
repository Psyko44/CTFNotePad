import { defineStore } from 'pinia'

export const useChecklistStore = defineStore('checklists', {
  state: () => ({
    predefinedChecklists: {
      web: {
        name: 'Web Application',
        items: [
          { text: 'Reconnaissance de base', items: [
            'Directory enumeration (gobuster, dirbuster)',
            'Scan des ports (nmap)',
            'Technologies utilisées (Wappalyzer)',
            'Analyse des en-têtes HTTP',
            'Recherche de fichiers robots.txt, sitemap.xml'
          ]},
          { text: 'Authentification', items: [
            'Test des identifiants par défaut',
            'Bypass authentification',
            'Test injection SQL login',
            'Vérifier remember me/tokens'
          ]},
          { text: 'Injections', items: [
            'Test SQL Injection',
            'Test XSS',
            'Test Command Injection',
            'Test SSRF',
            'Test XXE'
          ]},
          { text: 'Upload de fichiers', items: [
            'Test des restrictions de type',
            'Bypass extension',
            'Test null byte',
            'Test double extension'
          ]}
        ]
      },
      pwn: {
        name: 'Binary Exploitation',
        items: [
          { text: 'Analyse statique', items: [
            'Vérification des protections (NX, ASLR, PIE, etc.)',
            'Analyse avec Ghidra/IDA',
            'Identifier les fonctions vulnérables',
            'Recherche de strings intéressantes'
          ]},
          { text: 'Analyse dynamique', items: [
            'Test avec différentes tailles d\'input',
            'Identification des crashs ou comportements anormaux',
            'Débogage avec GDB/pwndbg',
            'Analyse des registres et de la stack'
          ]}
        ]
      },
      crypto: {
        name: 'Cryptography',
        items: [
          { text: 'Analyse initiale', items: [
            'Identifier le type de chiffrement',
            'Rechercher des motifs connus',
            'Vérifier les fréquences',
            'Test avec CyberChef'
          ]},
          { text: 'Attaques classiques', items: [
            'Test de Caesar cipher',
            'Test de Vigenère',
            'Analyse fréquentielle',
            'Attaques RSA classiques'
          ]}
        ]
      },
      recon: {
        name: 'Reconnaissance',
        items: [
          { text: 'Enumération réseau', items: [
            'Scan complet avec nmap',
            'Détection des versions des services',
            'Scan UDP',
            'Utilisation de Vulnscan'
          ]},
          { text: 'Enumération Web', items: [
            'Bruteforce de répertoires',
            'Enumeration de sous-domaines',
            'Détection de CMS',
            'Fingerprinting de frameworks'
          ]}
        ]
      },
      osint: {
        name: 'OSINT Investigation',
        items: [
          { text: 'Google Dorking', items: [
            'Recherche de fichiers sensibles (filetype:pdf site:domain.com)',
            'Recherche d\'informations exposées (site:pastebin.com "company")',
            'Recherche de configurations (ext:conf OR ext:cfg OR ext:ini)',
            'Recherche de bases de données (ext:sql OR ext:db OR ext:mdb)',
            'Recherche de backups (ext:bak OR ext:backup OR ext:old)'
          ]},
          { text: 'Recherche de Personnes', items: [
            'Vérification des réseaux sociaux (LinkedIn, Twitter, Facebook)',
            'Recherche d\'emails (hunter.io, emailrep.io)',
            'Vérification des fuites de données (haveibeenpwned)',
            'Recherche d\'images (Google Images, Yandex)',
            'Analyse des métadonnées d\'images (exiftool)'
          ]},
          { text: 'Recherche d\'Entreprises', items: [
            'Vérification des enregistrements DNS',
            'Recherche Whois',
            'Analyse des employés sur LinkedIn',
            'Recherche de documents d\'entreprise',
            'Vérification des sous-domaines'
          ]},
          { text: 'Analyse Technique', items: [
            'Scan des ports ouverts',
            'Énumération des technologies (Wappalyzer)',
            'Vérification des certificats SSL',
            'Analyse des en-têtes HTTP',
            'Recherche de services exposés'
          ]}
        ]
      },
      wireless: {
        name: 'Wireless Pentesting',
        items: [
          { text: 'Reconnaissance sans fil', items: [
            'Scan des réseaux WiFi (Kismet, airodump-ng)',
            'Identification des SSID cachés',
            'Analyse des canaux'
          ]},
          { text: 'Attaques WiFi', items: [
            'WEP cracking',
            'Capture de handshake WPA/WPA2',
            'Brute force des mots de passe',
            'Attaque de type Evil Twin'
          ]}
        ]
      },
      mobile: {
        name: 'Mobile Application Pentesting',
        items: [
          { text: 'Analyse d\'applications Android', items: [
            'Décompilation (jadx, apktool)',
            'Analyse du manifeste',
            'Vérification des permissions',
            'Test des API et communications'
          ]},
          { text: 'Analyse d\'applications iOS', items: [
            'Utilisation de class-dump',
            'Analyse des certificats',
            'Reverse engineering des binaires',
            'Détection des mécanismes anti-jailbreak'
          ]}
        ]
      },
      cloud: {
        name: 'Cloud Security',
        items: [
          { text: 'Configurations et permissions', items: [
            'Vérification des politiques IAM',
            'Scan des buckets S3 ou de stockage non sécurisé',
            'Recherche de configurations par défaut',
            'Examen des autorisations excessives'
          ]},
          { text: 'Services spécifiques', items: [
            'Test des fonctions AWS Lambda',
            'Évaluation de la sécurité des conteneurs (Docker, Kubernetes)',
            'Analyse des réseaux virtuels (VPC)',
            'Examen des logs de sécurité'
          ]}
        ]
      },
      social: {
        name: 'Social Engineering',
        items: [
          { text: 'Préparation', items: [
            'Collecte d\'informations sur la cible',
            'Recherche sur les employés et réseaux sociaux',
            'Analyse des vecteurs d\'attaque potentiels'
          ]},
          { text: 'Exécution', items: [
            'Création et envoi de phishing emails',
            'Mise en place de sites de phishing',
            'Tests d\'appels (vishing)',
            'Simulation de pretexting'
          ]}
        ]
      },
      physical: {
        name: 'Physical Security',
        items: [
          { text: 'Évaluation de la sécurité physique', items: [
            'Inspection des points d\'accès',
            'Analyse des systèmes de verrouillage',
            'Évaluation des dispositifs de surveillance',
            'Test de tailgating'
          ]},
          { text: 'Techniques d\'intrusion', items: [
            'Lock picking',
            'Bypass des contrôles d\'accès',
            'Utilisation ou clonage de badges',
            'Exploitation des failles humaines'
          ]}
        ]
      },
      network: {
        name: 'Internal Network Pentesting',
        items: [
          { text: 'Reconnaissance interne', items: [
            'Scan du réseau interne (nmap, arp-scan)',
            'Identification des services et versions',
            'Enumeration des partages réseaux'
          ]},
          { text: 'Escalade de privilèges', items: [
            'Analyse des vulnérabilités de configuration',
            'Exploitation des failles systèmes',
            'Recherche de mots de passe en clair'
          ]}
        ]
      },
      osint: {
        name: 'OSINT',
        items: [
          { text: 'Collecte d\'informations', items: [
            'Recherche sur les réseaux sociaux',
            'Whois lookup et reconnaissance DNS',
            'Extraction de métadonnées',
            'Recherche de documents publics'
          ]},
          { text: 'Analyse', items: [
            'Vérification des sources',
            'Analyse des relations entre entités',
            'Création de rapports d\'OSINT',
            'Utilisation d\'outils (Maltego, SpiderFoot)'
          ]}
        ]
      },
      reverse: {
        name: 'Reverse Engineering',
        items: [
          { text: 'Analyse statique avancée', items: [
            'Utilisation d\'IDA Pro ou Ghidra',
            'Inspection des binaires et librairies',
            'Recherche de patterns et signatures'
          ]},
          { text: 'Analyse dynamique avancée', items: [
            'Débogage avec GDB',
            'Instrumentation avec Frida',
            'Injection de code et hooking'
          ]}
        ]
      },
      forensics: {
        name: 'Digital Forensics & Incident Response',
        items: [
          { text: 'Collecte de preuves', items: [
            'Création d\'images disque',
            'Capture de la mémoire vive',
            'Collecte des logs systèmes et réseaux'
          ]},
          { text: 'Analyse forensique', items: [
            'Analyse des logs et métadonnées',
            'Recherche de traces d\'intrusion',
            'Utilisation d\'outils (Autopsy, FTK)'
          ]}
        ]
      },
      misc: {
        name: 'Exploitation Diversifiée & IoT',
        items: [
          { text: 'IoT Exploitation', items: [
            'Analyse de firmwares',
            'Recherche de configurations par défaut',
            'Test des interfaces web embarquées'
          ]},
          { text: 'SCADA/ICS', items: [
            'Évaluation des protocoles industriels',
            'Test des interfaces de contrôle',
            'Recherche de vulnérabilités spécifiques'
          ]},
          { text: 'Autres', items: [
            'Tests sur conteneurs (Docker, Kubernetes)',
            'Analyse des services de messagerie',
            'Exploitation des mauvaises configurations'
          ]}
        ]
      },
      ctf: {
        name: 'CTF Challenges',
        items: [
          { text: 'Préparation', items: [
            'Installation et mise à jour des outils (pwntools, binwalk, etc.)',
            'Configuration d’environnements isolés (VM, Docker)',
            'Revue de write-ups et documentation'
          ]},
          { text: 'Stratégies par catégorie', items: [
            'CTF Web : injections, XSS, CSRF',
            'CTF Pwn : buffer overflow, format string, ROP chains',
            'CTF Crypto : analyse d’algorithmes, décryptage',
            'CTF Forensics : analyse de fichiers, récupération de données'
          ]},
          { text: 'Gestion du temps et du stress', items: [
            'Priorisation des challenges',
            'Répartition des tâches en équipe',
            'Débriefing et apprentissage post-challenge'
          ]}
        ]
      }
    }
  }),
  actions: {
    getChecklist(type) {
      return this.predefinedChecklists[type] || null
    },
    getAllTypes() {
      return Object.keys(this.predefinedChecklists)
    }
  }
})
