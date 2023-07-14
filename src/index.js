const ytdl = require("ytdl-core");
const fs = require("fs");
const readline = require("readline");


/**
 * 
 * @param {string} url 
 */
async function loadInfo(url){
    const videoInfo = await ytdl.getInfo(url);
    console.log(videoInfo);
}


/**
 * 
 * @param {string} url 
 */
async function downloadVideo(url, index = -1){
    const videoInfo = await ytdl.getInfo(url);
    const { videoDetails } = videoInfo;
    const message = `Carregando ${videoDetails.title}...`;
    const fileName = `${(index>=0)?"["+index.toString().padStart(2,'0')+"]":""} ${videoDetails.title}`;

    console.log(message);

    const data = ytdl.downloadFromInfo(videoInfo, {
        quality: "highestaudio",
        format: "mp3"
    });
    data.pipe(fs.createWriteStream(`out/${fileName}.mp3`));
}


async function input(title = null){
    const label = (title)?title:"";
    return await new Promise(resolve=>{
        reader.question(label, resolve);
    });
}


const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


async function main(){
    let menuState = 1;

    const presentLogo = ()=>{
        console.log("========== MUSIKER ==========");
        console.log("   -------- v0.1 --------    ");
    }

    const presentMainMenu = async () =>{
        console.log("Insira o numero da opção desejada:");
        console.log("1 - Baixar música.");
        console.log("2 - Baixar playlist.");
        console.log("3 - Sair.");

        const option = await input();
        if(Number(option) == 3){
            menuState = 0;
        }
    };


    presentLogo();
    do{
        await presentMainMenu();
    }while(menuState > 0);

    console.log("Programa finalizado.");
    reader.close();
}

main();
// downloadVideo("https://www.youtube.com/watch?v=hnsVuId3EKw", 2);