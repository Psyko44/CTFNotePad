<template>
  <v-container fluid class="pa-0">
    <v-card class="ma-2">
      <v-card-title class="text-h4 text-center blue--text">
        Guide des Techniques OSINT
      </v-card-title>

      <v-tabs v-model="currentTab" color="blue" align-tabs="center" grow>
        <v-tab value="dorking">
          <v-icon start>mdi-magnify</v-icon>
          Google Dorking
        </v-tab>
        <v-tab value="personnes">
          <v-icon start>mdi-account-search</v-icon>
          Recherche de Personnes
        </v-tab>
        <v-tab value="societes">
          <v-icon start>mdi-domain</v-icon>
          Entreprises
        </v-tab>
        <v-tab value="reseaux">
          <v-icon start>mdi-web</v-icon>
          Réseaux Sociaux
        </v-tab>
        <v-tab value="images">
          <v-icon start>mdi-image-search</v-icon>
          Images
        </v-tab>
        <v-tab value="geoloc">
          <v-icon start>mdi-map-marker</v-icon>
          Géolocalisation
        </v-tab>
      </v-tabs>

      <v-window v-model="currentTab">
        <!-- Google Dorking -->
        <v-window-item value="dorking">
          <v-card flat>
            <v-card-text>
              <v-list>
                <v-list-item class="pa-0" style="pointer-events: none;">
                  <v-list-item-content>
                    <v-list-item-title class="text-h6 font-weight-bold px-4 pt-4">
                      Techniques de Google Dorking
                    </v-list-item-title>
                    <v-list-item-subtitle class="px-4">
                      <div class="mt-4">
                        <div class="font-weight-bold mb-4">Ressources :</div>
                        <v-row>
                          <v-col cols="6">
                            <v-list-item density="compact" href="https://www.exploit-db.com/google-hacking-database"
                              target="_blank">
                              <v-list-item-title>GHDB</v-list-item-title>
                              <v-list-item-subtitle>Google Hacking Database</v-list-item-subtitle>
                            </v-list-item>
                          </v-col>
                        </v-row>
                      </div>

                      <CodeExample title="Recherche de fichiers sensibles"
                        code="site:example.com filetype:pdf intext:confidential"
                        explanation="Recherche des PDF contenant le mot 'confidential' sur un domaine spécifique" />
                      <CodeExample title="Fichiers exposés" code="intitle:index.of password.txt"
                        explanation="Recherche des répertoires exposés contenant des fichiers de mots de passe" />
                      <CodeExample title="Panneaux d'administration" code="inurl:admin intitle:login"
                        explanation="Trouve des pages de connexion admin" />
                      <CodeExample title="Fichiers de configuration" code="filetype:env intext:DB_PASSWORD"
                        explanation="Recherche des fichiers .env exposés contenant des mots de passe" />
                      <CodeExample title="Documents internes"
                        code="site:docs.google.com intext:'company name' intext:confidential"
                        explanation="Trouve des documents Google Docs exposés" />
                      <CodeExample title="Bases de données exposées" code="filetype:sql intext:password intext:username"
                        explanation="Recherche des dumps SQL exposés" />
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-window-item>
        <!-- Recherche de Personnes -->
        <v-window-item value="personnes">
          <v-card flat>
            <v-card-text>
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6 font-weight-bold">
                      Moteurs de recherche spécialisés
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <div class="mt-4">
                        <div class="font-weight-bold mb-4">Recherche de Personnes :</div>
                        <v-row>
                          <v-col cols="6">
                            <v-list-item density="compact" href="https://whatsmyname.app/" target="_blank">
                              <v-list-item-title>WhatsMyName</v-list-item-title>
                              <v-list-item-subtitle>Recherche par nom</v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item density="compact" href="https://pipl.com/" target="_blank">
                              <v-list-item-title>Pipl</v-list-item-title>
                              <v-list-item-subtitle>Recherche d'informations personnelles</v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item density="compact" href="https://www.whitepages.com/" target="_blank">
                              <v-list-item-title>WhitePages</v-list-item-title>
                              <v-list-item-subtitle>Annuaire en ligne</v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item density="compact" href="https://lullar.com/" target="_blank">
                              <v-list-item-title>Lullar</v-list-item-title>
                              <v-list-item-subtitle>Agrégateur d'informations publiques</v-list-item-subtitle>
                            </v-list-item>
                          </v-col>
                          <v-col cols="6">
                            <v-list-item density="compact" href="https://thatsthem.com/" target="_blank">
                              <v-list-item-title>That'sThem</v-list-item-title>
                              <v-list-item-subtitle>Recherche de personnes approfondie</v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item density="compact" href="https://www.spokeo.com/" target="_blank">
                              <v-list-item-title>Spokeo</v-list-item-title>
                              <v-list-item-subtitle>Agrégateur d'informations</v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item density="compact" href="https://webmii.com/" target="_blank">
                              <v-list-item-title>Webmii</v-list-item-title>
                              <v-list-item-subtitle>Analyse de présence en ligne</v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item density="compact" href="https://social-searcher.com/" target="_blank">
                              <v-list-item-title>Social-Searcher</v-list-item-title>
                              <v-list-item-subtitle>Recherche sur les réseaux sociaux</v-list-item-subtitle>
                            </v-list-item>
                          </v-col>
                        </v-row>

                        <div class="font-weight-bold mb-4 mt-8">Recherche d'Emails et Téléphones :</div>
                        <v-row>
                          <v-col cols="6">
                            <v-list-item density="compact" href="https://hunter.io/" target="_blank">
                              <v-list-item-title>Hunter.io</v-list-item-title>
                              <v-list-item-subtitle>Recherche d'emails professionnels</v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item density="compact" href="https://emailrep.io/" target="_blank">
                              <v-list-item-title>EmailRep.io</v-list-item-title>
                              <v-list-item-subtitle>Vérification de la réputation d'une adresse email</v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item density="compact" href="https://emailhippo.com/" target="_blank">
                              <v-list-item-title>EmailHippo</v-list-item-title>
                              <v-list-item-subtitle>Vérification d'emails et informations associées</v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item density="compact" href="https://verify-email.org/" target="_blank">
                              <v-list-item-title>Verify Email</v-list-item-title>
                              <v-list-item-subtitle>Vérification de l'existence d'une adresse email</v-list-item-subtitle>
                            </v-list-item>
                          </v-col>
                          <v-col cols="6">
                            <v-list-item density="compact" href="https://www.truecaller.com/" target="_blank">
                              <v-list-item-title>Truecaller</v-list-item-title>
                              <v-list-item-subtitle>Identification d'appelants et recherche</v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item density="compact" href="https://phonebook.cz/" target="_blank">
                              <v-list-item-title>Phonebook.cz</v-list-item-title>
                              <v-list-item-subtitle>Recherche d'informations (Europe centrale)</v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item density="compact" href="https://intelx.io/" target="_blank">
                              <v-list-item-title>IntelX</v-list-item-title>
                              <v-list-item-subtitle>Moteur de recherche de données publiques</v-list-item-subtitle>
                            </v-list-item>
                          </v-col>
                        </v-row>
                      </div>

                      <CodeExample
                        title="Recherche par email"
                        code="# Recherche par email (Google Dorking)
site:linkedin.com OR site:twitter.com 'email@domain.com'

# Recherche d'emails associés à un domaine
hunter.io/domain/example.com

# Vérification d'email avec EmailHippo
emailhippo.com/email/verify/email@domain.com

# Recherche d'informations associées
skymem.info/email@domain.com

# Analyse des en-têtes d'email
mxtoolbox.com/EmailHeaders.aspx

# Vérification des fuites de données
haveibeenpwned.com/email@domain.com

# Recherche DNS MX
nslookup -type=mx domain.com

# Recherche WHOIS
whois domain.com"
                        explanation="Collection de techniques pour la recherche et l'analyse d'emails. Attention à respecter les conditions d'utilisation de chaque service." />
                      <CodeExample
                        title="Analyse de réputation d'email"
                        code="# Vérification de réputation (EmailRep.io)
curl -H 'Key: API_KEY' https://emailrep.io/email@domain.com

# Vérification des serveurs de messagerie
dig +short MX domain.com

# Vérification SPF
dig +short TXT domain.com | grep spf"
                        explanation="Techniques pour évaluer la fiabilité et la sécurité d'une adresse email" />
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-window-item>

        <!-- Entreprises -->
        <v-window-item value="societes">
          <v-card flat>
            <v-card-text>
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6 font-weight-bold">
                      Recherche d'informations sur les entreprises
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <div class="mt-4">
                        <div class="font-weight-bold mb-4">Sources :</div>
                        <v-row>
                          <v-col cols="6">
                            <v-list-item density="compact" href="https://www.societe.ninja/" target="_blank">
                              <v-list-item-title>Societe.ninja</v-list-item-title>
                              <v-list-item-subtitle>Réseau professionnel</v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item density="compact" href="https://www.linkedin.com/" target="_blank">
                              <v-list-item-title>LinkedIn</v-list-item-title>
                              <v-list-item-subtitle>Réseau professionnel</v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item density="compact" href="https://www.crunchbase.com/" target="_blank">
                              <v-list-item-title>Crunchbase</v-list-item-title>
                              <v-list-item-subtitle>Base de données d'entreprises</v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item density="compact" href="https://opencorporates.com/" target="_blank">
                              <v-list-item-title>OpenCorporates</v-list-item-title>
                              <v-list-item-subtitle>Registre des sociétés mondial</v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item density="compact" href="https://www.societe.com/" target="_blank">
                              <v-list-item-title>Societe.com</v-list-item-title>
                              <v-list-item-subtitle>Informations légales (France)</v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item density="compact"
                              href="https://www.boursorama.com/patrimoine/annuaire-entreprises/" target="_blank">
                              <v-list-item-title>Boursorama - Annuaire Entreprises</v-list-item-title>
                              <v-list-item-subtitle>Informations financières et légales (France)</v-list-item-subtitle>
                            </v-list-item>
                          </v-col>
                          <v-col cols="6">
                            <v-list-item density="compact" href="https://www.verif.com/" target="_blank">
                              <v-list-item-title>Verif.com</v-list-item-title>
                              <v-list-item-subtitle>Informations légales et financières (France)</v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item density="compact" href="https://www.infogreffe.fr/" target="_blank">
                              <v-list-item-title>Infogreffe</v-list-item-title>
                              <v-list-item-subtitle>Registres du commerce et des sociétés
                                (France)</v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item density="compact" href="https://kompass.com/" target="_blank">
                              <v-list-item-title>Kompass</v-list-item-title>
                              <v-list-item-subtitle>Informations et contacts d'entreprises B2B</v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item density="compact" href="https://www.owler.com/" target="_blank">
                              <v-list-item-title>Owler</v-list-item-title>
                              <v-list-item-subtitle>Informations sur les entreprises et leurs
                                concurrents</v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item density="compact" href="https://beta.companieshouse.gov.uk/" target="_blank">
                              <v-list-item-title>Companies House (UK)</v-list-item-title>
                              <v-list-item-subtitle>Registre des sociétés (Royaume-Uni)</v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item density="compact" href="https://sayari.com/" target="_blank">
                              <v-list-item-title>Sayari</v-list-item-title>
                              <v-list-item-subtitle>Intelligence financière et risque (peut nécessiter un
                                abonnement)</v-list-item-subtitle>
                            </v-list-item>
                          </v-col>
                        </v-row>
                      </div>

                      <CodeExample title="Recherche d'employés" code="site:linkedin.com 'Entreprise XYZ' 'Current'"
                        explanation="Recherche les employés actuels d'une entreprise sur LinkedIn" />
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-window-item>

        <!-- Réseaux Sociaux -->
        <v-window-item value="reseaux">
          <v-card flat>
            <v-card-text>
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6 font-weight-bold">
                      Investigation sur les réseaux sociaux
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <div class="mt-4">
                        <div class="font-weight-bold mb-4">Outils :</div>
                        <v-row>
                          <v-col cols="6">
                            <v-list-item density="compact" href="https://github.com/sherlock-project/sherlock"
                              target="_blank">
                              <v-list-item-title>Sherlock</v-list-item-title>
                              <v-list-item-subtitle>Recherche de pseudonymes</v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item density="compact" href="https://github.com/twintproject/twint" target="_blank">
                              <v-list-item-title>Twint</v-list-item-title>
                              <v-list-item-subtitle>Scraping Twitter avancé (nécessite
                                installation)</v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item density="compact" href="https://social-searcher.com/" target="_blank">
                              <v-list-item-title>Social-Searcher</v-list-item-title>
                              <v-list-item-subtitle>Moteur de recherche de contenu social</v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item density="compact" href="https://www.mentionmapp.com/" target="_blank">
                              <v-list-item-title>Mentionmapp</v-list-item-title>
                              <v-list-item-subtitle>Visualisation des réseaux Twitter</v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item density="compact" href="https://keyhole.co/" target="_blank">
                              <v-list-item-title>Keyhole</v-list-item-title>
                              <v-list-item-subtitle>Analyse de hashtags et de mots-clés (payant)</v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item density="compact" href="https://pipl.com/" target="_blank">
                              <v-list-item-title>Pipl</v-list-item-title>
                              <v-list-item-subtitle>Recherche de profils sociaux liés aux
                                personnes</v-list-item-subtitle>
                            </v-list-item>
                          </v-col>
                          <v-col cols="6">
                            <v-list-item density="compact" href="https://github.com/qeeqbox/social-analyzer"
                              target="_blank">
                              <v-list-item-title>Social Analyzer</v-list-item-title>
                              <v-list-item-subtitle>Analyse multi-plateformes (nécessite
                                installation)</v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item density="compact" href="https://intelx.io/" target="_blank">
                              <v-list-item-title>IntelX</v-list-item-title>
                              <v-list-item-subtitle>Agrégateur de données (inclut les réseaux
                                sociaux)</v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item density="compact" href="https://www.followthehashtag.com/" target="_blank">
                              <v-list-item-title>FollowTheHashtag</v-list-item-title>
                              <v-list-item-subtitle>Analyse de hashtags Twitter</v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item density="compact" href="https://www.trendri.com/" target="_blank">
                              <v-list-item-title>Trendri</v-list-item-title>
                              <v-list-item-subtitle>Analyse de tendances sur les réseaux sociaux</v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item density="compact" href="https://lookupid.com/" target="_blank">
                              <v-list-item-title>LookupID</v-list-item-title>
                              <v-list-item-subtitle>Conversion d'identifiants de réseaux sociaux</v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item density="compact" href="https://maigret.github.io/" target="_blank">
                              <v-list-item-title>Maigret</v-list-item-title>
                              <v-list-item-subtitle>Recherche de noms d'utilisateur (nécessite
                                installation)</v-list-item-subtitle>
                            </v-list-item>
                          </v-col>
                        </v-row>
                      </div>

                      <CodeExample title="Recherche avec Sherlock" code="python3 sherlock.py username"
                        explanation="Recherche un pseudonyme sur plus de 300 sites web" />
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-window-item>

        <!-- Images -->
        <v-window-item value="images">
          <v-card flat>
            <v-card-text>
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6 font-weight-bold">
                      Analyse d'images
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <div class="mt-4">
                        <div class="font-weight-bold mb-4">Outils :</div>
                        <v-row>
                          <v-col cols="6">
                            <v-list-item density="compact" href="https://images.google.com/" target="_blank">
                              <v-list-item-title>Google Images</v-list-item-title>
                              <v-list-item-subtitle>Recherche inversée</v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item density="compact" href="https://tineye.com/" target="_blank">
                              <v-list-item-title>TinEye</v-list-item-title>
                              <v-list-item-subtitle>Recherche par image</v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item density="compact" href="https://yandex.com/images/" target="_blank">
                              <v-list-item-title>Yandex Images</v-list-item-title>
                              <v-list-item-subtitle>Alternative puissante pour la recherche
                                inversée</v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item density="compact" href="https://www.bing.com/images/" target="_blank">
                              <v-list-item-title>Bing Images</v-list-item-title>
                              <v-list-item-subtitle>Recherche inversée d'images</v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item density="compact" href="https://www.shutterstock.com/fr/reverse-image-search"
                              target="_blank">
                              <v-list-item-title>Shutterstock - Recherche d'image inversée</v-list-item-title>
                              <v-list-item-subtitle>Recherche dans leur base d'images
                                commerciales</v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item density="compact" href="https://www.imageraider.com/" target="_blank">
                              <v-list-item-title>ImageRaider</v-list-item-title>
                              <v-list-item-subtitle>Recherche de similarités et de sources</v-list-item-subtitle>
                            </v-list-item>
                          </v-col>
                          <v-col cols="6">
                            <v-list-item density="compact" href="https://exiftool.org/" target="_blank">
                              <v-list-item-title>ExifTool</v-list-item-title>
                              <v-list-item-subtitle>Analyse des métadonnées (outil en ligne ou à
                                installer)</v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item density="compact" href="https://29a.ch/sandbox/2020/filealyzer/"
                              target="_blank">
                              <v-list-item-title>FileAlyzer</v-list-item-title>
                              <v-list-item-subtitle>Analyse de fichiers, y compris les métadonnées d'images
                                (Windows)</v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item density="compact" href="https://onlineexifviewer.com/" target="_blank">
                              <v-list-item-title>Online EXIF Viewer</v-list-item-title>
                              <v-list-item-subtitle>Visualisation des métadonnées en ligne</v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item density="compact" href="https://pimeyes.com/" target="_blank">
                              <v-list-item-title>PimEyes</v-list-item-title>
                              <v-list-item-subtitle>Recherche de visages (attention à la vie
                                privée)</v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item density="compact" href="https://fotoforensics.com/" target="_blank">
                              <v-list-item-title>FotoForensics</v-list-item-title>
                              <v-list-item-subtitle>Analyse de manipulation d'images</v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item density="compact" href="https://www.extractmetadata.com/" target="_blank">
                              <v-list-item-title>Extract Metadata</v-list-item-title>
                              <v-list-item-subtitle>Extraction simple de métadonnées en ligne</v-list-item-subtitle>
                            </v-list-item>
                          </v-col>
                        </v-row>
                      </div>

                      <CodeExample title="Extraction de métadonnées" code="exiftool -a -u image.jpg"
                        explanation="Extrait toutes les métadonnées d'une image, y compris les tags cachés" />
                      <CodeExample title="Analyse avec Steghide" code="steghide extract -sf image.jpg -xf output.txt"
                        explanation="Extrait les données cachées dans une image avec steghide" />
                      <CodeExample title="Analyse avec Stegsolve" code="java -jar stegsolve.jar"
                        explanation="Lance l'interface graphique de Stegsolve pour analyser les couches de l'image" />
                      <CodeExample title="Analyse avec Binwalk" code="binwalk -e image.jpg"
                        explanation="Extrait les fichiers cachés dans l'image" />
                      <CodeExample title="Récupération avec Foremost" code="foremost -i image.jpg -o output/"
                        explanation="Récupère les fichiers cachés basé sur leurs signatures" />
                      <CodeExample title="Analyse hexadécimale" code="xxd image.jpg | grep -i 'PK'"
                        explanation="Recherche des signatures de fichiers ZIP dans l'image" />
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-window-item>

        <!-- Géolocalisation -->
        <v-window-item value="geoloc">
          <v-card flat>
            <v-card-text>
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6 font-weight-bold">
                      Techniques de géolocalisation
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <div class="mt-4">
                        <div class="font-weight-bold mb-4">Outils :</div>
                        <v-row>
                          <v-col cols="6">
                            <v-list-item density="compact" href="https://www.google.com/maps" target="_blank">
                              <v-list-item-title>Google Maps</v-list-item-title>
                              <v-list-item-subtitle>Cartographie générale et Street View</v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item density="compact" href="https://www.geoguessr.com/" target="_blank">
                              <v-list-item-title>GeoGuessr</v-list-item-title>
                              <v-list-item-subtitle>Géolocalisation par image</v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item density="compact" href="https://wigle.net/" target="_blank">
                              <v-list-item-title>Wigle.net</v-list-item-title>
                              <v-list-item-subtitle>Base de données des réseaux WiFi et
                                cellulaires</v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item density="compact" href="https://www.suncalc.org/" target="_blank">
                              <v-list-item-title>SunCalc</v-list-item-title>
                              <v-list-item-subtitle>Analyse de la position du soleil pour la géolocalisation
                                temporelle</v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item density="compact" href="https://earth.google.com/" target="_blank">
                              <v-list-item-title>Google Earth</v-list-item-title>
                              <v-list-item-subtitle>Imagerie satellite et 3D</v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item density="compact" href="https://maps.openstreetmaps.org/" target="_blank">
                              <v-list-item-title>OpenStreetMap</v-list-item-title>
                              <v-list-item-subtitle>Carte collaborative open source</v-list-item-subtitle>
                            </v-list-item>
                          </v-col>
                          <v-col cols="6">
                            <v-list-item density="compact" href="https://what3words.com/" target="_blank">
                              <v-list-item-title>what3words</v-list-item-title>
                              <v-list-item-subtitle>Système d'adressage unique par 3 mots</v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item density="compact" href="https://www.gps-coordinates.net/" target="_blank">
                              <v-list-item-title>GPS Coordinates.net</v-list-item-title>
                              <v-list-item-subtitle>Conversion de coordonnées GPS et recherche de
                                lieux</v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item density="compact" href="https://www.mapillary.com/" target="_blank">
                              <v-list-item-title>Mapillary</v-list-item-title>
                              <v-list-item-subtitle>Imagerie de rue collaborative</v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item density="compact" href="https://skyvector.com/" target="_blank">
                              <v-list-item-title>SkyVector</v-list-item-title>
                              <v-list-item-subtitle>Cartes aéronautiques (utile pour identifier des points de
                                repère)</v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item density="compact" href="https://www.flightradar24.com/" target="_blank">
                              <v-list-item-title>Flightradar24</v-list-item-title>
                              <v-list-item-subtitle>Suivi des vols en temps réel (peut aider à confirmer des
                                lieux)</v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item density="compact" href="https://opencellid.org/" target="_blank">
                              <v-list-item-title>OpenCelliD</v-list-item-title>
                              <v-list-item-subtitle>Base de données collaborative des tours de téléphonie
                                cellulaire</v-list-item-subtitle>
                            </v-list-item>
                          </v-col>
                        </v-row>
                      </div>

                      <CodeExample title="Recherche par coordonnées" code="https://www.google.com/maps?q=48.8584,2.2945"
                        explanation="Ouvre Google Maps aux coordonnées spécifiées" />
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

const currentTab = ref('dorking')
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
  color: #2196f3;
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

.v-list-item:not([href]):not([target]):hover {
  background-color: transparent !important;
  opacity: 1 !important;
}
</style>
