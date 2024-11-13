pdfMake.fonts = {
  Roboto: {
    normal: 'https://cdn.jsdelivr.net/npm/@fontsource/roboto@4.5.8/files/roboto-latin-ext-400-normal.woff',
    bold: 'https://cdn.jsdelivr.net/npm/@fontsource/roboto@4.5.8/files/roboto-latin-ext-700-normal.woff',
    italics: 'https://cdn.jsdelivr.net/npm/@fontsource/roboto@4.5.8/files/roboto-latin-ext-400-italic.woff',
    bolditalics: 'https://cdn.jsdelivr.net/npm/@fontsource/roboto@4.5.8/files/roboto-latin-ext-700-italic.woff'
  }
};

async function generateAndDownloadPDF() {
  const button = document.querySelector('.download-offer-btn');

  // Funkce pro načtení obrázku a konverzi do base64
  const loadImage = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Chyba při načítání obrázku:', error);
      return null;
    }
  };

  try {
    // Načtení obrázků
    const logoBase64 = await loadImage('https://cdn.shopify.com/s/files/1/0834/5468/9568/files/heli_eulift_logo.png?v=1731406180');
    const homeIconBase64 = await loadImage('https://cdn.shopify.com/s/files/1/0834/5468/9568/files/wholesale.png?v=1731408290');
    const productImageBase64 = button.dataset.productImage ? await loadImage(button.dataset.productImage) : null;

    // Definice stylu dokumentu
    const docDefinition = {
      pageSize: 'A4',
      pageMargins: [40, 40, 40, 40],
      defaultStyle: {
        font: 'Roboto'
      },
      content: [
        {
          columns: [
            {
              image: logoBase64,
              width: 250,
              margin: [0, 0, 0, 20]
            },
            {
              image: homeIconBase64,
              width: 30,
              margin: [235, 30, 0, 0]
            }
          ]
        },
        {
          columns: [
            {
              width: '50%',
              text: [
                { text: 'Odběratel:\n\n\n\n\n\n\n\n\n', style: 'label' },
                { text: 'IČO:\n', style: 'label' },
                { text: 'DIČ:\n', style: 'label' },
                { text: 'Telefon:\n', style: 'label' },
                { text: 'E-mail:\n', style: 'label' }
              ]
            },
            {
              width: '50%',
              alignment: 'right',
              text: [
                { text: 'Dodavatel:\n', style: 'label' },
                { text: 'Gekkon International s.r.o.\n', style: 'bold' },
                'Milheimova 2915\n',
                '530 02 Pardubice\n',
                'Česká republika\n',
                { text: 'IČO: 25930681 / DIČ: CZ25930681\n', style: 'bold' },
                { text: 'Gekkon International s.r.o. vedené u Krajského soudu v Hradci\n', style: 'small' },
                { text: 'Králové pod spisovou značkou: oddíl C vložka 15441\n\n\n', style: 'small' },
                'obchod@eulift.cz\n',
                'www.gekkon.org | www.heli.cz | www.eulift.cz | www.helipowersystem.cz'
              ]
            }
          ],
          margin: [0, 0, 0, 20]
        },
        {
          table: {
            widths: ['60%', '40%'],
            body: [
              [
                [
                  { text: 'NABÍDKA ZBOŽÍ', style: 'tableHeader' },
                  { text: button.dataset.productTitle, margin: [0, 5, 0, 0] }
                ],
                [
                  { 
                    text: button.dataset.productPrice === '0' || button.dataset.productPrice === '0,00' ? 
                          '' : 
                          'Cena bez DPH:', 
                    style: 'label' 
                  },
                  { 
                    text: button.dataset.productPrice === '0' || button.dataset.productPrice === '0,00' ? 
                          'Cena na dotaz' : 
                          button.dataset.productPrice + ' Kč', 
                    style: 'bold' 
                  },
                  { text: '\nDatum pořízení:', style: 'label' },
                  { text: new Date().toLocaleDateString('cs-CZ') }
                ]
              ]
            ]
          },
          margin: [0, 0, 0, 20]
        }
      ],
      styles: {
        tableHeader: {
          fontSize: 14,
          bold: true,
          margin: [0, 5, 0, 5]
        },
        label: {
          fontSize: 10,
          bold: true,
          margin: [0, 3, 0, 3]
        },
        bold: {
          bold: true
        },
        small: {
          fontSize: 8
        },
        productDescription: {
          fontSize: 9,
          margin: [0, 5, 0, 5]
        }
      }
    };

    // Přidání obrázku produktu
    if (productImageBase64) {
      docDefinition.content.push({
        image: productImageBase64,
        width: 200,
        alignment: 'center',
        margin: [0, 0, 0, 20]
      });
    }

    // Přidání krátkého popisu se zmenšeným písmem
    if (button.dataset.kratkyPopis) {
      docDefinition.content.push({
        text: button.dataset.kratkyPopis,
        style: 'productDescription',
        margin: [0, 0, 0, 20]
      });
    }

    // Rozšířený seznam technických parametrů
    const parameters = [
      ['Nosnost', button.dataset.nosnost],
      ['Výška zdvihu', button.dataset.vyskaZdvihu],
      ['Délka vidlic', button.dataset.delkaVidlic],
      ['Šířka vidlice', button.dataset.sirkaVidlice],
      ['Rozteč vidlic vnitřní', button.dataset.roztecVidlicVnitrni],
      ['Rozteč vidlic vnější', button.dataset.roztecVidlicVnejsi],
      ['Celková délka', button.dataset.celkovaDelka],
      ['Celková šířka', button.dataset.celkovaSirka],
      ['Celková výška', button.dataset.celkovaVyska],
      ['Pohon', button.dataset.pohon],
      ['Hmotnost', button.dataset.hmotnost],
      ['Vnitřní rozměr', button.dataset.vnitrniRozmer],
      ['Průměr vidlicového kola', button.dataset.prumerVidlicovehoKola],
      ['Průměr hnacího kola', button.dataset.prumerHnacihoKola],
      ['Minimální výška zdvihu', button.dataset.minimalniVyskaZdvihu],
      ['Délka řetězu', button.dataset.delkaRetezu],
      ['Osvětlení', button.dataset.osvetleni],
      ['Ložná plocha', button.dataset.loznaPlocha],
      ['Tažná kapacita', button.dataset.taznaKapacita],
      ['Výška madla', button.dataset.vyskaMadla],
      ['Rozměry stolu', button.dataset.rozmeryStolu],
      ['Poloměr otáčení', button.dataset.polomerOtaceni],
      ['Ovládání zdvihu', button.dataset.ovladaniZdvihu],
      ['Vidlicová kola', button.dataset.vidlicovaKola],
      ['Materiál kola', button.dataset.materialKola],
      ['Krokový zdvih', button.dataset.krokovyZdvih],
      ['Motor pojezdu', button.dataset.motorPojezdu],
      ['Motor zdvihu', button.dataset.motorZdvihu],
      ['Napájení', button.dataset.napajeni],
      ['Kapacita baterie', button.dataset.kapacitaBaterie],
      ['Vyložení těžiště', button.dataset.vylozeniTeziste],
      ['Maximální výška vozíku', button.dataset.maximalniVyskaVoziku]
    ].filter(([_, value]) => value);

    if (parameters.length > 0) {
      docDefinition.content.push(
        { 
          text: '',
          pageBreak: 'before'
        },
        { 
          text: 'Technické parametry:', 
          style: 'tableHeader', 
          margin: [0, 20, 0, 10]
        },
        {
          table: {
            widths: ['40%', '60%'],
            headerRows: 0,
            body: parameters.map((param, i) => [{
              text: param[0],
              bold: true,
              fillColor: i % 2 === 0 ? '#f8f8f8' : null,
              border: [false, false, false, false],
              margin: [0, 8, 0, 8]
            }, {
              text: param[1],
              fillColor: i % 2 === 0 ? '#f8f8f8' : null,
              border: [false, false, false, false],
              margin: [0, 8, 0, 8]
            }])
          },
          layout: {
            hLineWidth: function() { return 0; },
            vLineWidth: function() { return 0; },
            paddingLeft: function() { return 5; },
            paddingRight: function() { return 5; },
            paddingTop: function() { return 3; },
            paddingBottom: function() { return 3; }
          }
        }
      );
    }

    // Patička
    docDefinition.footer = {
      text: 'Pro více informací navštivte náš e-shop www.eulift.cz', style: 'small',
      alignment: 'center',
      margin: [40, 0]
    };

    // Generování PDF
    pdfMake.createPdf(docDefinition).download(`nabidka-${button.dataset.productTitle.toLowerCase().replace(/\s+/g, '-')}.pdf`);

  } catch (error) {
    console.error('Chyba při generování PDF:', error);
    alert('Nastala chyba při generování PDF. Prosím zkuste to znovu později.');
  }
}

