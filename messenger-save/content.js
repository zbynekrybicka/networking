const authToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxfQ.IZ348i8dAN5EzJPMIrMgvE3hHOXixSGANv2WA4IdJsM"
let interval

function getAllTextFromElement(element, result = []) {
    const children = element.childNodes;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (child.nodeType === Node.TEXT_NODE) {
        result.push(child.textContent);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        getAllTextFromElement(child, result);
      }
    }
    return result;
  }

  function parseDateTime(str) {

    // První krok: nastavit rok na aktuální rok
    const now = new Date();
    const year = now.getFullYear();
    
    // Rozdělit řetězec na slova
    const words = str.split(" ");
    
    // Druhý krok: rozhodnout se, zda je čas včera nebo dnes
    if (words[0] === "Včera") {
      now.setDate(now.getDate() - 1);
    } else if (words[0] === "Dnes") {
      // Nic nedělat - máme už aktuální datum
    } else {
      // Datum je uvedeno v textu, musíme ho převést na čas
      const day = parseInt(words[0].replace(".", ""), 10);
      const monthStr = words[1];

      const monthNames = [
        "leden", "únor", "březen", "duben", "květen", "červen",
        "červenec", "srpen", "září", "říjen", "listopad", "prosinec"
      ];
      const month = monthNames.findIndex(m => m === monthStr) + 1;
      const hourMinute = words.length > 2 ? words[3] : words[1];
      const [hour, minute] = hourMinute.split(":").map(n => parseInt(n, 10));
      now.setFullYear(year, month - 1, day);
      now.setHours(hour, minute);
      return now;
    }
    
    // Třetí krok: zpracovat čas
    const timeStr = words[words.length - 1];
    const [hour, minute] = timeStr.split(":").map(n => parseInt(n, 10));
    now.setHours(hour, minute);
    
    return now;
  }
    


function loadMessages() {
    const messages = document.querySelectorAll("[aria-label] > [role=row]")
    const content = []
    odeslanaZprava = []
    if (messages.length) {
        let skutecnyCas = null
        for (let message of messages) {
            message = getAllTextFromElement(message)
            if (message.length === 2) {
                for (const cas of message) {
                    let parsedCas = cas.match(/[0-9]{1,2}:[0-9]{2}$/)
                    if (parsedCas) {
                        try {
                            let ziskanyCas = parseDateTime(cas)
                            if (!isNaN(ziskanyCas.getTime())) {
                                skutecnyCas = ziskanyCas
                            }
                        } catch (e) {
                        }
                    }
                }
            } else {
                const odesilatel = message[0]
                message.shift()
                message.pop()
                odeslanaZprava.push({
                    identifikator_na_platforme: location.pathname,
                    datum_casu: skutecnyCas,
                    od_mne: !!odesilatel.match(/(Poslali jste|Odpověděl jste)/),
                    obsah: message.join("\n")
                });
                
            }
        }

        fetch('http://api.networking.local/messenger-save', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + authToken
            },
            body: JSON.stringify(odeslanaZprava)
          })
          .then(response => {
            console.log('Request sent successfully');
          })
          .catch(error => {
            console.error('Error sending request:', error);
          });
      
    }
  }
  
setTimeout(loadMessages, 10000);
interval = setInterval(loadMessages, 60000); // Posílat request každou minutu
  