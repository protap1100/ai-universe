
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
        });
        //1. get the id
       const  idCardDetails =  document.getElementById('ai-card-details');
       const  div = document.createElement('div');
       div.classList = 'p-4 bg-gray-50  border border-gray-500 rounded-xl'; 
       div.innerHTML = `
                    <div class="card card-compact w-96 mx-auto bg-base-100  flex flex-col gap-5" >
                        <figure><img src="${allData.image}" alt='Ai Image'/></figure>
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
    console.log(aiSingleData);
    my_modal_5.showModal()
}





getAiData();