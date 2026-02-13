# Virtualbox Windows Server Router: Teorie extinsa

## 1. Scopul topologiei cu doua NIC-uri
Un DC/router in laborator are de obicei:
- NIC WAN (internet, IP variabil, bridged sau NAT host);
- NIC LAN (retea interna, IP static).

Aceasta separare permite control real al traficului dintre laborator si exterior.

## 2. RRAS + NAT in laborator
Routing and Remote Access Service permite translatarea adreselor private interne catre interfata externa.
Aspecte critice:
- identificare corecta a interfetei publice/private;
- activare firewall rules controlat;
- test traseu cu `tracert` din client.

## 3. Plan de adresare recomandat
Exemplu:
- DC01 LAN: `192.168.10.1/24`
- DHCP scope: `192.168.10.50-192.168.10.200`
- DNS clienti: `192.168.10.1`
- Gateway clienti: `192.168.10.1`

## 4. Erori frecvente in VirtualBox
- NAT intern care nu livreaza DHCP in anumite medii.
- NIC-uri inversate (WAN/LAN).
- DNS pe clienti setat spre router extern in loc de DC.
- overlap de subretele intre host si lab.

## 5. Teste obligatorii dupa configurare
- clientul ia IP corect din DHCP;
- clientul rezolva nume intern AD;
- clientul rezolva nume extern internet;
- join in domeniu functioneaza;
- ping/tracert confirma ruta dorita.

## 6. Mini-lab de validare finala
1. Configurati doua clienti Windows 11 in LAN intern.
2. Validati internet pe ambii via NAT din server.
3. Join domeniu si aplicare GPO de test.
4. Capturati evidenta (ipconfig, route print, nslookup).
