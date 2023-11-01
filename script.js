  // IMC DATA
  const data = [
      {
        min: 0,
        max: 18.4,
        classification: "Menor que 18,5",
        info: "Magreza",
        obesity: "0",
      },
      {
        min: 18.5,
        max: 24.9,
        classification: "Entre 18,5 e 24,9",
        info: "Normal",
        obesity: "0",
      },
      {
        min: 25,
        max: 29.9,
        classification: "Entre 25,0 e 29,9",
        info: "Sobrepeso",
        obesity: "I",
      },
      {
        min: 30,
        max: 39.9,
        classification: "Entre 30,0 e 39,9",
        info: "Obesidade",
        obesity: "II",
      },
      {
        min: 40,
        max: 99,
        classification: "Maior que 40,0",
        info: "Obesidade grave",
        obesity: "III",
      },
    ];
    
  // Seleção de elementos
  const imcTable = document.querySelector("#table-imc");
  const clearBtn = document.querySelector("#btn-clean");
  const weightInput = document.querySelector("#weight");
  const heightInput = document.querySelector("#height");


  // part two 
  const calcContainer = document.querySelector("#calc-container")
  const result = document.querySelector("#result")
  const calcBtn = document.querySelector("#btn-cal");
  const backBtn = document.querySelector("#back-btn")
  const numberSpan = document.querySelector("#number-imc span")
  const infoSpan = document.querySelector("#info-imc span")
 
 

  // Functions
  function createTable(data) {
      data.forEach((item) => {
        const divCriada = document.createElement("div");
        divCriada.classList.add("table-data");
    
        const classification = document.createElement("p");
        classification.innerText = item.classification;
    
        const info = document.createElement("p");
        info.innerText = item.info;
    
        const obesity = document.createElement("p");
        obesity.innerText = item.obesity;
    
        divCriada.appendChild(classification);
        divCriada.appendChild(info);
        divCriada.appendChild(obesity);
    
        imcTable.appendChild(divCriada);
      });
    }
    

    function clearInputs(){
      weightInput.value = "";
      heightInput.value = "";
      numberSpan.value = "";
      infoSpan.value = "";
    } 

    function valueDigits(text){
      return text.replace(/[^0-9,]/g, "");
    }

    // Calcular IMC
    function CalcIMC(weight, height){
      const IMC = (weight/(height*height)).toFixed(1)
      return IMC
    }

    function hideResult(){
      calcContainer.classList.toggle("hide")
      result.classList.toggle("hide")
    }

  // Inicialização
  createTable(data);
  // Events
  [heightInput , weightInput].forEach((el) =>{
    el.addEventListener("input", (e) =>{

      const enviarValue =valueDigits(e.target.value)

      e.target.value = enviarValue
    })
  })

  // Calcu
  calcBtn.addEventListener("click", (e) =>{
    e.preventDefault();
  
    // conversão de String para Number
    const weight = +weightInput.value.replace("," , ".")
    const height = +heightInput.value.replace("," , ".")
    
    if(!weight || !height)return;
    const IMC = CalcIMC(weight , height)

    let info 
    data.forEach((item) => {
      if( IMC >= item.min && IMC <= item.max){
          info = item.info
      }
    });   
  console.log(info)

    if(!info) return;
   

    numberSpan.innerText = IMC
    infoSpan.innerText = info
    hideResult();
    
    
  })
  clearBtn.addEventListener("click", (limparInputs) =>{
      limparInputs.preventDefault();
      clearInputs();
  })



  backBtn.addEventListener("click" , (e) =>{
    calcContainer.classList.toggle("hide")
    result.classList.toggle("hide")
    clearInputs();
  })
