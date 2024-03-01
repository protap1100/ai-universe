
const  getAiData = async () =>{
   const getData = await fetch('https://openapi.programming-hero.com/api/ai/tools');
   const data = await getData.json();
   const aiData = data.data.tools;

   displayData(aiData); 
}

function displayData(aiData){
    console.log(aiData);
    // const data =aiData.tools;
    aiData.forEach(allData => {
        // Looping The array Features 
       const features =  allData.features.map((features,index) => {
                return `<h1 class="text-xl text-gray-500">${index + 1} ${features}</h1>`;
        }).join('');
        //1. get the id
       const  idCardDetails =  document.getElementById('ai-card-details');
       const  div = document.createElement('div');
       div.classList = 'p-4 bg-gray-50  border border-gray-500 rounded-xl'; 
       div.innerHTML = `
                    <div class="card card-compact w-96 mx-auto bg-base-100  flex flex-col gap-5" >
                        <figure><img src="${allData.image ? allData.image :  'No Image Available' }" /></figure>
                        <h2 class="card-title font-bold text-3xl">Features</h2>
                            <div>
                                ${features}
                            </div>
                            <div class="border border-gray-400 "></div>
                            <div class="flex items-center justify-between">
                            <div>
                                <h1 class="font-bold text-3xl mt-5">${allData.name}</h1>
                                <h1 class="mt-5">  <i class="fa-solid fa-calendar-days"></i> <span>${allData.published_in}</span> </h1>
                            </div>
                            <div class="mt-5">
                                <a class="cursor-pointer" onclick="singleData(${allData.id})"><i class="fa-solid fa-arrow-right"></i> </a>
                            </div>
                            </div>
                        </div>`;
        idCardDetails.appendChild(div);
    });
}

const  singleData  = async (id) =>{
    const formattedId = String(id).padStart(2, '0');

    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${formattedId}`);
    const data = await res.json();
    const aiSingleData = data;
//    console.log(aiSingleData);
   showSingleData(aiSingleData);

}

const showSingleData = (aiSingleData) =>{
    console.log(aiSingleData.data);
    my_modal_4.showModal();

    const aiSingleDataFeature = aiSingleData.data.features;  //Feature


    const pricingData = aiSingleData.data.pricing;

    const textColors = ['#03A30A', '#F28927', '#EB5757']; 
    
    const pricing = pricingData.map((data, index) => {
        const textColor = textColors[index % textColors.length]; 
        const singlePricing = `<div class="bg-white p-5 text-center font-bold text-2xl" style="color: ${textColor}">${data.plan} ${data.price}</div>`;
        return singlePricing;
    }).join('');

    const integrationsData = aiSingleData.data.integrations.map((data)=>{
        return `<h1 class="text-xl">${data}</h1>`;
    });

    const integrationsText = integrationsData.join('');

    // console.log(aiSingleData.data);
    
    const accuracy = aiSingleData.data.accuracy.score * 100;
    // console.log(accuracy);

    
    const features = aiSingleData.data.features;
    console.log(features);

    // const featureListItems = Object.entries(features).map((feature) => `<li>${feature}</li>`).join("");
    // const featureList = `<ul>${featureListItems}</ul>`;


    const singleData = document.getElementById('single-details');
    singleData.innerHTML = `
                    <div class=" absolute  right-0 top-0">
                    <form method="dialog" class="text-center mb-10">
                        <button class="btn border-none rounded-3xl text-white  bg-[#EB5757]"><i class="fa-solid fa-xmark"></i></button>
                    </form>
                </div>
                <div class="flex gap-5 bg-[#EB57570D] mt-16">
                    <div class="flex-1 border rounded-xl border-red-400 p-7">
                        <div class="p-4">
                            <h1 class="text-2xl font-bold">${aiSingleData.data.description}</h1>
                        </div>
                        <div class="flex gap-2 items-center">
                            ${pricing}                            
                        </div>
                        <div class="flex justify-between mt-10">
                            <div class="text-center">
                                <h1 class="text-4xl font-bold" >Features</h1>
                                <ul class="feature-list list-decimal">
                                      ${features.map((feature) => `<li>${feature}</li>`).join("")}
                                </ul>
                            </div>
                            <div class="text-center">
                                <h1 class="text-4xl font-bold" >Integrations</h1>
                                ${integrationsText}
                            </div>
                        </div>
                    </div>
                    <div class="flex-1 border border-red-300 p-2 rounded-xl">
                        <div>
                            <div class="relative">
                            <div class="z-10 absolute top-4 right-4">
                                <h1 class="bg-red-500 px-3 py-2 w-32 rounded-xl text-white">${accuracy}% Accuracy</h1>
                            </div>
                            <div class="z-0 absolute right-0">
                                <img src="${aiSingleData.data.image_link[0]} " alt="">
                            </div>
                             </div>
                        </div>
                        
                        <div class="text-center px-5 relative top-80">
                            <h1 class="text-3xl font-bold">${aiSingleData.data.input_output_examples[0].input}</h1>
                            <h1 class="text-xl font-normal mt-5">${aiSingleData.data.input_output_examples[0].output}</h1>
                        </div>
                      </div>
                  </div>
    `;  
}


function dataSort(){
    console.log('hello world');
}


getAiData();