TODO
====

* OpenID-loginin voisi hoitaa nätimmin -- nyt se on tiukasti pultattu kiinni kompomaattiin.
* Äänestysjärjestelmä voisi olla parempi... jokin viiva jota voisi siirrellä, ts. "tämän alapuolella
  olevat ovat kaikki saman arvoisia (i don't care)".
* Ei turhaan kysytä pikkukuvaa musiikkitiedostoille. Entryn lisääminen voisi olla hieman kustomoitavampi.

Asiakkaille näkyvä osio
-----------------------

* /kompomaatti/
* /2012/
* /2013/ (jne)
* /arkisto/

Admineille näkyvä osio
----------------------

Seuraaville olisi yhtenäinen navigointilayout. Kaikille sivuille pääsisi
vain admin-oikeuksilla.

/blog-admin/
* Bloginhallinta. Sisällön lisääminen, poisto, muokkaaminen.
* Blogientryjä voisi julkaista kun tuntuu siltä. Ajastettu julkaisu ?
* Saisi minne tahansa näkyviin templatetagilla {% render_blog %} (pääsivulle)
* Voisi samalla julkaista myös twitteriin, facebookkiin ...

/schedule-admin/
* Aikataulunhallinta. Kalenteriin tapahtumien lisääminen/poisto/muokkaus.
* Esim. Kompot, esitelmät, jne.
* Tapahtumiin voisi linkata kompoja, jolloin tarkemmat tiedot haettaisiin kompomaatista.
* Saisi minne vaan näkyviin templatetagilla {% render_schedule %} (pääsivulle)

/upload/
* Tiedostojen tallennuspalvelu. Tänne voisi laittaa taustakuvia jne. muita palveluita varten.
* Kuka tahansa ADMIN voisi lisätä/poistaa tiedostoja. Ei käyttäjäkohtaisia oikeuksia, yksinkertainen
  värkki. Ei myöskään erillistä suojausta tiedostoille, eli kuka tahansa voi lukea jos tietää nimen.
  
/dia-admin/
* Diaesitysten generointi kompomaatin datasta.
  * Kompoihin
  * Palkintojen jakoon
* Taustakuvat ja muut käytettävät jutut voitaisiin noukkia upload-palvelusta
* Html + JS (?)
  
/kompomaatti-admin/
* Kompomaatin hallintapaneelin voisi siirtää omaan paikkaansa. Nyt se elää vähän ahtaasti.
* Parempi openid-käyttäjien hallinta

/arkisto-admin/
* Kunnollinen käyttöliittymä arkistointi-operaatioiden hallintaan.
  * mm. teosten siirto openid-käyttäjiltä arkisto-käyttäjälle.
  * vanha entryarchivaltool voisi tulla osaksi tätä.
  
/screenshow-admin/
* Hakisi tietoja aikataulusta ja demokompoista, ja näyttäisi niiden tietoja screenillä satunnaisesti
* Voisi myös näyttää upload-palvelulla upattuja kuvia kun halutaan (sponsorit?)
* Ääntä, videoita ? (HTML5)