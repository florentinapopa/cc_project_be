# NLP App BE
1. Introducere
Cloud computing reprezintă furnizarea de servicii diferite prin Internet. Aceste resurse includ instrumente și aplicații precum stocarea datelor, servere, baze de date, rețele și software.
În loc să stocăm fișierele pe un hard disk proprietar sau pe un dispozitiv de stocare local, stocarea bazată pe cloud face posibilă salvarea lor într-o bază de date de la distanță. Atâta timp cât un dispozitiv electronic are acces la web, acesta are acces la date și la programele software pentru a-l rula.
Cloud computing este o opțiune populară pentru oameni și companii din mai multe motive, inclusiv economii de costuri, productivitate crescută, viteză și eficiență, performanță și securitate.
2. Descriere problema
Pentru a putea demonstra utilitatea serviciilor cloud am implementat o aplicație pentru procesarea limbajului natural. Natural language processing sau NLP este capacitatea unui program de calculator de a înțelege limbajul uman așa cum este vorbit și scris -- denumit limbaj natural. Este o componentă a inteligenței artificiale.
NLP există de mai bine de 50 de ani și are rădăcini în domeniul lingvisticii. Are o varietate de aplicații din lumea reală într-un număr de domenii, inclusiv cercetarea medicală, motoarele de căutare și business intelligence.
NLP permite computerelor să înțeleagă limbajul natural așa cum o fac oamenii. Indiferent dacă limba este vorbită sau scrisă, procesarea limbajului natural folosește inteligența artificială pentru a prelua informații din lumea reală, pentru a le procesa și pentru a le înțelege într-un mod pe care un computer îl poate înțelege. Așa cum oamenii au senzori diferiți - cum ar fi urechile pentru a auzi și ochii pentru a vedea - computerele au programe de citit și microfoane pentru a colecta sunet. Și așa cum oamenii au un creier pentru a procesa acea intrare, computerele au un program pentru a procesa intrările lor respective. La un moment dat în procesare, intrarea este convertită în cod pe care computerul îl poate înțelege.
Există două faze principale ale procesării limbajului natural: preprocesarea datelor și dezvoltarea algoritmului.
Preprocesarea datelor presupune pregătirea și „curățarea” datelor text pentru ca mașinile să le poată analiza. Preprocesarea pune datele într-o formă viabilă și evidențiază caracteristicile din text cu care poate funcționa un algoritm. 
Procesarea limbajului natural joacă un rol vital în tehnologie și în modul în care oamenii interacționează cu ea. Este folosit în multe aplicații din lumea reală, atât în sfera de afaceri, cât și în sfera consumatorilor, inclusiv în chatboți, securitate cibernetică, motoarele de căutare și analiza datelor mari. Deși nu lipsită de provocările sale, se așteaptă ca NLP să continue să fie o parte importantă atât a industriei, cât și a vieții de zi cu zi

3. Descriere API
	Pentru a putea exemplifica o platformă simplă de procesare a limbajului natural am dezvoltat o aplicație web ce cuprinde un API REST și două servicii cloud de la Google: Cloud Language API și Cloud Translate API.
•	Cloud Language API - oferă dezvoltatorilor tehnologii de înțelegere a limbajului natural, inclusiv analiza sentimentelor, analiza entităților, analiza sentimentelor entităților, clasificarea conținutului și analiza sintaxei folosind modele pre-antrenate puternice. Acest API face parte din familia mai mare de API Cloud Machine Learning.  API-ul pune la dispoziție o suită de funcții ce analizează diverse elemente ale unui text dintr-un document, iar modul prin care se folosesc este explicat în documentația oficială:
 
•	Cloud Translation API - folosește tehnologia de traducere automată neuronală de la Google pentru a traduce instantaneu texte în mai mult de o sută de limbi. În momentul de față există două variante ale API-ului, Advanced și Basic. Translation API Advanced oferă aceleași rezultate rapide și dinamice pe care le obțineți cu funcțiile de Basic, dar are funcții suplimentare. Acesta poate fi folositor pentru termenii sau expresiile specifice domeniului și contextului și traducerea documentelor formatate. Pentru aplicația dezvoltată am folosit varianta Basic Translation, ce pune la dispoziție funcții pentru detectarea limbii și pentru traducerea propriu-zisă.
Am ales să folosesc cele două servicii în următorul mod: Language API a fost folosit pentru a implementa funcționalitatea de bază a aplicației, detectarea analiza entităților din text și identificarea categoriei/categoriilor în care se încadrează, ce pot fi salvate mai apoi în baza de date. Întrucât Language API nu este disponibil în toate limbile (ex. nu poate detecta textul din limba română) am ales să adaug posibilitatea de a traduce în câteva limbi permise folosind Translation API.

4. Flux de date
API-ul REST al aplicației cuprinde metode HTTP de tip GET și POST ce sunt folosite pentru a salva informații în baza de date, pentru a afișa intrările din baza de date în interfață și pentru a integra analiza entităților și a categoriilor.
Astfel, avem următoarele metode:
GET /entities – realizează o interogare ce selectează toate entitățile din baza de date și întoarce un obiect JSON de tipul:
{
    "entities": [
        {
            "entityID": 1,
            "entityName": "Gabrielle Chanel",
            "entityType": "PERSON",
            "url": "https://de.wikipedia.org/wiki/Coco_Chanel"
        },
        {
            "entityID": 2,
            "entityName": "company",
            "entityType": "ORGANIZATION",
            "url": ""
        }, ...
	]
}

GET /categories – asemenea pentru entities, întoarce un obiect JSON cu categoriile existente:
{
    "categories": [
        {
            "categoryID": 1,
            "categoryName": "Books & Literature",
            "confidence": " 0.93"
        },
        {
            "categoryID": 2,
            "categoryName": "/Shopping/Apparel/Footwear",
            "confidence": "0.61"
        },
        {
            "categoryID": 3,
            "categoryName": "/Food & Drink/Food",
            "confidence": "0.71"
        }
    ]
}

POST /entities – trimite in interiorul request body-ului informații ce trebuie salvate în baza de date și întoarce un mesaj de succes daca operația s-a realizat cu succes
Exemplu de request body:
{
            "entityName": "Gabrielle Chanel",
            "entityType": "PERSON",
            "url": https://de.wikipedia.org/wiki/Coco_Chanel
}

POST /categories – urmează același principiu ca pentru entities
Exemplu de request body:
{
            "categoryID": 2,
            "categoryName": "/Shopping/Apparel/Footwear",
            "confidence": "0.61"
}

GET /language/entities – trimite prin query params textul și limba în care trebuie tradus, verifică faptul că textul nu este deja scris într-o limbă permisă și dacă nu este acest caz, traduce textul în limba specificată, iar la final întoarce un obiect JSON cu entitățile indentificate prin Language API
Exemplu de request:
http://localhost:8080/language/entities?language=ENGLISH&text=Google+LLC+este+o+corpora%C8%9Bie+american%C4%83


Exemplu de response:
{
    "entities": [
        {
            "entityName": "Florentina",
            "entityType": "PERSON",
            "url": ""
        }
    ]
}

GET /language/categories – trimite prin query params textul ce trebuie analizat, pe care îl traduce întâi în limba engleză dacă nu este deja, iar la final întoarce un obiect JSON cu categoriile identificate prin Language API

Exemplu de request:
http://localhost:8080/language/categories?language=ENGLISH&text=Google+LLC+este+o+corpora%C8%9Bie+american%C4%83

Exemplu de response:
{
    "categories": [
        {
            "categoryName": "/Internet & Telecom",
            "confidence": 0.8399999737739563
        }
    ]
}

