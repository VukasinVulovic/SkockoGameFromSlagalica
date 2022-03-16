const pokusaji = document.querySelectorAll('#pokusaji .celija');
const rezultati = document.querySelectorAll('#rezultati .celija');
const selektor = document.getElementById('selektor');
const dugme = document.getElementById('dugme-postavi');
const tajmer = document.querySelector('.tajmer .vrednost');
const vrste = ['skocko', 'tref', 'pik', 'herc', 'karo', 'zvezda'];
const pokusajiIkonice = [];
let trenutniIzbor = [];
let nasumicnoIzabrano = [];
let pozicija = 0;
let igraGotova = false;

window.addEventListener('load', () => {
    nasumicnoIzabrano = izaberiNasumicno(4);

    let vremeProslo = 3;

    const ref = setInterval(() => {
        if(vremeProslo > 100 || igraGotova) {
            clearInterval(ref);

            if(!igraGotova)
                setTimeout(() => alert('Igra je gotova, vreme je isteklo, izgubili ste [Niz je bio: ' + nasumicnoIzabrano.map(i => uzmiIkonicu(i)).join(' ') + ']! (Refresujte kako bi ste igrali ponovo)'));
            
            igraGotova = true;
            return;
        }
        
        tajmer.style.height = vremeProslo + '%';

        vremeProslo += 3;
    }, 2000);

    console.log(nasumicnoIzabrano.map(i => uzmiIkonicu(i)).join(' '));
});


pokusaji.forEach(celija => {
    const ikonica = celija.querySelector('.ikonica');
    pokusajiIkonice.push(ikonica);
});

function uzmiIkonicu(ime) {
    switch(ime) {
        case 'skocko':
            return '🤡';

        case 'tref':
            return '♣';

        case 'pik':
            return '♠';

        case 'herc':
            return '❤';

        case 'karo':
            return '♦';

        case 'zvezda':
            return '⭐';  
            
        default:
            return '🤡';
    }
}

function izaberiNasumicno(broj) {
    let niz = [];

    for(let i = 0; i < broj; i++)
        niz[i] = vrste[Math.floor(Math.random() * 6)];

    return niz;
}

function proveriPogodjene() {
    let pogodjeno = 0;
    let naMestu = 0;

    for(let i = 0; i < nasumicnoIzabrano.length; i++) {
        if(trenutniIzbor[i] === nasumicnoIzabrano[i])
            naMestu++;    

        const index  = trenutniIzbor.indexOf(nasumicnoIzabrano[i]);

        if(index > 0) {
            trenutniIzbor[index] = undefined;
            pogodjeno++;
        }
    }

    console.log('Pogodjeno ' + pogodjeno + ' Na mestu ' + naMestu);

    if(naMestu > pogodjeno)
        pogodjeno = naMestu;

    for(let i = 0; i < 4; i++) {
        let ikonica = '⚫';

        if(i < pogodjeno)
            ikonica = i < naMestu ? '🔴' : '🟡';
        
        rezultati[(pozicija-4) + i].innerHTML = ikonica;
    }

    if(naMestu === 4) {
        igraGotova = true;
        setTimeout(() => alert('Igra je gotova, pobedili ste! (Refresujte kako bi ste igrali ponovo)'), 100);
    }

    trenutniIzbor = [];
}

selektor.querySelectorAll('.ikonica').forEach(izabranaIkonica => {
    izabranaIkonica.addEventListener('click', () => {
        if(igraGotova)
            return;

        const izabrano = izabranaIkonica.title;
        const ikonica = pokusajiIkonice[pozicija];

        ikonica.innerHTML = uzmiIkonicu(izabrano);
        
        if(pozicija >= pokusajiIkonice.length-1) {
            igraGotova = true;
            setTimeout(() => alert('Igra je gotova, izgubili ste [Niz je bio: ' + nasumicnoIzabrano.map(i => uzmiIkonicu(i)).join(' ') + ']! (Refresujte kako bi ste igrali ponovo)'));
            return;
        }
        
        pozicija++;
        trenutniIzbor.push(izabrano);

        if(pozicija !== 0 && pozicija%4 === 0)
            proveriPogodjene();
    });
});
